import datetime
from app import db, bcrypt


class Project(db.Model):
    __tablename__ = "projects"
    project_id = db.Column(db.String(255), primary_key=True, nullable=False)
    project_name = db.Column(db.String(255), nullable=False)

    def __init__(self, project_id, project_name, engineer):
        self.project_id = project_id
        self.project_name = project_name

    def __repr__(self):
        return '<Project: {0}'.format(self.project_name)


class Engineer(db.Model):
    __tablename__ = "engineer"
    engineer_id = db.Column(db.String(255), primary_key=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)

    def __init__(self, engineer_id, first_name, last_name):
        self.engineer_id = engineer_id
        self.first_name = first_name
        self.last_name = last_name


class EngineerProject(db.Model):
    __tablename__ = "engineer_project"
    project_name = db.Column(db.String(255), db.ForeignKey("projects.project_id"), primary_key=True,  nullable=False)
    engineer_name = db.Column(db.String(255), db.ForeignKey("engineer.engineer_id"),  primary_key=True,
                              nullable=False)


class Rating(db.Model):
    __tablename__ = "ratings"
    project_id = db.Column(db.String(255), db.ForeignKey("projects.project_id"), primary_key=True, nullable=False)
    rater = db.Column(db.String(255), primary_key=True, nullable=False)
    usability = db.Column(db.String(255))
    web_accessibility = db.Column(db.String(255))
    content = db.Column(db.String(255))
    customization = db.Column(db.String(255))
    speed = db.Column(db.String(255))
    availability = db.Column(db.String(255))
    visual = db.Column(db.String(255))
    style = db.Column(db.String(255))
    usability_comment = db.Column(db.String(255))
    relevance_comment = db.Column(db.String(255))
    performance_comment = db.Column(db.String(255))
    design_comment = db.Column(db.String(255))

    def __init__(self, project_id, rater, usability, web_accessibility, content, customization, speed, availability,
                 visual, style, usability_comment, relevance_comment, performance_comment, design_comment):
        self.project_id = project_id
        self.rater = rater
        self.usability = usability
        self.web_accessibility = web_accessibility
        self.content = content
        self.customization = customization
        self.speed = speed
        self.availability = availability
        self.visual = visual
        self.style = style
        self.usability_comment = usability_comment
        self.relevance_comment = relevance_comment
        self.performance_comment = performance_comment
        self.design_comment = design_comment
