from flask import Blueprint, render_template

hello2 = Blueprint('goodmorning', __name__, url_prefix='/goodmorning')

@hello2.route('/')
def goodmorning():
    return render_template('hello2.html')