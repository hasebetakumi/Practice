import { getUserId } from "../Selectors/selector"
import { useSelector } from "react-redux"



const Home = () => {
    // storeの全ての情報を取得
    const selector = useSelector(state => state)
    // その全ての情報をselector関数(getUserId)に渡すと情報を取ってきてくれる
    const uid = getUserId(selector)

    return (
        <div>
            <h2>
                ホーム
            </h2>
            <p>
                {uid}
            </p>

        </div>
        
    )
}
export default Home