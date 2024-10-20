from flask import Blueprint, jsonify, request
from models import db, Notification  # Assuming you have a Notification model in models.py
from flasgger import swag_from

# Create a new blueprint for the notifications
notification_blueprint = Blueprint('notification', __name__)

@notification_blueprint.route('/notifications', methods=['GET'])
@swag_from({
    'tags': ['Notifications'],
    'summary': 'Get all notifications',
    'description': 'Retrieve a list of all notifications stored in the system.',
    'responses': {
        200: {
            'description': 'List of notifications retrieved successfully',
            'examples': {
                'application/json': [
                    {
                        'noti_id': 1,
                        'cam_id': 1,
                        'title': 'Camera 1 is on',
                        'desc': 'You will be notified if any anomalies are detected in this camera',
                        'read_status': 0,
                        'date': '2024-10-20',
                        'time': '14:30:00'
                    },
                    {
                        'noti_id': 2,
                        'cam_id': 2,
                        'title': 'Camera 2 is off',
                        'desc': 'You will not be notified if any anomalies are detected in this camera',
                        'read_status': 1,
                        'date': '2024-10-20',
                        'time': '15:00:00'
                    }
                ]
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
def get_all_notifications():
    try:
        # Fetch all notifications from the database
        notifications = Notification.query.all()

        # Format notifications to return as JSON
        notification_list = []
        for notification in notifications:
            notification_list.append({
                'noti_id': notification.noti_id,
                'cam_id': notification.cam_id,
                'title': notification.title,
                'desc': notification.desc,
                'read_status': notification.read_status,
                'date': str(notification.date),
                'time': str(notification.time)
            })

        # Return the list of notifications as a JSON response
        return jsonify({'success': True, 'data': notification_list}), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@notification_blueprint.route('/notifications/toggle-read', methods=['PUT'])
@swag_from({
    'tags': ['Notifications'],
    'summary': 'Toggle read status of a notification',
    'description': 'Toggle the read status of a specific notification (0 = unread, 1 = read).',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'noti_id': {
                        'type': 'integer',
                        'description': 'ID of the notification to toggle read status',
                        'example': 1
                    }
                },
                'required': ['noti_id']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Read status toggled successfully',
            'examples': {
                'application/json': {
                    'success': True,
                    'noti_id': 1,
                    'read_status': 1
                }
            }
        },
        404: {
            'description': 'Notification not found',
            'examples': {
                'application/json': {
                    'success': False,
                    'message': 'Notification not found'
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
def toggle_read_status():
    try:
        # Get the noti_id from the request body (JSON)
        data = request.json
        noti_id = data.get('noti_id')

        # Check if noti_id is provided
        if not noti_id:
            return jsonify({'success': False, 'message': 'noti_id is required'}), 400

        # Find the notification by noti_id
        notification = Notification.query.filter_by(noti_id=noti_id).first()

        # Check if the notification exists
        if not notification:
            return jsonify({'success': False, 'message': 'Notification not found'}), 404

        # Toggle the read status (0 to 1 or 1 to 0)
        notification.read_status = 1 if notification.read_status == 0 else 0

        # Save the changes to the database
        db.session.commit()

        # Return the updated status
        return jsonify({'success': True, 'noti_id': notification.noti_id, 'read_status': notification.read_status}), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500