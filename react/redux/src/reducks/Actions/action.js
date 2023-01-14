// Actionsはただただデータを渡すだけ。
// ここでデータをいじったり、APIを叩いたりはしない
// →それを行うのがoperationファイル
// 通常のactionはaction objectを受け取るため関数を受け取れない
// →async await Promise等の非同期処理を行うことができない

// 1.Action typeを定義してexport
export const SIGN_IN = "SIGN_IN"

export const signInAction = (userState) => {
    // 3. プレーンなobjectを返す
    // プレーン→{}で括ったデータそのもの
    console.log('return action')
    return {
        // 2. typeとpayload(データ)を記述
        // 書き換えたい内容を記述してあげる
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            uid: userState.uid,
            username: userState.username
        }
    }
}

export const SIGN_OUT = "SIGN_OUT"

// 引数はない
// →サインイン情報を初期値に戻せばいいだけだから
export const signOutAction = () => {
    return {
        // 書き換えたい内容を記述してあげる
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            uid: "",
            username: ""
        }
    }
}