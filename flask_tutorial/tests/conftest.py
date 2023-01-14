import os
import tempfile

import pytest
from flaskr import create_app
from flaskr.db import get_db, init_db

with open(os.path.join(os.path.dirname(__file__), 'data.sql'), 'rb') as f:
    _data_sql = f.read().decode('utf8')


# fixture→テストで共有できるプログラムの部品
# テストのどこでも、関数名で呼び出せる
# その場合は引数として渡す
# !!!fixtureをテストモジュール間で共有したいときは、conftest.pyに書く!!!
@pytest.fixture
def app():
    # tempfile.mkstemp()→一時的なファイルを作成する。→後で自分で削除する。→os.unlink(path)
    # tempfile.mkstemp()→dbのfile descripterとdbのパスを返す
    # file descripter→操作対象のファイルを識別するために割り当てられる番号
    db_fd, db_path = tempfile.mkstemp()

    # __init __.pyのcreate_app起動
    app = create_app({
        # appがテストモードであることを宣言。
        'TESTING': True,
        'DATABASE': db_path,
    })

    # init_db()はアプリ作成時にCLIから実行した関数
    # init_dbとget_db内でcurrent_appを使用しているため、withステートのapp_contextが必要
    # appのapp_contextの中に、current_app()とgが保存されている。
    with app.app_context():
        # データベース初期化
        init_db()
        # get_db()でデータベースとコネクトして、初期データを入れるsql実行
        get_db().executescript(_data_sql)

    yield app

    # os.close→指定されたファイルデイスクリプタを閉じる
    os.close(db_fd)
    # os.unlink→removeと等価→指定したパスのファイルを削除する
    os.unlink(db_path)


# test_clientを実行するだけ
# test_client→テスト用のクライアントを作成→このクライアントに対してリクエストを送っていく
# →サーバーを使わずにリクエストのテストを行うことができる。
@pytest.fixture
def client(app):
    return app.test_client()

# app.test_cli_runner()→テスト用のランナーを起動。
# →clickコマンドを呼び出すことができる→CLIのテスト→initコマンドのテスト
@pytest.fixture
def runner(app):
    return app.test_cli_runner()




class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username='test', password='test'):
        return self._client.post(
            '/auth/login',
            data={'username': username, 'password': password}
        )

    def logout(self):
        return self._client.get('/auth/logout')


@pytest.fixture
def auth(client):
    return AuthActions(client)