import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"

interface IChart {
  coinId:string;
}

interface IHistorical {
  time_open:string;
  time_close:string;
  open:number;
  high:number;
  low:number;
  close:number;
  volume:number;
  market_cap:number;
}

function Chart({coinId}:IChart) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );  
  return (
      <div>{isLoading? "Loading chart..." : 
        <ApexChart 
          type="line"
          series={[
            {
              name: "price",
              data: data?.map(price => price.close),
            }
          ]}
          options={{
            theme: {
              mode:"dark",
            },
            chart: {
              height:300,
              width:500,
              toolbar: {
                show:false,
              },
              background: "transparent"
            },
            stroke: {
              curve:"smooth",
              width: 3,
            },
            grid:{
              show:false
            },
            xaxis:{
              labels:{
                show:false,
              },
              axisTicks:{
                show:false,
              },
              axisBorder:{
                show:false,
              }
            },
            yaxis:{
              show:false,
            }
      }}/>}</div>
  );
}

export default Chart;
