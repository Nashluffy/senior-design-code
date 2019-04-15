from flask import Flask, render_template, url_for, request
from werkzeug import secure_filename
application = Flask(__name__) 


@application.route("/")
def index():
    return "Hello World!"


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


@application.route("/uploader" , methods = ['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		f = request.files['file']
		f.save(secure_filename(f.filename))
		return "file uploaded successfully"


if __name__ == '__main__':
    application.run()
