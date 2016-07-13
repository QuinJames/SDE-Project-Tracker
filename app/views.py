from app import app, db
from flask import jsonify, request, session, send_from_directory
import utils
import os
from models import Project, Engineer, EngineerProject, Rating
from pprint import pprint


@app.route('/')
def index():
    # print os.path.join(os.getcwd(), 'app', 'static')
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


@app.route('/api/v1.0/project_list')
def get_project_list():
    pass


@app.route('/api/v1.0/status', methods=['GET'])
def status():
    if session.get('logged_in'):
        if session['logged_in']:
            return jsonify({'status': True})
        else:
            return jsonify({'status': False})


@app.route('/api/v1.0/getProjects', methods=['GET'])
def get_projects():
    proj_list = []
    project_list = Project.query.with_entities(Project.project_name).all()
    for p in project_list:
        proj_list.append(p[0])
    proj_list.sort()
    return jsonify({'status': True, 'project_list': proj_list})


@app.route('/api/v1.0/submitScores', methods=['POST'])
def submit_scores():
    print request.get_json()
    return jsonify({'status': True})



