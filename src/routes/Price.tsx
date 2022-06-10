import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Board = styled(motion.div)`
  width: 100%;
  min-height: 80px;
  background-color: ${(props) => props.theme.boardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;

  ul {
    width: 100%;
  }
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

interface IPriceData {
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
}

function Price() {
  const USD = useOutletContext<IPriceData>();
  console.log(USD);
  return (
    <Board>
      <ul>
        {Object.entries(USD).map((item) => (
          <li key={item[0]}>
            <span>
              {item[0].charAt(0).toUpperCase() +
                item[0].replaceAll("_", " ").slice(1)}
            </span>
            <span>{item[1]}</span>
          </li>
        ))}
      </ul>
    </Board>
  );
}

export default Price;
