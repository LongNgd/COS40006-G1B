from flask import jsonify, Flask, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flasgger import Swagger, swag_from
from datetime import timedelta

app = Flask(__name__)
CORS(app)
mysql = MySQL(app)

# Swagger initialization
swagger = Swagger(app)

# Connection configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cos40006-g1b'

# Helper function to fetch user by email
def get_user_by_email(email):
    cur = mysql.connection.cursor()
    cur.execute("SELECT user_id, email, password, user_name FROM user WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    return user

# Helper function to convert database query result to dictionary
def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

@app.route('/api/user/login', methods=['POST'])
@swag_from({
    'tags': ['User'],
    'summary': 'Login User',
    'description': 'Allows a user to log in by providing email and password.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'description': 'JSON body containing email and password',
            'schema': {
                'type': 'object',
                'properties': {
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {
            'description': 'Login successful',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'message': {'type': 'string'},
                    'user_info': {
                        'type': 'object',
                        'properties': {
                            'user_id': {'type': 'integer'},
                            'email': {'type': 'string'},
                            'user_name': {'type': 'string'}
                        }
                    }
                }
            }
        },
        '400': {
            'description': 'Invalid email or password',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Fetch the user from the database
    user = get_user_by_email(email)

    if user and password == user[2]: 
        user_info = {
            'user_id': user[0],
            'email': user[1],
            'user_name': user[3]
        }
        return jsonify({'success': True, 'message': 'Login successful', 'user_info': user_info})
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 400

@app.route('/api/user/register', methods=['POST'])
@swag_from({
    'tags': ['User'],
    'summary': 'Register User',
    'description': 'Allows a new user to register by providing email, password, and username.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'description': 'JSON body containing email, password, and username',
            'schema': {
                'type': 'object',
                'properties': {
                    'email': {'type': 'string'},
                    'password': {'type': 'string'},
                    'username': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {
            'description': 'Registration successful',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'message': {'type': 'string'}
                }
            }
        },
        '400': {
            'description': 'User already exists or invalid data',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not email or not password or not username:
        return jsonify({'success': False, 'message': 'All fields are required'}), 400

    # Check if user already exists
    if get_user_by_email(email):
        return jsonify({'success': False, 'message': 'Email already exists'}), 400

    # Securely hash the password before storing
    hashed_password = generate_password_hash(password)

    # Insert new user into the database
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO user (email, password, user_name) VALUES (%s, %s, %s)", 
                (email, hashed_password, username))
    mysql.connection.commit()
    cur.close()

    return jsonify({'success': True, 'message': 'User registered successfully'}), 200

@app.route('/api/anomalies/getAnomalies', methods=['GET'])
@swag_from({
    'tags': ['Anomalies'],
    'summary': 'Get All Anomalies',
    'description': 'Retrieves all anomalies from the database.',
    'responses': {
        '200': {
            'description': 'List of anomalies retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'data': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'camera_name': {'type': 'string'},  
                                'area': {'type': 'string'},
                                'date': {'type': 'string', 'format': 'date'},
                                'time': {'type': 'string', 'format': 'time'},
                                'duration': {'type': 'integer'},  
                                'participant': {'type': 'integer'},
                                'warning': {'type': 'integer'},
                                'evidence_path': {'type': 'string'}
                            }
                        }
                    }
                }
            }
        },
        '404': {
            'description': 'No anomalies found',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_anomalies():
    cur = mysql.connection.cursor()
    cur.execute("""
        select name as camera_name, area, date, time, duration, participant, warning, evidence_path
        from anomaly a
        join camera c on a.camera_id = c.camera_id;
    """)
        
    anomalies = dictfetchall(cur)
    cur.close()

    for anomaly in anomalies:
        if isinstance(anomaly['time'], timedelta):
            anomaly['time'] = str(anomaly['time'])

    if anomalies:
        return jsonify({'success': True, 'data': anomalies}), 200
    else:
        return jsonify({'success': False, 'message': 'No anomalies found'}), 404

@app.route('/api/anomalies/getAnomaliesByUser', methods=['POST'])
@swag_from({
    'tags': ['Anomalies'],
    'summary': 'Get Anomalies by User ID',
    'description': 'Retrieves all anomalies related to a specific user ID.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'description': 'JSON body containing user_id',
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {
            'description': 'List of anomalies retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'data': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'camera_name': {'type': 'string'},
                                'area': {'type': 'string'},
                                'date': {'type': 'string', 'format': 'date'},
                                'time': {'type': 'string', 'format': 'time'},
                                'duration': {'type': 'integer'},
                                'participant': {'type': 'string'},
                                'warning': {'type': 'string'},
                                'evidence_path': {'type': 'string'}
                            }
                        }
                    }
                }
            }
        },
        '400': {
            'description': 'user_id missing in request',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        },
        '404': {
            'description': 'No anomalies found for the given user_id',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def get_anomalies_by_user():
    data = request.json
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400

    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT name AS camera_name, area, date, time, duration, participant, warning, evidence_path
        FROM anomaly a
        JOIN camera c ON a.camera_id = c.camera_id
        JOIN user u ON u.user_id = c.user_id
        WHERE u.user_id = %s;
    """, (user_id,))
        
    anomalies = dictfetchall(cur)
    cur.close()

    for anomaly in anomalies:
        if isinstance(anomaly['time'], timedelta):
            anomaly['time'] = str(anomaly['time'])

    if anomalies:
        return jsonify({'success': True, 'data': anomalies}), 200
    else:
        return jsonify({'error': 'No anomalies found for the given user_id'}), 404


if __name__ == '__main__':
    app.run(debug=True)
