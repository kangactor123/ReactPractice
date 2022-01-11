import styled from "styled-components";
import {Link} from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding:0px 20px;
    max-width:480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height:10vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;


const CoinsList = styled.ul`
`;
const Coin = styled.li`
    background-color:white;
    color:${(props)=>props.theme.textColor};
    border-radius:15px;
    margin-bottom:10px;
    a {
        display:flex;
        align-items:center;
        padding:20px;
        transition:color 0.2s ease-in;
        
    }
    &:hover {
        a {
            color:${(props)=>props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size:48px;
    color: ${(props)=>props.theme.accentColor};

`;
const Loader = styled.span`
    display:block;
    text-align:center;
`;
const Img = styled.img`
    width:35px;
    height:35px;
    margin-right:20px;
`;

interface ICoin {
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
}

//( ()=>{} )() :함수가 바로 실행됨.
/*
    useQuery(queryKey(query의 고유식별자))
    
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);
*/

interface ICoinsProps {

}

function Coins({}:ICoinsProps) {
    //react query is caching these response (data)
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    const setDarkAtom = useSetRecoilState(isDarkAtom); //setter Function 을 리턴받는다.
    let index = 0;
    return (
        <Container>
            <Helmet>
                <title>
                    코인 다나와!
                </title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDarkAtom}>Toggle Mode</button>
            </Header>
            {isLoading?<Loader>loading...</Loader>:
            <CoinsList>
                {data?.slice(index*10,index*10+10).map(coin => <Coin key={coin.id}>
                    <Link to={{
                        pathname:`/${coin.id}`,
                        state:{name:coin.name}
                    }}>
                        <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="coin"/>
                        {coin.name} &rarr;
                    </Link>
                </Coin>)}
            </CoinsList>}
        </Container>
    );
}

export default Coins;