import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
    time_open:string;
    time_close:string
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap:number; 
}

interface ChartProps {
    coinId:string;

}

function Chart({coinId,}:ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=> 
        fetchCoinHistory(coinId)
    );
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <div>{isLoading ? "Loading chart.." : 
            <>
            <ApexChart
                type="line"
                series={[
                    {   
                        name:coinId.slice(0,coinId.indexOf('-')).toUpperCase(),
                        data:data?.map(price => price.close)
                    }
                ]}
                options={{
                    theme: {
                        mode:isDark?"dark":"light"
                    },
                    chart: {
                        height:300,
                        width:500,
                        toolbar: {
                            show:false
                        },
                        background:"transparent"
                    },
                    stroke: {
                        curve:"smooth",
                        width:3
                    },
                    grid: {
                        show:false
                    },
                    yaxis: {
                        show:false
                    },
                    xaxis: {
                        labels:{
                            show:false
                        },
                        axisTicks:{
                            show:false
                        },
                        axisBorder:{
                            show:false
                        },
                        type:"datetime",
                        categories: data?.map(data => data.time_close)
                    },
                    fill: {
                        type:"gradient", 
                        gradient:{gradientToColors:["#0be881"], stops:[0,100]}
                    },
                    colors: ["#0fbcf9"],
                    tooltip: {
                        y:{
                            formatter: (value) => `$${value.toFixed(3)}`
                        }
                    }
                }}    
            />
            <ApexChart
                type="candlestick"
                height={350}
                series={[
                    {
                        data:data?.map((data)=>
                            [data.time_close, Math.floor(data.open),Math.floor(data.high),Math.floor(data.low),Math.floor(data.close)]
                        )
                    }
                ]}
                options={{
                    theme: {
                        mode:"dark"
                    },
                    chart: {
                      type: 'candlestick',
                      width:500, 
                      height: 350,
                      toolbar:{
                          show:false
                      },
                      background:"transparent"
                    },
                    title: {
                      align: 'left'
                    },
                    xaxis: {
                      type: 'datetime'
                    },
                    yaxis: {
                      tooltip: {
                        enabled: true
                      },
                      labels: {
                          formatter: (value) => value.toFixed(2)
                      }
                    }
                  }}    
            />
            
            </>}
        </div>
    );
}

export default Chart;