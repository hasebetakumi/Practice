// storeの初期状態
// アプリに必要なstateを全て記述
console.log('initial state')
const initialState = {
    
    products: {

    },

    users: {
        isSignedIn: false,
        uid: "",
        username: ""
    }
}

export default initialState