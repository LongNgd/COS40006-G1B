from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from flask_sqlalchemy import SQLAlchemy
from swagger_config import configure_swagger
from models import db
from routes.user_routes import user_blueprint
from routes.anomaly_routes import anomaly_blueprint
from routes.camera_routes import camera_blueprint
from routes.notification_routes import notification_blueprint

app = Flask(__name__)
CORS(app)

# SQLAlchemy configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres.tlpiifklkbuedzfowczl:c56IfgElqS3eASfE@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

# Swagger configuration
swagger = Swagger(app)
configure_swagger(app)

# Register Blueprints for routes
app.register_blueprint(user_blueprint, url_prefix='/api/user')
app.register_blueprint(anomaly_blueprint, url_prefix='/api/anomalies')
app.register_blueprint(camera_blueprint, url_prefix='/api/camera')
app.register_blueprint(notification_blueprint, url_prefix='/api/notification')

# Connection test endpoint
@app.route('/api/test-connection', methods=['GET'])
def test_connection():
    return {
        'success': True,
        'message': 'Connection successful!'
    }, 200

if __name__ == "__main__":
    app.run(debug=True)
