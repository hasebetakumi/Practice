// containerを使うためのクラス
// containerで作成したmapStateToPropsとmapDispatchToPropsを利用することができる

import { Component } from "react";

export default class LoginClass extends Component {
    render() {
        console.log(this.props.users)

        return (
            <div>
                <h2>LoginClass</h2>
                <button onClick={() => this.props.operations.signIn()}>ログインする</button>
                <p>{this.props.users.uid}</p>
                <p>{this.props.users.username}</p>
            </div>
        )
    }
}