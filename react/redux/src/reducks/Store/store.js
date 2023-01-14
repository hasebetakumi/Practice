import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';

import { connectRouter, routerMiddleware } from 'connected-react-router';

import {UsersReducer} from '../Reducers/reducer'


// store作成関数
// history→ユーザーの画面遷移情報が入っている
export default function makeStore(history) {
    console.log('return createstore')
    // createStore→第1引数であるreducerをactionがdispatchされるたびに実行する
    return createStore(
        // combineReducers→initialStateと同じデータ構造になるようにデータを整形する。
        combineReducers({
            // store内で画面遷移履歴であるhistoryを管理する
            router: connectRouter(history),
            users: UsersReducer
        }),
        // どのミドルウェアを適用するのかを宣言する場所
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}