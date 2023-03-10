import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from .db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # dbとのコネクション作成
        db = get_db()
        error = None

        # 値が空かどうか確認
        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        # エラーに何も入らなかったらsql実行
        if error is None:
            try:
                db.execute(
                    "INSERT INTO user (username, password) VALUES (?, ?)",
                    (username, generate_password_hash(password)),
                )
                db.commit()
            # ユーザー名が存在するエラー
            except db.IntegrityError:
                error = f"User {username} is already registered."
            else:
                # ログイン関数へリダイレクト
                return redirect(url_for("auth.login"))

        # エラーが入ってたらエラーをflash
        flash(error)

    return render_template('auth/register.html')


@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None

        # fetchone→クエリ結果を一つだけ返す。
        user = db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            # session→リクエストを跨いで格納されるcookie
            # sessionのuser_idに認証に成功したユーザーのIDを入れる。
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index'))

        flash(error)

    return render_template('auth/login.html')


# @bp.before_app_request→どのURLがリクエストされたかに関わらず、view関数の前に実行する
@bp.before_app_request
# 多分、、URLが変化するたびにidがdb内に存在するか調べる
def load_logged_in_user():
    user_id = session.get('user_id')

    # g→1回のリクエストの間で有効なグローバル情報を保存
    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()


@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        # 1回のリクエストの間で有効なグローバル情報にuserがないならログイン画面へ
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view