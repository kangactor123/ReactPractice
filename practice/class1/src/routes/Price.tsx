import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Wrapper = styled.div`
    margin:10px 0;
    height:40px;
    display:flex;
    flex-direction:column;
    color:${(props)=>props.theme.bgColor};
`;
const Content = styled.div`
    border-radius:15px;
    padding:5px 0;
    display:flex;
    height:100%;
    justify-content:center;
    align-items:center;
    background-color: ${props => props.theme.textColor};
`;

const Text = styled.span<{tickerColor?:string}>`
    font-size:25px;
    font-weight:500;
    margin-left:10px;
    color:${props => props.tickerColor};
`;

interface PriceData {
    id:string;
    symbol:string;
    name:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{
        USD:{
            ath_date: string;
            ath_price:number;
            market_cap_change_24h:number;
            percent_change_1h: number;
            percent_change_1y:number;
            percent_change_6h:number;
            percent_change_7d: number;
            percent_change_12h:number;
            percent_change_15m: number;
            percent_change_24h:number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price:number;
            volume_24h:number;
            volume_24h_change_24h: number;
        }
    };
}
interface ICoin {
    coinId:string
}

function Price({coinId}:ICoin) {
    const {isLoading, data:priceData} = useQuery<PriceData>(["pInfo",coinId],() => fetchCoinTickers(coinId),{
        refetchInterval:5000
    });
    console.log(priceData);
    return (
        <>
        <Wrapper>
            <Content>
                <span>price:</span>
                <Text> ${priceData?.quotes.USD.price.toFixed(3)}</Text>
            </Content>
        </Wrapper>
        <Wrapper>
            <Content>
                <span>Max Change rate in last 24h:</span>
                <Text tickerColor="red"> {priceData?.quotes.USD.market_cap_change_24h}%</Text>
            </Content>
        </Wrapper>
        <Wrapper>
            <Content>
                <span>Change rate (last 30 Minutes):</span>
                <Text tickerColor="red"> {priceData?.quotes.USD.percent_change_30m}%</Text>
            </Content>
        </Wrapper>
        <Wrapper>
            <Content>
                <span>Change rate (last 1 hours):</span>
                <Text tickerColor="red"> {priceData?.quotes.USD.percent_change_1h}%</Text>
            </Content>
        </Wrapper>
        <Wrapper>
            <Content>
                <span>Change rate (last 12 hours):</span>
                <Text tickerColor="red"> {priceData?.quotes.USD.percent_change_12h}%</Text>
            </Content>
        </Wrapper>
        <Wrapper>
            <Content>
                <span>Change rate (last 24 hours):</span>
                <Text tickerColor="red"> {priceData?.quotes.USD.percent_change_24h}%</Text>
            </Content>
        </Wrapper>
        </>
    );
}

export default Price;