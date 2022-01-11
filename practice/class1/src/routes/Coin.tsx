import { Switch, Route, useLocation, useParams, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import {Helmet} from "react-helmet";

/*
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
                ).json();
            setInfo(infoData);
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
                ).json();
            setPrice(priceData);
            setLoading(false);

        })();
    }, [coinId]);
    
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [price, setPrice] = useState<PriceData>();
*/

const Title = styled.h1`
    margin-top: 20px;
    font-size:48px;
    color: ${(props)=>props.theme.accentColor};
`;
const Loader = styled.span`
    display:block;
    text-align:center;
`;

const Container = styled.div`
    padding:0px 20px;
    max-width:480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height:10vh;
    display:flex;
    justify-content:space-between;
    align-items:center;
`;

const InfoDiv = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content: space-between;
    border-radius:10px;
    background-color:rgba(0, 0, 0, 0.5);
`;
const OverviewItem = styled.div`
    display:flex;
    flex-direction:column;
    align-itmes:center;
    
    span:first-child {
        font-size:10px;
        font-weight:400;
        text-transform: uppercase;
        margin-bottom:5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
`;
const Tabs = styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;
const Tab = styled.span<{isActive:boolean}>`
    text-align:center;
    text-transform: uppercase;
    font-size:12px;
    font-weight:400;
    background-color: rgba(0,0,0,0.5);
    padding:7px 0px;
    border-radius:10px;
    color: ${(props)=> 
        props.isActive ? props.theme.accentColor : props.theme.textColor
    };
    a {
        display block;
    }
`;
const HomeButton = styled.a`
    width:fit-content;
    height:30px;
    border-radius:15px;
    border:0;
    background-color:${props=>props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    font-size:15px;
    font-weight:400;
    &:hover {
        cursor:pointer;
        color:${props=>props.theme.accentColor};
    }
`


interface RouteParams {
    coinId:string;
}
interface RouteState {
    name:string;
}
interface InfoData {
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
    description:string;
    message:string;
    open_source:boolean;
    started_at:string;
    development_status:string;
    hardware_wallet:boolean;
    proof_type:string;
    org_structure:string;
    hash_algorithm:string;
    first_data_at:string;
    last_data_at:string;
}
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
interface ICoinProps {
}

function Coin({}:ICoinProps) {
    //useParam() : hook 을 이용해 parameter 을 꺼내왔다.
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart"); //useRouteMatch() -> 주어진 url에 있다면 객체 반환하는 리액트 훅
    //매개변수가 있는 fetching 함수여서 콜백으로 만들어줌
    //isLoading:infoLoading -> 이름을 바꿔줌
    const {isLoading:infoLoading, data:infoData} = useQuery<InfoData>(["info",coinId], ()=>fetchCoinInfo(coinId));
    const {isLoading:tickersLoading, data:tickesData} = useQuery<PriceData>(
        ["tickers",coinId],
        ()=>fetchCoinTickers(coinId),
        {
            refetchInterval: 5000
        }
        
        );

    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ?state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Link to="/">
                    <HomeButton>Home</HomeButton>
                </Link>
                <Title>{state?.name ?state.name : loading ? "Loading..." : infoData?.name}</Title>
                <Link to="/">
                    <HomeButton>Refresh</HomeButton>
                </Link>
            </Header>
            {loading?<Loader>loading...</Loader> : 
            <>
                <InfoDiv>
                    <OverviewItem>
                        <span>Rank:</span>
                        <span>{infoData?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>{infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Price:</span>
                        <span>${tickesData?.quotes.USD.price}</span>
                    </OverviewItem>
                </InfoDiv>
                <Description>{infoData?.description}</Description>
                <InfoDiv>
                    <OverviewItem>
                        <span>Total supply:</span>
                        <span>{tickesData?.max_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{tickesData?.max_supply}</span>
                    </OverviewItem>
                </InfoDiv>

                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                        <Link to={`/${coinId}/chart`}>Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                        <Link to={`/${coinId}/price`}>Price</Link>
                    </Tab>
                </Tabs>
                
                <Switch>
                    <Route path={`/:coidId/price`}>
                        <Price coinId={coinId}/>
                    </Route>
                    <Route path={`/:coinId/chart`}>
                        <Chart coinId={coinId}/>
                    </Route>
                </Switch>
            </>
            }
        </Container>
    );
}

export default Coin;