from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:zxcvbnm123@localhost:3306/school'
db = SQLAlchemy(app)
CORS(app)



# subject model
class Subjects(db.Model):
    __tablename__ = "subjectDetails"
    id = db.Column(db.Integer, primary_key=True)
    subject = db.column(db.String(200))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, id, subject):
        self.id = id
        self.subject = subject

    def __repr__(self):
        return f"{self.id}"

    db.create_all()

# Subject control
class SubjectSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Subjects
    sqla_session = db.session

    id = fields.Number(dump_only=True)
    subject = fields.String(required=True)


# teacher model
class Teacher(db.Model):
    __tablename__ = "teacherDetails"
    nic = db.Column(db.String(30), primary_key=True)
    name = db.Column(db.String(200))
    birthday = db.Column(db.String(10))
    contact = db.Column(db.Integer)
    address = db.Column(db.String(200))
    email = db.Column(db.String(50))
    subject = db.relationship('Subject',secondary='teacher_subject',backref='teacherDetails')

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, nic, name, birthday, contact, address, email,subject):
        self.nic = nic
        self.name = name
        self.birthday = birthday
        self.contact = contact
        self.address = address
        self.email = email
        self.subject =subject

    def __repr__(self):
        return f"{self.nic}"

        db.create_all()

# teacherSubject model
class TeacherSubject(db.Model):
    __tablename__ = "teacher_subject"
    id = db.Column(db.Integer, primary_key=True)
    teacher_nic = db.Column('teacher_nic', db.String(30), db.ForeignKey('teacherDetails.nic'))
    subject_id = db.Column('subject_id', db.Integer, db.ForeignKey('subjectDetails.id'))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, id, teacher_nic, subject_id):
        self.id = id
        self.teacher_nic = teacher_nic
        self.subject_id = subject_id

    def __repr__(self):
        return f"{self.id}"

    db.create_all()

# class model
class ClassDetails(db.Model):
    __tablename__ = "classDetails"
    id = db.Column(db.Integer, primary_key=True)
    grade = db.Column(db.String(20))
    name = db.Column(db.String(20))
    teacher = db.Column(db.String(10))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, id, grade, name, teacher):
        self.id = id
        self.grade = grade
        self.name = name
        self.teacher = teacher

    def __repr__(self):
        return f"{self.id}"

        db.create_all()

# TimeTableDetails model
class TimeTableDetails(db.Model):
    __tablename__ = "timeTableDetails"
    id = db.Column(db.Integer, primary_key=True)
    class_room = db.Column(db.String(20))
    first_period = db.Column(db.String(20))
    second_period = db.Column(db.String(20))
    third_period = db.Column(db.String(10))
    fourth_period = db.Column(db.String(20))
    fifth_period = db.Column(db.String(10))
    six_period = db.Column(db.String(20))
    seventh_period = db.Column(db.String(10))
    eighth_period = db.Column(db.String(10))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, id, class_room, first_period, second_period,third_period,fourth_period,fifth_period,six_period,seventh_period,eighth_period):
        self.id = id
        self.class_room = class_room
        self.first_period = first_period
        self.second_period = second_period
        self.third_period = third_period
        self.fourth_period = fourth_period
        self.six_period = six_period
        self.seventh_period = seventh_period
        self.eighth_period = eighth_period

    def __repr__(self):
        return f"{self.id}"
        db.create_all()

# teachers control
class TeacherDetailsSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Teacher
        sqla_session = db.session

    nic = fields.String(required=True)
    name = fields.String(required=True)
    birthday = fields.String(required=True)
    contact = fields.Number(required=True)
    address = fields.String(required=True)
    email = fields.String(required=True)

# teacher route
@app.route('/api/v1/setteacher', methods=['POST'])
def create_teachersdetails():
    data = request.get_json()
    teacher_schema = TeacherDetailsSchema()
    teacher = teacher_schema.load(data)
    result = teacher_schema.dump(teacher.create())
    return make_response(jsonify({"teacher": result}), 200)


@app.route('/api/v1/updateteacher/<nic>', methods=['PUT'])
def update_teacher_by_id(nic):
    data = request.get_json()
    get_teacher = Teacher.query.get(nic)
    if data.get('name'):
        get_teacher.name = data['name']
    if data.get('birthday'):
        get_teacher.birthday = data['birthday']
    if data.get('contact'):
        get_teacher.contact = data['contact']
    if data.get('address'):
        get_teacher.address = data['address']
    if data.get('email'):
        get_teacher.email = data['email']
    db.session.add(get_teacher)
    db.session.commit()
    teacher_schema = TeacherDetailsSchema(only=['nic', 'name', 'birthday', 'address', 'email'])
    teacher = teacher_schema.dump(get_teacher)

    return make_response(jsonify({"teacher": teacher}))


@app.route('/api/v1/getteacher', methods=['GET'])
def index():
    get_teacher = Teacher.query.all()
    teacher_schema = TeacherDetailsSchema(many=True)
    teacher = teacher_schema.dump(get_teacher)
    return make_response(jsonify({"teacher": teacher}))


@app.route('/api/v1/getteacher/<nic>', methods=['GET'])
def get_teacher_by_id(nic):
    get_teacher = Teacher.query.get(nic)
    teacher_schema = TeacherDetailsSchema()
    teacher = teacher_schema.dump(get_teacher)
    return make_response(jsonify({"teacher": teacher}))


@app.route('/api/v1/delteacher/<nic>', methods=['DELETE'])
def delete_teachers_by_id(nic):
    get_teacher = Teacher.query.get(nic)
    db.session.delete(get_teacher)
    db.session.commit()
    return make_response("", 204)
