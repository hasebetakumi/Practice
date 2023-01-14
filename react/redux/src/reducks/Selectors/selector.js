// storeで管理しているstateを参照する関数
/*
ゲッターみたいなもの
→特定の情報を抜き取るとき便利
*/ 

// createSelectorを用いてゲッターを作成すると、store変更時に自動で再レンダリングしてくれる
import { createSelector } from "reselect";

// stateからどのデータを用いるのかを指定
// このstateはstore全て
const usersSelector = (state) => state.users;

// createSelector→第1引数にstate内のどのデータなのか、第2引数にはそのデータから何を抜き取るか
export const getUserId = createSelector(
    [usersSelector],
    // このstateは[usersSelector]で取得したものが入ってる
    state => state.uid
)

export const getUserName = createSelector(
    [usersSelector],
    state => state.username
)
