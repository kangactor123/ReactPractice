import { useParams } from "react-router-dom";

interface RouteParam {
    coinId:string;
}

function Coin() {
    const {coinId} = useParams<RouteParam>(); //네가 관심있는 URL의 파라미터를 가져올 수 있는 Hook
    console.log(coinId);
    return (
        <h1>Coin {coinId}</h1>
    );
}

export default Coin;