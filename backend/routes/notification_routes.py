from flask import Blueprint, jsonify, request
from models import db, Notification
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


@notification_blueprint.route('/notifications', methods=['DELETE'])
@swag_from({
    'tags': ['Notifications'],
    'summary': 'Delete all notifications',
    'description': 'Remove all notifications from the system.',
    'responses': {
        200: {
            'description': 'All notifications deleted successfully',
            'examples': {
                'application/json': {
                    'success': True,
                    'message': 'All notifications deleted successfully'
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
def delete_all_notifications():
    try:
        # Delete all notifications from the database
        Notification.query.delete()
        db.session.commit()

        # Return success message
        return jsonify({'success': True, 'message': 'All notifications deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({'success': False, 'message': str(e)}), 500
