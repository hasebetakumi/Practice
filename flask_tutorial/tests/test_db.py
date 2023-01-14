import sqlite3

import pytest
from flaskr.db import get_db


def test_get_close_db(app):
    # 2回呼び出した時の内容が一緒かどうか
    with app.app_context():
        db = get_db()
        assert db is get_db()

    # 閉じてるときにsql送ったら、エラーが出るであろう
    with pytest.raises(sqlite3.ProgrammingError) as e:
        db.execute('SELECT 1')

    # エラー分の中にはclosedが含まれているであろう
    assert 'closed' in str(e.value)


def test_init_db_command(runner, monkeypatch):
    class Recorder(object):
        called = False

    def fake_init_db():
        Recorder.called = True

    # monkeypatch→メソッドの差し替えを行う→init_dbが呼ばれたらfake_init_dbを呼び出す
    monkeypatch.setattr('flaskr.db.init_db', fake_init_db)

    # CLIでinit-dbを実行したときにInitializedが返ってくるかどうか
    result = runner.invoke(args=['init-db'])
    assert 'Initialized' in result.output

    # Recoderクラスはcalledにfalseが初期設定されている
    # fake_init_dbが呼び出されたらそれがtrueに変わるため、呼び出されたかチェックできる
    assert Recorder.called