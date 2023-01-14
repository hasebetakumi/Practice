import sqlite3

import click
from flask import current_app, g


def get_db():
    # g→1回のリクエストの間で有効なグローバル情報を保存することができます。
    # グローバル情報の中に'db'の情報がないならコネクションを作成する
    if 'db' not in g:
        g.db = sqlite3.connect(
            # application_factoryを使用しているため、appがグローバル変数ではないため、特別なオブジェクトであるcurrent_appを利用
            current_app.config['DATABASE'],

            detect_types=sqlite3.PARSE_DECLTYPES
        )
        # sqlite3.Row→辞書のように動作する行を返すように接続に指示します。これにより、名前によってカラムにアクセスできるようになります。
        g.db.row_factory = sqlite3.Row
    
    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        # executescript()→複数のSQL文を実行
        db.executescript(f.read().decode('utf8'))


# click.command→CLIを叩いた時みたいにできる
# CLIでinit-dbを実行すると以下が動く
# flask --app flaskr --help 
@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    # app.teardown_appcontext()→レスポンスを返した後のクリーンアップを行っているときに、close_db呼び出し
    # 途中でエラーがあっても呼び出される
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)