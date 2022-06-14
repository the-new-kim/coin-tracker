import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchHistoricalTickers, HistoricalTickersRange } from "../api";
import { isDarkModeAtom } from "../atoms";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
`;
const Loader = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1.53 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RangeTabs = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Tab = styled(motion.div)<{ $isActive: boolean }>`
  position: relative;
  background-color: ${(props) => props.theme.boardBgColor};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 5px;
  cursor: pointer;
  color: ${(props) =>
    props.$isActive ? props.theme.activeColor : props.theme.textColor};
  transition: color ease-out 300ms;
  :hover {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const ActiveTab = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: inherit;
  border: 1px ${(props) => props.theme.activeColor} solid;
  z-index: 2;
`;

interface IHistoricalTickersData {
  timestamp: string;
  price: number;
  volume_24h: number;
  market_cap: number;
}

const loaderVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

function Chart() {
  const { coinId } = useParams();

  const isDarkMode = useRecoilValue(isDarkModeAtom);

  const [chartRange, setChartRange] = useState(HistoricalTickersRange.SIX_M);

  const { isLoading, data } = useQuery<IHistoricalTickersData[]>(
    ["historicalTickers", coinId, chartRange],
    () => fetchHistoricalTickers(coinId!, chartRange)
  );

  const loading = isLoading || !data;

  return (
    <>
      <Wrapper>
        {loading ? (
          <Loader
            variants={loaderVariants}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            Loading...
          </Loader>
        ) : (
          <ReactApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data.map((ticker) => ticker.price),
              },
            ]}
            options={{
              theme: {
                mode: `${isDarkMode ? "dark" : "light"}`,
              },
              chart: {
                toolbar: {
                  show: true,
                },
                background: "transparent",
              },
              grid: { show: true },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                categories: data.map((ticker) => {
                  const date = new Date(ticker.timestamp).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  );
                  return `${date} `;
                }),
              },
            }}
          />
        )}

        <RangeTabs>
          {Object.values(HistoricalTickersRange).map((value) => (
            <Tab
              $isActive={value === chartRange}
              onClick={() => {
                setChartRange(value);
              }}
              key={value}
            >
              {value}
              <AnimatePresence>
                {value === chartRange && !loading ? (
                  <ActiveTab layoutId="chartRangeActive" />
                ) : null}
              </AnimatePresence>
            </Tab>
          ))}
        </RangeTabs>
        {/* <div>{dataDetail.description}</div> */}
      </Wrapper>
    </>
  );
}

export default Chart;
