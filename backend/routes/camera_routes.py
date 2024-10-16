from flask import Blueprint, request, jsonify
from flasgger import swag_from
from models import db, Camera
from sqlalchemy import func

camera_blueprint = Blueprint('camera', __name__)

@camera_blueprint.route('/getCamera', methods=['GET'])
@swag_from({
    'tags': ['Camera'],
    'summary': 'Get all camera',
    'description': 'Get all camera from the database.',
    'responses': {
        200: {
            'description': 'Retrieve all camera data',
            'examples': {
                'application/json': {
                    'success': True,
                    'data': [
                        {
                            'camera_id': 1,
                            'name': 'Camera 1',
                            'area': 'Entrance',
                            'status': 1
                        },
                        {
                            'camera_id': 2,
                            'name': 'Camera 2',
                            'area': 'Parking',
                            'status': 1
                        }
                    ]
                }
            }
        },
        500: {
            'description': 'Server error',
            'examples': {
                'application/json': {
                    'success': False,
                    'message': 'Error details'
                }
            }
        }
    }
})
def get_camera():
    try:
        # Query all data from the camera table
        cameras = Camera.query.all()

        # Prepare the result in a list of dictionaries
        result = []
        for camera in cameras:
            camera_data = {
                'camera_id': camera.camera_id,
                'name': camera.name,
                'area': camera.area,
                'status': camera.status
            }
            result.append(camera_data)

        # Return a JSON response
        return jsonify({'success': True, 'data': result}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@camera_blueprint.route('/toggleCameraStatus', methods=['PUT'])
@swag_from({
    'tags': ['Camera'],
    'summary': 'Switch camera on/off',
    'description': 'Switch camera on/off (1 = on, 0 = off).',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'camera_id': {
                        'type': 'integer',
                        'description': 'ID of the camera to toggle status',
                        'example': 1
                    }
                },
                'required': ['camera_id']
            },
            'required': True
        }
    ],
    'responses': {
        200: {
            'description': 'Camera status toggled successfully',
            'examples': {
                'application/json': {
                    'success': True,
                    'camera_id': 1,
                    'status': 0
                }
            }
        },
        404: {
            'description': 'Camera not found',
            'examples': {
                'application/json': {
                    'success': False,
                    'message': 'Camera not found'
                }
            }
        },
        500: {
            'description': 'Server error',
            'examples': {
                'application/json': {
                    'success': False,
                    'message': 'Error details'
                }
            }
        }
    }
})
def toggle_camera_status():
    try:
        # Get the camera_id from the request body (JSON)
        data = request.json
        camera_id = data.get('camera_id')

        # Check if camera_id is provided
        if not camera_id:
            return jsonify({'success': False, 'message': 'camera_id is required'}), 400

        # Find the camera by camera_id
        camera = Camera.query.filter_by(camera_id=camera_id).first()

        # Check if camera exists
        if not camera:
            return jsonify({'success': False, 'message': 'Camera not found'}), 404

        # Toggle the status (1 to 0 or 0 to 1)
        camera.status = 1 if camera.status == 0 else 0

        # Save the changes to the database
        db.session.commit()

        # Return the updated status
        return jsonify({'success': True, 'camera_id': camera.camera_id, 'status': camera.status}), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@camera_blueprint.route('/getCameraByUserId', methods=['POST'])
@swag_from({
    'tags': ['Camera'],
    'summary': 'Get cameras by user ID',
    'description': 'Retrieve the details of all cameras associated with a specific user using their unique user_id.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {
                        'type': 'integer',
                        'description': 'ID of the user whose cameras you want to retrieve',
                        'example': 123,
                        'required': True
                    }
                }
            },
            'required': True
        }
    ],
    'responses': {
        200: {
            'description': 'Cameras retrieved successfully',
            'examples': {
                'application/json': [
                    {
                        'camera_id': 1,
                        'user_id': 123,
                        'name': 'Front Gate Camera',
                        'area': 'Main Gate',
                        'status': 1
                    },
                    {
                        'camera_id': 2,
                        'user_id': 123,
                        'name': 'Back Gate Camera',
                        'area': 'Back Gate',
                        'status': 0
                    }
                ]
            }
        },
        404: {
            'description': 'No cameras found for the user',
            'examples': {
                'application/json': {
                    'success': False,
                    'message': 'No cameras found for the user'
                }
            }
        },
        400: {
            'description': 'Invalid request',
            'examples': {
                'application/json': {
                    'success': False,
                    'message': 'user_id is required'
                }
            }
        },
        500: {
            'description': 'Server error',
            'examples': {
                'application/json': {
                    'success': False,
                    'message': 'Error details'
                }
            }
        }
    }
})
def get_camera_by_user_id():
    try:
        # Get the 'user_id' from the request body (JSON)
        data = request.json
        user_id = data.get('user_id')

        # Validate that user_id is provided
        if not user_id:
            return jsonify({'success': False, 'message': 'user_id is required'}), 400

        # Query the database for cameras with the given user_id
        cameras = Camera.query.filter_by(user_id=user_id).all()

        # If no cameras exist for the user, return a 404 error
        if not cameras:
            return jsonify({'success': False, 'message': 'No cameras found for the user'}), 404

        # Prepare a list of camera details
        camera_data = []
        for camera in cameras:
            camera_data.append({
                'camera_id': camera.camera_id,
                'user_id': camera.user_id,
                'name': camera.name,
                'area': camera.area,
                'status': camera.status
            })

        return jsonify(camera_data), 200

    except Exception as e:
        # Handle any exceptions that occur
        return jsonify({'success': False, 'message': str(e)}), 500
