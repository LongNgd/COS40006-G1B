from flask import Flask, render_template, request, redirect, url_for
from minio import Minio
from minio.error import S3Error
import sqlite3

app = Flask(__name__)

# Initialize the Minio client
client = Minio(
    endpoint="localhost:9000",  # Replace with your MinIO endpoint
    access_key="project1b-access-key",  # Replace with your access key
    secret_key="access2024project1b",  # Replace with your secret key
    secure=False  # Set to True if using HTTPS
)

# Database setup
db_file = 'file_data.db'

def init_db():
    """ Initialize the SQLite database and create a table if it doesn't exist. """
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS files (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_name TEXT NOT NULL,
            file_url TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Ensure that the database is initialized
init_db()

bucket_name = "project1b"  # Replace with your bucket name
folder_name = "test/"  # Folder (prefix) in MinIO

# Ensure the bucket exists
if not client.bucket_exists(bucket_name):
    client.make_bucket(bucket_name)

def upload_file(file, folder_name, bucket_name):
    """ Uploads a file to MinIO and stores the file URL in the SQLite database. """
    file_name = file.filename
    object_name = f"{folder_name}{file_name}"

    try:
        # Move the file stream to the end to get the file size
        file.stream.seek(0, 2)  # Move the cursor to the end of the file
        file_size = file.stream.tell()  # Get the current position (this is the file size)

        # Reset the file stream position to the beginning
        file.stream.seek(0)

        # Upload the file to MinIO directly from the stream
        client.put_object(
            bucket_name=bucket_name,
            object_name=object_name,
            data=file.stream,  # Use the stream to upload the file
            length=file_size,
            content_type=file.content_type
        )

        print(f"File '{file_name}' uploaded successfully!")

        # Construct the file URL
        file_url = f"http://localhost:9000/{bucket_name}/{object_name}"

        # Insert file info into the database
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO files (file_name, file_url) VALUES (?, ?)", (file_name, file_url))
        conn.commit()
        conn.close()

        print(f"File URL '{file_url}' saved to database.")

    except S3Error as exc:
        print("Error occurred:", exc)

@app.route('/')
def index():
    """ Retrieve the list of uploaded files and their URLs from the database. """
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute("SELECT file_name, file_url FROM files")
    files = cursor.fetchall()
    conn.close()
    print(files)
    return render_template('index.html', files=files)

@app.route('/upload', methods=['POST'])
def upload():
    """ Handle the file upload from the form. """
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']
    
    if file.filename == '':
        return "No selected file", 400

    if file:
        # Upload file to MinIO and store in DB
        upload_file(file, folder_name, bucket_name)
        return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)
