from pydoc import render_doc
from flask import Flask, request, render_template
from flask_restful import reqparse
from pymongo import MongoClient
import datetime
import os
from flask_cors import CORS, cross_origin


app_flask = Flask(__name__,  template_folder='templates')

cors = CORS(app_flask, resources={r"/api/*": {"origins": "*"}})
app_flask.config['CORS_HEADERS'] = 'Content-Type'


def connect():
    client = MongoClient(<Mongo URL Here>)
    db = client.driveAI
    return db

def get_users(db):
    users = db.users.find({},{'_id': 0})
    result = []
    for user in users:
        result.append(user)
    return result

def get_user(db, name):
    user = db.users.find_one({'username':name}, {'_id':0})
    if user:
        return user
    else:
        return None

def insert(db, username, password, email, subscription):
   # record = db.users.find_one({"email": email,"username":username})
    insert_json = {
        "username": username,
        "password": password,
        "email": email,
        "subscription": subscription
    }
    if db.users.find_one({"email": email,"username":username}):
        return None
    else:
        result = db.users.insert_one(insert_json)
        return result

def delete(db, email, username):
    record = db.users.find_one({"email":email,"username":username})
    if not record:
        return ("No such record exists")
    else:
        result = db.users.delete_one({"email":email,"username":username})
        return result

def update(db, username, email, new_email, new_username, new_password, new_subscription):
    record = db.users.find_one({"email": email,"username":username})
    if not record:
        return ("No such record exists")
    else:
        check = db.users.find_one({"email": new_email,"username":new_username})
        if check:
            return("User already exists")
        else:
            update_json = {
            "username": new_username,
            "password": new_password,
            "email": new_email,
            "subscription": new_subscription
            }
            result = db.users.update_one({"email": email,"username":username}, update_json)
            return result

db = connect()
print(get_users(db))

@app_flask.route('/getusers', methods=['GET', 'POST'])
def getusers():
    if request.method == 'GET' or request.method == 'POST':
        users = get_users(db)
        result = {"users": users}
        return result


@app_flask.route('/api/get_user/', methods=['GET', 'POST'])
@cross_origin()
def getuser():
    if request.method == 'GET' or request.method == 'POST':
        username = request.json['name']
        password = request.json['password']
        print(username)
        if get_user(db, username):
            users = get_user(db, username)
            if password == users['password']:
                return {"status": 200, "message": "Success!"}
            else:
                return {"status": 200, "message": "Incorrect Password!"}
        else:
                return {"status": 200, "message": "Incorrect Username! Please register!"}


@app_flask.route('/api/insert/', methods=['GET', 'POST'])
@cross_origin()
def register():
    if request.method == 'GET' or request.method == 'POST':
        username = request.json['name']
        password = request.json['password']
        email  = request.json['email']
        print(username)
        users = get_user(db, username)
        print(users)
        subscription = 'basic'
        if users:
            return {"status": 200, "message": "User already exists!"}
        else:
            rec = insert(db, username, password, email, subscription)
            return {"status": 200, "message": "Success!"}

            

if __name__ == '__main__':
    app_flask.run(debug=True)