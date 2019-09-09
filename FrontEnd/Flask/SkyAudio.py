from flask import send_file,Flask, flash, redirect, send_from_directory, render_template, url_for, request, Response
from werkzeug import secure_filename
from flask_bootstrap import Bootstrap
from nameko.standalone.rpc import ClusterRpcProxy
import os, boto3

SERVER_IP = os.environ.get('SERVER_IP')
RABBITMQ_USER = os.environ.get('RABBITMQ_USER')
RABBITMQ_PASS = os.environ.get('RABBITMQ_PASS')


#UPLOAD_FOLDER = '/home/ec2-user/SkyAudio/SkyAudio/FrontEnd/Flask/tmp/'
UPLOAD_FOLDER = '/tmp'
ALLOWED_EXTENSIONS = set(['txt', 'mp3', 'wav', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
bucket = 'skyaudio-curltest'
AMQP_URI = 'amqp://' + str(RABBITMQ_USER) + ':' + str(RABBITMQ_PASS) + '@' + str(SERVER_IP)
CONFIG = {'AMQP_URI': AMQP_URI}
application = Flask(__name__)
Bootstrap(application)
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
application.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

s3_client = boto3.client('s3')

@application.route("/", methods=['GET','POST'])
def index():

    if request.method == 'POST':
        selectedItem = request.form.get('SigProcMenu')
        if selectedItem == 'Reverb: Small Room':
            waveform = request.form.get('waveform')
            with ClusterRpcProxy(CONFIG) as rpc:
                result = rpc.SigProc.reverbSmallRoom(waveform)
        elif selectedItem == 'Test Nameko Services' :
            with ClusterRpcProxy(CONFIG) as rpc:
                result = rpc.SigProc.hello(name="World, RPC is up and functioning")
            return result

    elif request.method == 'GET':
        return render_template('index.html',title = 'Testing')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@application.route('/download', methods=['GET'])
def download_file():
    if request.method == 'GET':
        filename = request.form['file']
        s3_client.download_file(bucket, filename, UPLOAD_FOLDER + '/' + filename)
        file = UPLOAD_FOLDER + '/' + filename
        return send_file(file)

@application.route('/', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(application.config['UPLOAD_FOLDER'], filename))
            response = s3_client.upload_file(UPLOAD_FOLDER + '/' + filename, bucket, file.filename)
            os.remove(UPLOAD_FOLDER + '/' + filename)
        return 'Successfully uploaded to S3'
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
