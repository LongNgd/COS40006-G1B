from flask import Blueprint, request, jsonify
from flasgger import swag_from
from models import db,User, Anomaly, Camera, Camera_user
from datetime import datetime

anomaly_blueprint = Blueprint('anomaly', __name__)

@anomaly_blueprint.route('/getAnomalies', methods=['GET'])
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

@anomaly_blueprint.route('/filterByDate', methods=['POST'])
@swag_from({
    'tags': ['Anomalies'],
    'summary': 'Filter Anomalies by Date',
    'description': 'This API filters anomalies based on the provided date and returns a list of anomalies for that day.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'description': 'JSON body containing the date in YYYY-MM-DD format',
            'schema': {
                'type': 'object',
                'properties': {
                    'date': {
                        'type': 'string',
                        'description': 'Date in YYYY-MM-DD format',
                        'example': '2024-09-30'
                    }
                }
            }
        }
    ],
    'responses': {
        '200': {
            'description': 'List of anomalies filtered by the given date',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'data': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'camera_id': {'type': 'integer'},
                                'participant': {'type': 'string'},
                                'warning': {'type': 'string'}
                            }
                        }
                    }
                }
            }
        },
        '400': {
            'description': 'Invalid or missing date parameter',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'message': {'type': 'string'}
                }
            }
        },
        '500': {
            'description': 'Server error',
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
def filter_anomalies_by_date():
    try:
        # Get the 'date' parameter from the request body (JSON)
        data = request.json
        date_str = data.get('date')
        if not date_str:
            return jsonify({'success': False, 'message': 'Date is required'}), 400

        # Parse the date string to a Python date object
        try:
            filter_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'success': False, 'message': 'Invalid date format. Use YYYY-MM-DD'}), 400

        # Query to filter anomalies by date and join with Camera table
        anomalies = db.session.query(
            Anomaly.camera_id,
            Anomaly.participant,
            Anomaly.warning
        ).join(Camera, Anomaly.camera_id == Camera.camera_id).filter(Anomaly.date == filter_date).all()

        # Prepare the result
        result = []
        for anomaly in anomalies:
            anomaly_data = {
                'camera_id': anomaly.camera_id,
                'participant': anomaly.participant,
                'warning': anomaly.warning
            }
            result.append(anomaly_data)

        # If no anomalies are found, return an empty array with success = True
        return jsonify({'success': True, 'data': result}), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@anomaly_blueprint.route('/getAnomaliesByUserId', methods=['POST'])
@swag_from({
    'tags': ['Anomalies'],
    'summary': 'Get Anomalies by User ID',
    'description': 'Retrieves anomalies filtered by user ID, including camera details.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'description': 'JSON body containing the user ID',
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {
                        'type': 'integer',
                        'description': 'The ID of the user to filter anomalies.',
                        'example': 1
                    }
                }
            }
        }
    ],
    'responses': {
        '200': {
            'description': 'List of anomalies retrieved successfully for the given user ID',
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
        '400': {
            'description': 'Invalid or missing user ID parameter',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {'type': 'boolean'},
                    'message': {'type': 'string'}
                }
            }
        },
        '404': {
            'description': 'No anomalies found for the given user ID',
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
def get_anomalies_by_user_id():
    try:
        # Get the 'user_id' from the request body (JSON)
        data = request.json
        user_id = data.get('user_id')
        
        if user_id is None:
            return jsonify({'success': False, 'message': 'User ID is required'}), 400

        # Join Anomaly with Camera, camera_user, and User to get camera details and filter by user_id
        anomalies = db.session.query(
            Anomaly,
            Camera.name.label('camera_name'),
            Camera.area.label('camera_area')
        ).join(Camera, Anomaly.camera_id == Camera.camera_id) \
         .join(Camera_user, Camera.camera_id == Camera_user.camera_id) \
         .join(User, User.user_id == Camera_user.user_id) \
         .filter(User.user_id == user_id).all()

        # Check if anomalies list is empty
        if not anomalies:
            return jsonify({'success': False, 'message': 'No anomalies found for the given user ID'}), 404

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
