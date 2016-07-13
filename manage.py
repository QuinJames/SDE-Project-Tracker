from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import app, db
from app.models import Project
# app.run(host='172.22.220.74', debug=True);
# app.run(debug=True)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """
    Create the required database tables
    :return: None
    """
    db.create_all()


@manager.command
def drop_db():
    db.drop_all()


@manager.command
def create_project(project_name, engineer):
    db.session.add(Project(project_name=project_name, engineer=engineer))
    db.session.commit()


if __name__ == "__main__":
    manager.run()
