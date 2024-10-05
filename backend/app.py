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