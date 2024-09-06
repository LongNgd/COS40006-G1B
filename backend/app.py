from flask import jsonify, Flask, request
from flask_restful import Resource, Api
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
mysql = MySQL(app)

api = Api(app)

# Connection configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cos40006-g1b' 


def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE email=%s", (email,))
    user = cur.fetchone()
    cur.close()

    if user and check_password_hash(user[2], password):  # Assuming the password is stored in the 3rd column (index 2)
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required'})

    hashed_password = generate_password_hash(password)

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE email=%s", (email,))
    existing_user = cur.fetchone()

    if existing_user:
        return jsonify({'success': False, 'message': 'Email already exists'})

    cur.execute("INSERT INTO user (email, password) VALUES (%s, %s)", (email, hashed_password))
    mysql.connection.commit()
    cur.close()

    return jsonify({'success': True, 'message': 'User registered successfully'})

@app.route('/api/project', methods=['GET'])
def get_data():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM project")

    data = dictfetchall(cur)
    cur.close()
    
    return jsonify(data)

from flask import request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)
mysql = MySQL(app)

@app.route('/api/video-path', methods=['POST'])
def get_video_path():
    data = request.json
    title = data.get('title')
    
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT v.file_path 
        FROM video v 
        JOIN project p ON p.source_id = v.video_id
        WHERE p.title = %s;
    """, (title,))
    
    video = cur.fetchone()
    cur.close()
    
    if video:
        return jsonify({'file_path': video[0]})
    else:
        return jsonify({'error': 'Video not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
