import os

basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig(object):
    URL = "ldap://172.20.10.101"
    DOMAIN = "@digicelgroup.local"
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 13
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'project_feedback_application'