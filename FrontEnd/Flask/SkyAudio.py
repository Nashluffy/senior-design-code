from flask import Flask, flash, redirect, send_from_directory, render_template, url_for, request, Response
from werkzeug import secure_filename
import os, boto3

#UPLOAD_FOLDER = '/home/ec2-user/SkyAudio/SkyAudio/FrontEnd/Flask/tmp/'
UPLOAD_FOLDER = '/tmp'
ALLOWED_EXTENSIONS = set(['txt', 'mp3', 'wav', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

application = Flask(__name__) 
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
application.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

s3_client = boto3.resource('s3')

@application.route("/")
def index():
    return "Hello World!"


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@application.route('/download', methods=['GET'])
def download_file():
    if request.method == 'GET':
        return "Got it working"
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''


@application.route('/', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if file and allowed_file(file.filename):

@application.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(application.config['UPLOAD_FOLDER'],
                               filename)

@application.route("/home")
def home():
    return render_template('home.html', title = 'Home')


@application.route("/about")
def about():
    return render_template('about.html', title = 'about')


@application.route("/user")
def user():
	return render_template('User.html', title = 'User')


@application.route("/record")
def record():
	return render_template('record.html', title = 'Record')


#@application.route("/uploader" , methods = ['GET', 'POST'])
#def upload_file():
#	if request.method == 'POST':
#		f = request.files['file']
#		f.save(secure_filename(f.filename))
#		return "file uploaded successfully"


if __name__ == '__main__':
    application.run()
