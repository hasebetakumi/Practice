from flaskr import create_app


# テストモードになるかチェック
def test_config():
    # .testing→テストモードかどうか問い合わせ
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing


# クライアントからのレスポンスチェック
def test_hello(client):
    response = client.get('/hello')
    assert response.data == b'Hello, World!'