from flask import jsonify, Flask, request
from flask_restful import Resource, Api
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


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

@app.route('/api/user/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE email=%s", (email,))
    user = cur.fetchone()
    cur.close()

    # if user and check_password_hash(user[2], password): 
    if user and password:
        return jsonify({'success': True, 'message': 'Login successful', 'user_id': user[0]})
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'})

@app.route('/api/user/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not email or not password or not username:
        return jsonify({'success': False, 'message': 'All fields are required'})

    # hashed_password = generate_password_hash(password)

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE email=%s", (email,))
    existing_user = cur.fetchone()

    if existing_user:
        return jsonify({'success': False, 'message': 'Email already exists'})

    # cur.execute("INSERT INTO user (email, password, user_name) VALUES (%s, %s, %s)", (email, hashed_password, username))
    cur.execute("INSERT INTO user (email, password, user_name) VALUES (%s, %s, %s)", (email, password, username))
    mysql.connection.commit()
    cur.close()

    return jsonify({'success': True, 'message': 'User registered successfully'})

@app.route('/api/project/getProject', methods=['POST'])
def get_data():
    data = request.json
    user_id = data.get('user_id')

    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT *
        FROM project
        WHERE user_id = %s;
    """, (user_id,))

    project = cur.fetchone()
    cur.close()

    if project:
        return jsonify(project)
    else:
        return jsonify({'error': 'Project not found'}), 404
    
@app.route('/api/project/postProject', methods=['POST'])
def create_project():
    try:
        # Get the data from the request
        data = request.json
        
        # Extract the required fields
        json_id = data.get('json_id')
        source_id = data.get('source_id')
        title = data.get('title')
        upload_date = data.get('upload_date')  # Expecting date in string format, e.g., '2024-09-10 14:30:00'
        duration = data.get('duration')
        save_status = data.get('save_status')
        heatmap_path = data.get('heatmap_path')
        user_id = data.get('user_id')
        
        # Validate required fields
        if not all([source_id, title, upload_date, duration, user_id]):
            return jsonify({'error': 'source_id, title, upload_date, duration, and user_id are required'}), 400

        # Convert upload_date from string to datetime
        try:
            upload_date = datetime.strptime(upload_date, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD HH:MM:SS'}), 400

        # Insert into the project table
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO project (json_id, source_id, title, upload_date, duration, save_status, heatmap_path, user_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (json_id, source_id, title, upload_date, duration, save_status, heatmap_path, user_id))
        
        # Commit the transaction
        mysql.connection.commit()
        cur.close()

        return jsonify({'success': True, 'message': 'Project created successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/project/getVideo', methods=['POST'])
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

@app.route('/api/project/getAnomalies', methods=['POST'])
def get_anomalies_by_project():
    try:
        # Get the JSON data from the POST request
        data = request.json
        project_id = data.get('project_id')

        # Check if the project_id is provided in the request
        if not project_id:
            return jsonify({'error': 'project_id is required'}), 400

        # Query the database for anomalies by project_id
        cur = mysql.connection.cursor()
        cur.execute("""
            SELECT anomaly_id, project_id, timestamp, type, duration, participants, intensity, evidence 
            FROM anomaly 
            WHERE project_id = %s;
        """, (project_id,))
        anomalies = cur.fetchall()
        cur.close()

        # Process the result and return anomalies if found
        if anomalies:
            anomaly_list = []
            for anomaly in anomalies:
                anomaly_dict = {
                    'anomaly_id': anomaly[0],
                    'project_id': anomaly[1],
                    'timestamp': anomaly[2],
                    'type': anomaly[3],
                    'duration': anomaly[4],
                    'participants': anomaly[5],
                    'intensity': anomaly[6],
                    'evidence': anomaly[7]
                }
                anomaly_list.append(anomaly_dict)

            return jsonify({'success': True, 'data': anomaly_list}), 200
        else:
            return jsonify({'error': 'No anomalies found for the given project_id'}), 404

    except Exception as e:
        # Return error message in case of any exceptions
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
