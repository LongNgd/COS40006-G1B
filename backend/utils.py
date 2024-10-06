from models import User

# Helper function to fetch user by email
def get_user_by_email(email):
    return User.query.filter_by(email=email).first()
