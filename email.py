from flask import Flask, render_template, request
from flask_mail import Mail, Message

app = Flask(__name__)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'lwanguderrick5@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'veegar2005'         # Replace with your email password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    subject = request.form['subject']
    message = request.form['message']
    sender_email = request.form['email']
    fullname = request.form['fullname']
    phone = request.form['phone']

    msg = Message(subject, sender=sender_email, recipients=['lwanguderrick5@gmail.com'])
    msg.body = f"Message from {fullname} ({sender_email}, {phone}):\n\n{message}"

    mail.send(msg)
    return 'Email sent!'

if __name__ == '__main__':
    app.run(debug=True)