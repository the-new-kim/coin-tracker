import { AnimateSharedLayout, motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  fetchCoinDetail,
  fetchOHLC,
  fetchTickers,
  ICoinDetailData,
  IOhlcData,
  ITickersData,
} from "../api";
import { siteTitleAtom } from "../atoms";
import Chart from "../components/Chart";
import DetailNav from "../components/DetailNav";

const PriceBoard = styled(motion.div)`
  width: 100%;
  min-height: 80px;
  background-color: ${(props) => props.theme.boardBgColor};
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;
  display: grid;
  grid-template-areas:
    "price ohlc"
    "change change";
  grid-template-columns: 2fr 1fr;
  gap: 10px;
`;

const CurrentPrice = styled(motion.div)<{ $isRising: boolean }>`
  grid-area: price;
  color: ${(props) =>
    props.$isRising ? props.theme.textGreen : props.theme.textRed};
  > *:first-child {
    margin-bottom: 5px;
  }
`;
const OHLC = styled(motion.div)`
  grid-area: ohlc;
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
const Change = styled(motion.div)`
  grid-area: change;
  display: flex;
  justify-content: space-between;
  font-size: small;
  padding-top: 20px;
`;

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

function Detail() {
  // const newsMatch = useMatch("/:id/news");
  // const priceMatch = useMatch("/:id/price");
  const setSiteTitle = useSetRecoilState(siteTitleAtom);

  const { id } = useParams();

  const { data: dataDetail } = useQuery<ICoinDetailData>(["detail", id], () =>
    fetchCoinDetail(id!)
  );

  const { data: dataOhlc } = useQuery<IOhlcData[]>(
    ["ohlc", id],
    () => fetchOHLC(id!),
    {
      refetchInterval: 60000,
    }
  );

  const { data: dataTickers } = useQuery<ITickersData>(
    ["tickers", id],
    () => fetchTickers(id!),
    {
      refetchInterval: 60000,
    }
  );

  useEffect(() => {
    if (!dataDetail) return;
    setSiteTitle(dataDetail.name);
  }, [dataDetail, setSiteTitle]);

  const noData = !dataOhlc || !dataTickers;

  return (
    <>
      <PriceBoard layout>
        {noData ? (
          "no data"
        ) : (
          <>
            <CurrentPrice
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
            </CurrentPrice>
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
            <Change
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            >
              {dataTickers.quotes.USD.percent_change_1h ? (
                <span>
                  <div>1h</div>
                  <div>{dataTickers.quotes.USD.percent_change_1h}%</div>
                </span>
              ) : null}
              {dataTickers.quotes.USD.percent_change_24h ? (
                <span>
                  <div>24h</div>
                  <div>{dataTickers.quotes.USD.percent_change_24h}%</div>
                </span>
              ) : null}
              {dataTickers.quotes.USD.percent_change_7d ? (
                <span>
                  <div>Week</div>
                  <div>{dataTickers.quotes.USD.percent_change_7d}%</div>
                </span>
              ) : null}
              {dataTickers.quotes.USD.percent_change_30d ? (
                <span>
                  <div>Month</div>
                  <div>{dataTickers.quotes.USD.percent_change_30d}%</div>
                </span>
              ) : null}
              {dataTickers.quotes.USD.percent_change_1y ? (
                <span>
                  <div>Year</div>
                  <div>{dataTickers.quotes.USD.percent_change_1y}%</div>
                </span>
              ) : null}
            </Change>
          </>
        )}
      </PriceBoard>

      <Chart />

      {id && <DetailNav id={id} />}

      <Outlet context={{ dataDetail, dataOhlc, dataTickers, id }} />
    </>
  );
}

export default Detail;
