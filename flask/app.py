import os
from redis import Redis
from flask import Flask, render_template_string, request, session, redirect, url_for
from flask_session import Session



# Create the Flask application
app = Flask(__name__)

# Details on the Secret Key: https://flask.palletsprojects.com/en/1.1.x/config/#SECRET_KEY
# NOTE: The secret key is used to cryptographically-sign the cookies used for storing
#       the session identifier.
app.secret_key = os.environ.get("SECRET_KEY")

# Configure Redis for storing the session data on the server-side
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = Redis(host='redis', port=6379)

# Create and initialize the Flask-Session object AFTER `app` has been configured
server_session = Session(app)


@app.route('/set_username', methods=['GET', 'POST'])
def set_username():
    if request.method == 'POST':
        # Save the form data to the session object
        session['username'] = request.form['input_name']
        
        return redirect(url_for('show_username'))

    return """
        <form method="post" action="/set_username" enctype="multipart/form-data">
            <label for="input_name">Set your username:</label>
            <input type="text" id="input_name" name="input_name" required />
            <button type="submit">Submit</button
        </form>
        """


@app.route('/show_username')
def show_username():
    if session.get('username'):
        return render_template_string("""
                    <p> username : {{ session['username'] }} </p>
                    <p> session id : {{ session.sid }} </p>
            """)
    else:
        return render_template_string("""
                    <h1>Welcome! Please set your username <a href="{{ url_for('set_username') }}">here.</a></h1>
            """)


@app.route('/delete_username')
def delete_username():
    # Clear the username stored in the session object
    session.pop('username', default=None)
    return '<h1>Session deleted!</h1>'




if __name__ == '__main__':
    app.run( host="0.0.0.0" , port=5000 )