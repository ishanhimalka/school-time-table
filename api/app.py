from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:zxcvbnm123@localhost:3306/school'
db = SQLAlchemy(app)
CORS(app)

# teacher model
class Teacher(db.Model):
    __tablename__ = "teacherDetails"
    nic = db.Column(db.String(30), primary_key=True)
    name = db.Column(db.String(200))
    birthday = db.Column(db.String(10))
    contact = db.Column(db.Integer)
    address = db.Column(db.String(200))
    email = db.Column(db.String(50))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, nic, name, birthday, contact, address, email):
        self.nic = nic
        self.name = name
        self.birthday = birthday
        self.contact = contact
        self.address = address
        self.email = email

    def __repr__(self):
        return f"{self.nic}"

db.create_all()

# subject model
class Subjects(db.Model):
    __tablename__ = "subjectDetails"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"{self.id}"


db.create_all()


# # TieTable model
# class TimeTable(db.Model):
#     __tablename__="timetable"
#     class_room = db.Column(db.String(20), primary_key=True)
#     time= db.Column(ARRAY(Unicode))
#
#     def create(self):
#         db.session.add(self)
#         db.session.commit()
#         return self
#
#     def __init__(self,class_room,time):
#         self.class_room = class_room
#         self.time = time
#
#     def __repr__(self):
#         return f"{self.class_room}"
#
# db.create_all()

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

    def __init__(self, id, class_room, first_period, second_period, third_period, fourth_period, fifth_period,
                 six_period, seventh_period, eighth_period):
        self.id = id
        self.class_room = class_room
        self.first_period = first_period
        self.second_period = second_period
        self.third_period = third_period
        self.fourth_period = fourth_period
        self.fifth_period = fifth_period
        self.six_period = six_period
        self.seventh_period = seventh_period
        self.eighth_period = eighth_period

    def __repr__(self):
        return f"{self.id}"

db.create_all()

# class model
class ClassDetails(db.Model):
    __tablename__ = "classDetails"
    id = db.Column(db.String(20), primary_key=True)
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

# Subject control
class SubjectSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Subjects
        sqla_session = db.session

    id = fields.Number(required=True)
    name = fields.String(required=True)

# Class control
class ClassSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = ClassDetails
        sqla_session = db.session

    id = fields.String(required=True)
    grade = fields.String(required=True)
    name = fields.String(required=True)
    teacher = fields.String(required=True)

# Class control
class TimeTablSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = TimeTableDetails
        sqla_session = db.session

    id = fields.Number(required=True)
    class_room = fields.String(required=True)
    first_period = fields.String(required=True)
    second_period = fields.String(required=True)
    third_period = fields.String(required=True)
    fourth_period = fields.String(required=True)
    fifth_period = fields.String(required=True)
    six_period = fields.String(required=True)
    seventh_period = fields.String(required=True)
    eighth_period = fields.String(required=True)

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
def index_teacher():
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

# subject route
@app.route('/api/v1/setsubject', methods=['POST'])
def create_subjectsdetails():
    data = request.get_json()
    subject_schema = SubjectSchema()
    subject = subject_schema.load(data)
    result = subject_schema.dump(subject.create())
    return make_response(jsonify({"subject": result}), 200)

@app.route('/api/v1/updatesubject/<id>', methods=['PUT'])
def update_subject_by_id(id):
    data = request.get_json()
    get_subject = Subjects.query.get(id)
    if data.get('name'):
        get_subject.name = data['name']
    db.session.add(get_subject)
    db.session.commit()
    subject_schema = SubjectSchema(only=['id', 'name'])
    subject = subject_schema.dump(get_subject)

    return make_response(jsonify({"subject": subject}))

@app.route('/api/v1/getsubject', methods=['GET'])
def index_subject():
    get_subject = Subjects.query.all()
    subject_schema = SubjectSchema(many=True)
    subject = subject_schema.dump(get_subject)
    return make_response(jsonify({"subject": subject}))

@app.route('/api/v1/getsubject/<id>', methods=['GET'])
def get_subject_by_id(id):
    get_subject = Subjects.query.get(id)
    subject_schema = SubjectSchema()
    subject = subject_schema.dump(get_subject)
    return make_response(jsonify({"subject": subject}))

@app.route('/api/v1/delsubject/<id>', methods=['DELETE'])
def delete_subject_by_id(id):
    get_subject = Subjects.query.get(id)
    db.session.delete(get_subject)
    db.session.commit()
    return make_response("", 204)

