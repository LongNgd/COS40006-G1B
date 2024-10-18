from flask import Blueprint, request, jsonify
from flasgger import swag_from
from models import db, Camera, User, Camera_user
from sqlalchemy import func

camera_blueprint = Blueprint('camera', __name__)


@camera_blueprint.route('/getCameraByUserID', methods=['POST'])
@swag_from({
    'tags': ['Camera'],
    'summary': 'Get cameras by user ID',
    'description': 'Retrieve all cameras associated with a specified user ID.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {
                        'type': 'integer',
                        'description': 'ID of the user whose cameras are to be retrieved',
                        'example': 1,
                        'required': True
                    }
                },
                'required': True
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Cameras retrieved successfully',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'camera_id': {
                            'type': 'integer',
                            'description': 'ID of the camera',
                            'example': 1
                        },
                        'name': {
                            'type': 'string',
                            'description': 'Name of the camera',
                            'example': 'Entrance Camera'
                        },
                        'area': {
                            'type': 'string',
                            'description': 'Area where the camera is located',
                            'example': 'Main Entrance'
                        },
                        'status': {
                            'type': 'integer',
                            'description': 'Status of the camera (1 = on, 0 = off)',
                            'example': 1
                        }
                    }
                }
            }
        },
        400: {
            'description': 'Invalid input, user_id is required',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {
                        'type': 'string',
                        'example': 'user_id is required'
                    }
                }
            }
        },
        404: {
            'description': 'No cameras found for the user',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {
                        'type': 'string',
                        'example': 'No cameras found for this user.'
                    }
                }
            }
        },
        500: {
            'description': 'Server error',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {
                        'type': 'boolean',
                        'example': False
                    },
                    'message': {
                        'type': 'string',
                        'example': 'Error details'
                    }
                }
            }
        }
    }
})
def get_cameras_by_user():
    # Get user_id from the request body
    data = request.get_json()
    user_id = data.get('user_id')
    
    if user_id is None:
        return jsonify({"error": "user_id is required"}), 400
    
    # Query the cameras associated with the user
    cameras = db.session.query(Camera).join(Camera_user, Camera.camera_id == Camera_user.camera_id).filter(Camera_user.user_id == user_id).all()
    
    # Create a response list
    camera_list = []
    for camera in cameras:
        camera_info = {
            'camera_id': camera.camera_id,
            'name': camera.name,
            'area': camera.area,
            'status': camera.status
        }
        camera_list.append(camera_info)
    
    if not camera_list:
        return jsonify({"message": "No cameras found for this user."}), 404

    return jsonify({'success': True, 'data': camera_list}), 200

if __name__ == '__main__':
    app.run(debug=True)

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

@camera_blueprint.route('/assignCameraToUser', methods=['POST'])
@swag_from({
    'tags': ['Camera'],
    'summary': 'Assign camera to user',
    'description': 'Assign a camera to a user by adding an entry into the Camera_user table. The unique cu_id is a combination of camera_id and user_id (cu_id = camera_id * 100 + user_id).',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {
                        'type': 'integer',
                        'description': 'ID of the user to assign the camera to',
                        'example': 1,
                        'required': True
                    },
                    'camera_id': {
                        'type': 'integer',
                        'description': 'ID of the camera to be assigned',
                        'example': 1,
                        'required': True
                    }
                }
            },
            'required': True
        }
    ],
    'responses': {
        200: {
            'description': 'Camera assigned successfully',
            'examples': {
                'application/json': {
                    'success': True,
                    'message': 'Camera assigned to user successfully'
                }
            }
        },
        400: {
            'description': 'Invalid input or camera already assigned',
            'examples': {
                'application/json': {
                    'success': False,
                    'message': 'Camera is already assigned to the user'
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
def assign_camera_to_user():
    try:
        # Get user_id and camera_id from the request body
        data = request.json
        user_id = data.get('user_id')
        camera_id = data.get('camera_id')

        # Validate input
        if not user_id or not camera_id:
            return jsonify({'success': False, 'message': 'user_id and camera_id are required'}), 400

        # Calculate cu_id
        cu_id = camera_id * 100 + user_id

        # Check if the cu_id already exists
        existing_assignment = Camera_user.query.filter_by(cu_id=cu_id).first()

        if existing_assignment:
            return jsonify({'success': False, 'message': 'Camera is already assigned to the user'}), 400

        # Create new Camera_user record
        new_camera_user = Camera_user(cu_id=cu_id, camera_id=camera_id, user_id=user_id)
        db.session.add(new_camera_user)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Camera assigned to user successfully'}), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@camera_blueprint.route('/api/getUnassignedCamera', methods=['POST'])
@swag_from({
    'tags': ['Camera'],
    'summary': 'Get cameras not assigned to user',
    'description': 'Retrieve all cameras that are not assigned to a specific user.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {
                        'type': 'integer',
                        'description': 'ID of the user',
                        'example': 1,
                        'required': True
                    }
                },
                'required': True
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Cameras retrieved successfully',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'camera_id': {
                            'type': 'integer',
                            'description': 'ID of the camera',
                            'example': 1
                        },
                        'name': {
                            'type': 'string',
                            'description': 'Name of the camera',
                            'example': 'Entrance Camera'
                        },
                        'area': {
                            'type': 'string',
                            'description': 'Area where the camera is located',
                            'example': 'Main Entrance'
                        },
                        'status': {
                            'type': 'integer',
                            'description': 'Status of the camera (1 = on, 0 = off)',
                            'example': 1
                        }
                    }
                }
            }
        },
        400: {
            'description': 'Invalid input, user_id is required',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {
                        'type': 'string',
                        'example': 'user_id is required'
                    }
                }
            }
        },
        404: {
            'description': 'No unassigned cameras found for the user',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {
                        'type': 'string',
                        'example': 'No cameras available for assignment.'
                    }
                }
            }
        },
        500: {
            'description': 'Server error',
            'schema': {
                'type': 'object',
                'properties': {
                    'success': {
                        'type': 'boolean',
                        'example': False
                    },
                    'message': {
                        'type': 'string',
                        'example': 'Error details'
                    }
                }
            }
        }
    }
})
def get_cameras_not_assigned_to_user():
    try:
        # Get user_id from the request body
        data = request.json
        user_id = data.get('user_id')

        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400

        # Get all camera IDs that the user is already assigned to
        assigned_camera_ids = db.session.query(Camera_user.camera_id).filter_by(user_id=user_id).subquery()

        # Query for cameras not assigned to the user
        cameras = db.session.query(Camera).filter(~Camera.camera_id.in_(assigned_camera_ids)).all()

        # Create a response list
        camera_list = []
        for camera in cameras:
            camera_info = {
                'camera_id': camera.camera_id,
                'name': camera.name,
                'area': camera.area,
                'status': camera.status
            }
            camera_list.append(camera_info)

        if not camera_list:
            return jsonify({"message": "No cameras available for assignment."}), 404

        return jsonify({'success': True, 'data': camera_list}), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
