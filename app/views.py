from app import app
from flask import jsonify, request, session, send_from_directory
import utils
import os


@app.route('/')
def index():
    print os.path.join(os.getcwd(), 'app', 'static')
    return send_from_directory(os.path.join(os.getcwd(), 'app', 'static'), 'index.html')


@app.route('/api/v1.0/login', methods=['POST'])
def login():
    print request.get_json()
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    auth_check = utils.authenticate(username, password)
    if auth_check:
        status = True
        session['logged_in'] = True
    else:
        status = False
    return jsonify(status=status)


@app.route('/api/v1.0/logout')
def logout():
    session.pop('logged_in', None)
    return jsonify(status='success')


@app.route('/project_list')
def project_list():
    pass

@app.route('/api/status', methods=['GET'])
def status():
    if session.get('logged_in'):
        if session['logged_in']:
            return jsonify({'status': True});
        else:
            return jsonify({'status': False});

