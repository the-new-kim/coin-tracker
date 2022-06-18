import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchHistoricalTickers, HistoricalTickersRange } from "../api";
import { isDarkModeAtom } from "../atoms";
import Loader, { LoaderType } from "../components/Loader";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
`;

const RangeTabs = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const RangeTab = styled(motion.div)<{ $isActive: boolean }>`
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

const ActiveBorder = styled(motion.div)`
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

function Chart() {
  const { id } = useParams();
  const isDarkMode = useRecoilValue(isDarkModeAtom);
  const [chartRange, setChartRange] = useState(HistoricalTickersRange.SIX_M);
  const { isLoading, data } = useQuery<IHistoricalTickersData[]>(
    ["historicalTickers", id, chartRange],
    () => fetchHistoricalTickers(id!, chartRange),
    {
      suspense: false,
    }
  );

  const loading = isLoading || !data;

  return (
    <Wrapper>
      {loading ? (
        <Loader loaderType={LoaderType.CHART} />
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
              show: true,
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: { show: true },
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
          <RangeTab
            $isActive={value === chartRange}
            onClick={() => {
              setChartRange(value);
            }}
            key={value}
          >
            {value}
            <AnimatePresence>
              {value === chartRange && !loading ? (
                <ActiveBorder layoutId="chartRangeActive" />
              ) : null}
            </AnimatePresence>
          </RangeTab>
        ))}
      </RangeTabs>
    </Wrapper>
  );
}

export default Chart;
