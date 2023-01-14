// operationファイルの役割
/* 
コンポーネントからのメソッド（onClick等）からまず呼び出されるのがこのoperation
operatinoファイルで処理を行った後にactionを呼び出す
actionがデータをreducerに渡す
→このoperationがあるからactionはただデータを渡すだけで済んでいる

1. 複雑な処理（API通信やデータベース）を任される
2. redux-thunkで非同期処理を制御する
3. actionsを呼び出す
*/
import { signInAction } from "../Actions/action"

 

// 以下はredux-thunkの基礎文法
// 以下の関数はコンポーネントから呼び出す
export const signIn = () => {
    // コールバック関数をreturn→asyncを宣言することで、中でawaitを利用することができる
    // 引数を2つ受け取ることができる
    // 第1引数はdispatch→actionを呼び出す
    // 第2引数はgetState→これを引数にすることで関数内で呼び出すとstore内のstateを取得することができる
    /*
    redux-thunkの内部処理として、
    https://qiita.com/jima-r20/items/7fee2f00dbd1f302e373
    */ 
    return async (dispatch, getState) => {
        const state = getState()
        const isSignedIn = state.users.isSignedIn

        // サインインしてないなら
        if (!isSignedIn) {
            // awaitを使用することで非同期だが処理が終了するまで待つことができる(今は仮想)
            const url = 'https://api.github.com/users/deatiger'

            // fetchは元々非同期処理のためawaitをつけないとどんどん先に進んでしまう
            const response = await fetch(url)
                                .then(res => res.json())
                                .catch(() => null)
            
                
            const username = response.login
            
            // actionの呼び出し
            dispatch(signInAction({
                isSignedIn: true,
                uid: '00002',
                username: username
            }))
            // 何回もdispatchできる
        }
    }
}