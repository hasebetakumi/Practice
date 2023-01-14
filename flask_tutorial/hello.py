from flask import Flask, render_template

app = Flask(__name__)


    
# HTMLのエスケープ処理HTML Escaping
# jinjaでの出力{{ name }}では自動的にエスケープされる
from markupsafe import escape

@app.route("/<name>")
def hello(name):
    return f"Hello, {escape(name)}!"

# ユニークなURLと転送（Redirection）の振舞
# 以下は最後のスラッシュがあってもなくてもアクセス可能
# 最後のスラッシュがある方が正規表現
@app.route('/projects/')
def projects():
    return 'The project page'

# 以下は最後にスラッシュをつけたものにはアクセス不可
@app.route('/about')
def about():
    return 'The about page'

# URLの構築(https://shigeblog221.com/flask-urlfor/)
from flask import url_for, redirect

# 以下のように関数名を指定してリダイレクトできる。
# 第2引数は関数の引数として渡せる
@app.route('/index')
def index():
    return redirect(url_for('next_func', msg='aaaaaa'))

@app.route('/next/<msg>')
def next_func(msg):
    return f'next, {msg}'

# 以下のようにjinjaの中に書くこともできる
@app.route("/")
def hello_world():
    # 以下のようにログを指定する
    app.logger.warning('A warning occurred (%d apples)', 42)
    return render_template('index.html')

# HTTPメソッド
# メソッドで分けたい場合は以下のように書くこともできる
@app.get('/login')
def login_get():
    return 'show_the_login_form()'

@app.post('/login')
def login_post():
    return 'do_the_login()'

# コンテキストの局所的オブジェクト（Context Locals）
from flask import request

# 疑似的、一時的に/helloに対してpostを送る
with app.test_request_context('/hello', method='POST'):
    # now you can do something with the request until the
    # end of the with block, such as basic assertions:
    # パスとメソッドが正しいか確認
    # assert 条件式, 条件式がFalseの場合に出力するメッセージ
    # 条件式が False の場合、AssertionError の例外が発生します。
    # 条件式が True の場合は何も起こりません。
    assert request.path == '/hello'
    assert request.method == 'POST'

# クエリパラメータの受け取り方
# searchword = request.args.get('key', '')

# 転送（Redirects）とエラー
# https://qiita.com/mink0212/items/52e0ebd66bd94e1303c1#abort%E9%96%A2%E6%95%B0%E3%81%ABhttp%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%82%92%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B

# レスポンスについて
# https://blowup-bbs.com/python-flask_response/

# ログ機能
# app.logger.warning('A warning occurred (%d apples)', 42)

# blueprint
# https://rurukblog.com/post/Flask-blueprint/
from flask import Blueprint
import hello2
app.register_blueprint(hello2.hello2)

@app.route('/blue')
def blue():
    return render_template('home.html')
