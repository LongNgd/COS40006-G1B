from flask import jsonify, Flask, request
from flask_cors import CORS
from flasgger import Swagger, swag_from
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

app = Flask(__name__)
CORS(app)

# Swagger initialization
swagger = Swagger(app)

# SQLAlchemy configuration for PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres.tlpiifklkbuedzfowczl:c56IfgElqS3eASfE@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.BigInteger, primary_key=True) 
    user_name = db.Column(db.String(25), nullable=False) 
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(25), nullable=False)

# Define Anomaly model
class Anomaly(db.Model):
    __tablename__ = 'anomaly'

    anomaly_id = db.Column(db.Integer, primary_key=True, nullable=False)
    camera_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    participant = db.Column(db.Integer, nullable=False)
    warning = db.Column(db.Integer, nullable=False)
    evidence_path = db.Column(db.Integer, nullable=False)

# Define Camera model
class Camera(db.Model):
    __tablename__ = 'camera'
    
    camera_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False) 
    name = db.Column(db.String(25), nullable=False)
    area = db.Column(db.String(25), nullable=False)

# Helper function to fetch user by email
def get_user_by_email(email):
    return User.query.filter_by(email=email).first()

# Connection test endpoint
@app.route('/api/test-connection', methods=['GET'])
def test_connection():
    return jsonify({
        'success': True,
        'message': 'Connection successful!'
    }), 200

# login api
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

    if user and password == user.password: 
        user_info = {
            'user_id': user.user_id,
            'email': user.email,
            'user_name': user.user_name
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
                    'user_name': {'type': 'string'}
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
    username = data.get('user_name')

    if not email or not password or not username:
        return jsonify({'success': False, 'message': 'All fields are required'}), 400

    # Check if user already exists
    if get_user_by_email(email):
        return jsonify({'success': False, 'message': 'Email already exists'}), 400

    # Get the current maximum user_id
    max_id = db.session.query(func.coalesce(func.max(User.user_id), 0)).scalar()

    # Set user_id as max_id + 1
    new_user_id = max_id + 1

    # Insert new user into the database with incremented user_id
    new_user = User(user_id=new_user_id, email=email, password=password, user_name=username)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': True, 'message': 'User registered successfully', 'user_id': new_user_id}), 200

@app.route('/api/anomalies/getAnomalies', methods=['GET'])
@swag_from({
    'tags': ['Anomalies'],
    'summary': 'Get All Anomalies',
    'description': 'Retrieves all anomalies from the database, including camera details.',
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
                                'anomaly_id': {'type': 'integer'},
                                'camera_name': {'type': 'string'},
                                'camera_area': {'type': 'string'},
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
        },
        '500': {
            'description': 'Internal server error',
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
    try:
        # Join Anomaly with Camera to get camera details
        anomalies = db.session.query(
            Anomaly,
            Camera.name.label('camera_name'),
            Camera.area.label('camera_area')
        ).join(Camera, Anomaly.camera_id == Camera.camera_id).all()

        # Check if anomalies list is empty
        if not anomalies:
            return jsonify({'success': False, 'message': 'No anomalies found'}), 404

        # Prepare the data to be sent in JSON format
        result = []
        for anomaly, camera_name, camera_area in anomalies:
            anomaly_data = {
                'anomaly_id': anomaly.anomaly_id,
                'camera_name': camera_name,
                'camera_area': camera_area,
                'date': anomaly.date.strftime('%Y-%m-%d') if anomaly.date else None,
                'time': anomaly.time.strftime('%H:%M:%S') if anomaly.time else None,
                'duration': anomaly.duration,
                'participant': anomaly.participant,
                'warning': anomaly.warning,
                'evidence_path': anomaly.evidence_path
            }
            result.append(anomaly_data)

        return jsonify({'success': True, 'data': result}), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
