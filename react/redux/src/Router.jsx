import { Route, BrowserRouter } from "react-router-dom";
import {Login, Home} from './reducks/templates'

const Router = () => {
    return (
        // <BrowserRouter>
        //     {/* exa-domct→pathと完全一致の場合→動的変化の場合はつけない（"/:id"） */}
        //     {/* BrowserRouterを無くすと部分一致とかもできる */}
        //     {/* どのtemplatesコンポーネントを表示するかを指定 */}
        //     <Route exact path='/login' component={Login} />
        //     {/* (/)?→/があってもなくても */}
        //     <Route exact path='(/)?' component={Home} />
        // </BrowserRouter>
        <Login />
    )
}

// App.jsx-domで開く
export default Router