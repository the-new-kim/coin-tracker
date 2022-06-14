import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinDetail, fetchOHLC, fetchTickers } from "../api";
import Chart from "../components/Chart";
import Header from "../components/Header";

const Board = styled(motion.div)`
  width: 100%;
  min-height: 80px;
  background-color: ${(props) => props.theme.boardBgColor};
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Price = styled.div<{ $isRising: boolean }>`
  color: ${(props) =>
    props.$isRising ? props.theme.textGreen : props.theme.textRed};
  > *:first-child {
    margin-bottom: 5px;
  }
`;
const OHLC = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
    > div:first-child {
      margin-right: 10px;
    }
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
`;

const Tab = styled(Board)<{ $isMatch?: boolean }>`
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.$isMatch ? props.theme.activeColor : props.theme.textColor};
`;

interface ICoinDetailData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: object;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface IOhlcData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const priceOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
};
const ohlcOptions = {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
};

function Coin() {
  const newsMatch = useMatch("/:coinId/news");
  const priceMatch = useMatch("/:coinId/price");

  const { coinId } = useParams();

  const { isLoading: loadingDetail, data: dataDetail } =
    useQuery<ICoinDetailData>(["detail", coinId], () =>
      fetchCoinDetail(coinId!)
    );

  const { isLoading: loadingOhlc, data: dataOhlc } = useQuery<IOhlcData[]>(
    ["ohlc", coinId],
    () => fetchOHLC(coinId!)
  );

  const { isLoading: loadingTickers, data: dataTickers } =
    useQuery<ITickersData>(["tickers", coinId], () => fetchTickers(coinId!), {
      refetchInterval: 60000,
    });

  const loading =
    loadingDetail ||
    loadingOhlc ||
    loadingTickers ||
    !dataDetail ||
    !dataOhlc ||
    !dataTickers;

  return (
    <>
      {loading ? null : (
        <>
          <Header siteTitle={dataDetail.name} />
          <Board>
            <Price
              $isRising={
                dataTickers.quotes.USD.percent_change_24h > 0 ? true : false
              }
            >
              <h2>
                {dataTickers.quotes.USD.price.toLocaleString(
                  "en-US",
                  priceOptions
                )}
              </h2>
              <div>
                {dataTickers.quotes.USD.percent_change_24h > 0 ? (
                  <>&#x25B2;</>
                ) : (
                  <>&#x25BC;</>
                )}
                {dataTickers.quotes.USD.percent_change_24h}%
              </div>
            </Price>
            <OHLC>
              <div>
                <div>open: </div>
                <div>
                  {dataOhlc[0].open.toLocaleString("en-US", ohlcOptions)}
                </div>
              </div>
              <div>
                <div>hight: </div>
                <div>
                  {dataOhlc[0].high.toLocaleString("en-US", ohlcOptions)}
                </div>
              </div>
              <div>
                <div>low: </div>
                <div>
                  {dataOhlc[0].low.toLocaleString("en-US", ohlcOptions)}
                </div>
              </div>
              <div>
                <div>close: </div>
                <div>
                  {dataOhlc[0].close.toLocaleString("en-US", ohlcOptions)}
                </div>
              </div>
            </OHLC>
          </Board>
          <Chart />
          <Tabs>
            <Link to="price">
              <Tab $isMatch={priceMatch ? true : false}>Price</Tab>
            </Link>
            <Link to="news">
              <Tab $isMatch={newsMatch ? true : false}>News</Tab>
            </Link>
          </Tabs>
          <Outlet context={dataTickers.quotes.USD} />
        </>
      )}
    </>
  );
}

export default Coin;
