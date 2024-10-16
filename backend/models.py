from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.BigInteger, primary_key=True)
    user_name = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(25), nullable=False)

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

class Camera(db.Model):
    __tablename__ = 'camera'
    camera_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    area = db.Column(db.String(25), nullable=False)
    status = db.Column(db.Integer, nullable=False)

class Camera_user(db.Model):
    __tablename__ = 'camera_user'
    cu_id = db.Column(db.Integer, primary_key=True)
    camera_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)