#
# # teacherSubject route
# @app.route('/api/v1/setteacherSubject', methods=['POST'])
# def create_teacherSubject_details():
#     data = request.get_json()
#     teacherSubject_schema = TeacherSubjectSchema()
#     teacherSubject = teacherSubject_schema.load(data)
#     result = teacherSubject_schema.dump(teacherSubject.create())
#     return make_response(jsonify({"teacherSubject": result}), 200)
#
# @app.route('/api/v1/updateteacherSubject/<id>', methods=['PUT'])
# def update_teacherSubject_by_id(id):
#     data = request.get_json()
#     get_subject = TeacherSubject.query.get(id)
#     if data.get('name'):
#         get_subject.name = data['name']
#     db.session.add(get_subject)
#     db.session.commit()
#     teacherSubject_schema = TeacherSubjectSchema(only=['id', 'teacherSubject'])
#     teacherSubject = teacherSubject_schema.dump(get_subject)
#
#     return make_response(jsonify({"teacherSubject": teacherSubject}))
#
# @app.route('/api/v1/getteacherSubject', methods=['GET'])
# def index_teacherSubject():
#     get_subject = TeacherSubject.query.all()
#     teacherSubject_schema = TeacherSubjectSchema(many=True)
#     teacherSubject = teacherSubject_schema.dump(get_subject)
#     return make_response(jsonify({"teacherSubject": teacherSubject}))
#
# @app.route('/api/v1/getteachersubjectt/<id>', methods=['GET'])
# def get_teacherSubject_by_id(id):
#     get_subject = TeacherSubject.query.get(id)
#     teacherSubject_schema = TeacherSubjectSchema()
#     teacherSubject = teacherSubject_schema.dump(get_subject)
#     return make_response(jsonify({"teacherSubject": teacherSubject}))
#
#
# @app.route('/api/v1/delteachersubject/<id>', methods=['DELETE'])
# def delete_teacherSubject_by_id(id):
#     get_subject = TeacherSubject.query.get(id)
#     db.session.delete(get_subject)
#     db.session.commit()
#     return make_response("", 204)

# class route

# class route
@app.route('/api/v1/setclass', methods=['POST'])
def create_classdetails():
    data = request.get_json()
    class_schema = ClassSchema()
    classes = class_schema.load(data)
    result = class_schema.dump(classes.create())
    return make_response(jsonify({"classes": result}), 200)

@app.route('/api/v1/updateclass/<id>', methods=['PUT'])
def update_classes_by_id(id):
    data = request.get_json()
    get_class = ClassDetails.query.get(id)
    if data.get('grade'):
        get_class.grade = data['grade']
    if data.get('name'):
            get_class.name = data['name']
    if data.get('teacher'):
            get_class.teacher = data['teacher']
    db.session.add(get_class)
    db.session.commit()
    class_schema = ClassSchema(only=['id','grade', 'name','teacher'])
    classes = class_schema.dump(get_class)

    return make_response(jsonify({"classes": classes}))

@app.route('/api/v1/getclass', methods=['GET'])
def index_classes():
    get_class = ClassDetails.query.all()
    class_schema = ClassSchema(many=True)
    classes = class_schema.dump(get_class)
    return make_response(jsonify({"classes": classes}))

@app.route('/api/v1/getclass/<id>', methods=['GET'])
def get_class_by_id(id):
    get_class = ClassDetails.query.get(id)
    class_schema = ClassSchema()
    classes = class_schema.dump(get_class)
    return make_response(jsonify({"classes": classes}))

@app.route('/api/v1/delclass/<id>', methods=['DELETE'])
def delete_classes_by_id(id):
    get_class = ClassDetails.query.get(id)
    db.session.delete(get_class)
    db.session.commit()
    return make_response("", 204)

# timetable route
@app.route('/api/v1/settimetable', methods=['POST'])
def create_timetable_details():
    data = request.get_json()
    timetable_schema = TimeTablSchema()
    timetable = timetable_schema.load(data)
    result = timetable_schema.dump(timetable.create())
    return make_response(jsonify({"timetable": result}), 200)
#
# @app.route('/api/v1/updatetimetable/<id>', methods=['PUT'])
# def update_classes_by_id(id):
#     data = request.get_json()
#     get_class = ClassDetails.query.get(id)
#     if data.get('grade'):
#         get_class.grade = data['grade']
#     if data.get('name'):
#             get_class.name = data['name']
#     if data.get('teacher'):
#             get_class.teacher = data['teacher']
#     db.session.add(get_class)
#     db.session.commit()
#     class_schema = ClassSchema(only=['id','grade', 'name','teacher'])
#     classes = class_schema.dump(get_class)
#
#     return make_response(jsonify({"classes": classes}))
#
@app.route('/api/v1/gettimetable', methods=['GET'])
def index_timetable():
    get_timetable = TimeTableDetails.query.all()
    timetable_schema = TimeTablSchema(many=True)
    timetable = timetable_schema.dump(get_timetable)
    return make_response(jsonify({"timetable": timetable}))

@app.route('/api/v1/gettimetable/<id>', methods=['GET'])
def get_timetable_by_id(id):
    get_timetable = TimeTableDetails.query.get(id)
    timetable_schema = TimeTablSchema()
    timetable = timetable_schema.dump(get_timetable)
    return make_response(jsonify({"timetable": timetable}))

# @app.route('/api/v1/deltimetable/<id>', methods=['DELETE'])
# def delete_classes_by_id(id):
#     get_class = ClassDetails.query.get(id)
#     db.session.delete(get_class)
#     db.session.commit()
#     return make_response("", 204)