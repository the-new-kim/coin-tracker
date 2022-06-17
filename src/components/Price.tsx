import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";

import styled from "styled-components";
import { fetchOHLC, fetchTickers, IOhlcData, ITickersData } from "../api";

const PriceBoard = styled(motion.div)`
  width: 100%;
  /* min-height: 80px; */
  background-color: ${(props) => props.theme.boardBgColor};
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;
  /* display: flex;
  flex-direction: column; */
  display: grid;
  grid-template-areas:
    "price ohlc"
    "change change"
    "btn btn";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
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
  padding: 20px 0;
`;
const Button = styled(motion.button)`
  grid-area: btn;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  height: auto;
`;
const ButtonIcon = styled(motion.div)`
  width: 15px;

  svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.theme.textColor};
  }
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

interface IPriceProps {
  id: string;
}

function Price({ id }: IPriceProps) {
  const [isChangeOpen, setIsChangeOpen] = useState(false);
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
  const noData = !dataOhlc || !dataTickers;
  return (
    <LayoutGroup>
      <PriceBoard layout>
        {noData ? (
          "no data"
        ) : (
          <>
            <CurrentPrice
              layout
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
            <OHLC layout>
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
            <AnimatePresence>
              {isChangeOpen && (
                <Change
                  key="change"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
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
              )}
            </AnimatePresence>
            <Button
              layout
              onClick={() => {
                setIsChangeOpen((prev) => !prev);
              }}
            >
              <ButtonIcon
                initial={{ rotate: 180 }}
                animate={{ rotate: isChangeOpen ? 0 : 180 }}
                transition={{ type: "tween" }}
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="98.148px"
                  height="98.149px"
                  viewBox="0 0 98.148 98.149"
                >
                  <g>
                    <path
                      d="M97.562,64.692L50.49,17.618c-0.75-0.75-2.078-0.75-2.828,0L0.586,64.693C0.211,65.068,0,65.577,0,66.106
		c0,0.53,0.211,1.039,0.586,1.414l12.987,12.987c0.391,0.391,0.902,0.586,1.414,0.586c0.512,0,1.023-0.195,1.414-0.586
		l32.674-32.674L81.75,80.506c0.75,0.751,2.078,0.75,2.828,0l12.984-12.987C98.344,66.739,98.344,65.472,97.562,64.692z"
                    />
                  </g>
                </svg>
              </ButtonIcon>
            </Button>
          </>
        )}
      </PriceBoard>
    </LayoutGroup>
  );
}

export default Price;
