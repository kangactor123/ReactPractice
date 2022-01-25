import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;
  padding:0px 20px;
  margin:0 auto;
`;

const Header = styled.header`
  height:10vh;
  display:flex;
  justify-content:center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color:${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: 0.2s color ease-in; //ease in 전환 속도가 천천히 시작.
    padding:20px;
    display:flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size:48px;
`;

const Loader = styled.div`
  font-size: 48px;
  text-align: center;
  color:${(props) => props.theme.textColor};
`;

const Img = styled.img`
  width:35px;
  height:35px;
  margin-right:10px;
`;

interface ICoins {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}


function Coins() {
    const [coins, setCoins] = useState<ICoins[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      (async () => {
        const response = await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await response.json();
        setCoins(json.slice(0,20));
        setLoading(false);
      })();
    },[]);
    //Link를 통해서 query string 말고 object 타입의 객체를 보내줄 수 있다.
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading?
            <Loader>Loading....</Loader>
            :<CoinList>
                {coins.map((coin) => 
                <Coin key={coin.id}>
                    <Link to={{
                      pathname:`/${coin.id}`,
                      state: {
                        name:coin.name,
                      }
                    }}>
                      <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                      {coin.name} &rarr;
                    </Link>
                </Coin>)}
            </CoinList>}
        </Container>
    );
}

export default Coins;
