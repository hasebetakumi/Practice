import os

from flask import Flask


# アプリケーション製造工場（application factory）
def create_app(test_config=None):
    # instance_relative_config=True→設定ファイルを相対パスで渡します
    app = Flask(__name__, instance_relative_config=True)
    # appが使用する
    app.config.from_mapping(
        # 開発中だからdev、本番ではランダムな値にするべき
        SECRET_KEY='dev',
        # データベースが保存されるパス
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # もしinstanceフォルダにconfig.pyファイルがあれば、値をそこから取り出して、標準設定を上書き
        app.config.from_pyfile('config.py', silent=True)
    else:
        # 設定ファイルをロード
        app.config.from_mapping(test_config)

    # インスタンスフォルダが存在することを確認する
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    # db.pyをimportして実行
    from . import db
    db.init_app(app)

    # auth.pyからblueprintをimportして登録
    # auth.pyはユーザー登録、ログイン、ログアウトのviewを持つ
    from . import auth
    app.register_blueprint(auth.bp)

    from . import blog
    app.register_blueprint(blog.bp)
    # app.add_url_rule()→エンドポイント名'index'をURLの/と関連付け。
    # endpoint引数で指定した値とurl_forの引数が一致する場合、URLを第一引数に変換
    # →urlの末尾がindexの場合は/にリダイレクト
    app.add_url_rule('/', endpoint='index')

    return app