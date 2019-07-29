@app.route('/register', methods = ['POST']) #Skyaudio/Register

def newUser():
    username = request.json.get('username') # will get username from JSON body
    password = request.json.get('password') # will get password from JSON body