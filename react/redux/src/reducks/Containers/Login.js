
// container→指定したクラスコンポーネント内で利用できるstateとactionを指定する
// map---ToProps→親から受け取ることなく子コンポーネントがpropsとしてstateを扱える

import LoginClass from "../templates/LoginClass";
import { compose } from "redux";
import { connect } from "react-redux";
import * as Operations from '../Operations/operation'

// storeの全てのstateを受けとる
// connectの第1引数にすることでmapStateToPropsということが感知される→関数名と引数名はなんでもいい
// dispatchが起こるたびにgetstate()を呼び出し差分を確認。あれば再レンダリングを行う
const mapStateToProps = state => {
    // 接続先コンポーネントで利用するstateを指定
    return {
        users: state.users
    }
}

// storeからdispatchする関数（=Actions）を第1引数に受け取る？
// connectの第2引数にすることでmapDispatchToPropsということが感知される→関数名と引数名はなんでもいい
const mapDispatchToProps = dispatch => {
    return {
        operations: {
            signIn() {
                /*
                opetationsのsignIn関数の中身はコールバック関数のため
                redux-thunkの内部処理が動く
                →コールバック関数に対してdispatch関数とgetState関数を渡し、
                コールバック関数終了後に指定したactionをreducerに送る
                */ 
                dispatch(Operations.signIn())
            }
        }
    }
}

export default compose(
    // 呼び出されたときにstate,dispatch共に適する関数を作成しコンポーネントに渡す。
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(LoginClass)