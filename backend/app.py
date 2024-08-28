from flask import jsonify, Flask, request
from flask_restful import Resource, Api
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
mysql = MySQL(app)

api = Api(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cos40006-g1b' 

def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

class User(Resource):
    def get(self):
        cur = mysql.connection.cursor()
        email = request.args.get('email')
        if email:
            cur.execute("SELECT * FROM user WHERE email = %s", [email])
        else:
            cur.execute("SELECT * FROM user")
        data = dictfetchall(cur)
        cur.close()
        return {'users': data, 'Method': 'GET'}

    def post(self):
        data = request.json
        email = data.get('email')
        password = data.get('password')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO user (email, password) VALUES (%s, %s)", (email, password))
        mysql.connection.commit()
        cur.close()

        return {'message': 'User created successfully!', 'Method': 'POST'}

    def put(self):
        data = request.json
        email = data.get('email')
        password = data.get('password')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE user SET password=%s WHERE email=%s", (password, email))
        mysql.connection.commit()
        cur.close()

        return {'message': 'User updated successfully!', 'Method': 'PUT'}

    def delete(self):
        data = request.json
        email = data.get('email')

        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM user WHERE email=%s", [email])
        mysql.connection.commit()
        cur.close()

        return {'message': 'User deleted successfully!', 'Method': 'DELETE'}

api.add_resource(User, '/api/users/')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE email=%s AND password=%s", (email, password))
    user = cur.fetchone()
    cur.close()

    if user:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'})

if __name__ == '__main__':
    app.run(debug=True)
