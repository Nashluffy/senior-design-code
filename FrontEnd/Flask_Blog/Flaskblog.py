from flask import Flask, render_template, url_for
app = Flask(__name__) #this give us an instantiated flask application

#If I were to make a database call I would receive a list of post
#whose variable name is post

#posts = [
	#{
	#	'arthuor': 'Leon Johnson',
	#	'title': 'Blog Post 1',
	#	'content' : 'First postconet',
	#	 'date_posted' : 'April 20, 2018'
	#},
	#	{

	#	'arthuor': 'John doe',
	#	'title': 'Blog Post 2',
	#	'content' : 'Second postconet',
	#	 'date_posted' : 'April 21, 2018'
	#}

#]

@app.route("/") #decorator
@app.route("/home")
def home():
    return render_template('home.html', title = 'Hcdome')



@app.route("/about")
def about():
    return render_template('about.html', title = 'about')


if __name__ == '__main__':
    app.run(debug=True)