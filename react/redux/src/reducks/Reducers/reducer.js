// actionsからデータを受け取り
// storeのstateをどう変更するのか決める
// →現在のstoreがどうなっているのか知っていないといけない＋初期状態も

// actionファイルから全てのモジュールをimportし、Actionsという名前をつける
import * as Actions from '../Actions/action'
import initialState from '../Store/initialState'

// 第1引数はstate(現在又は初期のstore情報), 第2引数はactionがreturnした値(typeとpayload(変更したい内容))
export const UsersReducer = (state= initialState.users, action) => {
    switch (action.type) {
        case Actions.SIGN_IN:
            console.log('reducer')
            return {
                // ...→スプレッド構文→配列やオブジェクトを展開する
                /* 
                    const payload = {uid: "aaa", username: "torahack"}
                    console.log(payload)
                    →uid: "aaa", username: "torahack"
                    console.log({...payload})
                    →{uid: "aaa", username: "torahack"}

                    マージすることができる
                    const state = {isSigned: false}
                    console.log({...state, ...payload})
                    →{...state, ...payload, uid: "aaa", username: "torahack"}

                    !!同じキーを持っている場合は後ろのやつに更新される!!
                    !!異なるキーの場合はそれぞれ残る!!
                */ 
                ...state,
                ...action.payload
                /* 
                    スプレッド構文使わなかったら以下のように一個一個書かないといけない
                    isSignedIn: action.payload.isSignedIn,
                    uid: action.payload.uid,
                    username: action.payload.username
                */
            }
        default:
            return state
    }
}