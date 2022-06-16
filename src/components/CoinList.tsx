import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import useViewportScroll from "../hooks/useViewportScroll";

const CoinBoards = styled(motion.ul)`
  width: 100%;
`;
const CoinBoard = styled(motion.li)`
  position: relative;
  width: 100%;
  min-height: 80px;
  background: ${(props) => props.theme.border.background};
  border-radius: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  * {
    z-index: 2;
  }

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    opacity: 0;
    background: ${(props) => props.theme.border.hover.background};
    z-index: 1;
    transition: opacity ease-out 300ms;
  }

  :hover {
    ::after {
      opacity: 1;
    }
  }
`;
const CoinLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const Symbol = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;
const Name = styled.div`
  text-align: left;
  flex-grow: 2;
`;
const Arrow = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const LoaderBoard = styled(motion.div)`
  position: relative;
  width: 100%;
  min-height: 80px;
  background: ${(props) => props.theme.border.background};
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const coinVariants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.1,
    },
  },
};

interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinListProps {
  data: ICoinData[];
}

export const numberOfCoinsOnEachPage = 20;

function CoinList({ data }: ICoinListProps) {
  const { scrollYProgress } = useViewportScroll();
  const [page, setPage] = useState(numberOfCoinsOnEachPage);

  useEffect(() => {
    if (scrollYProgress !== 1) return;

    let timer: ReturnType<typeof setTimeout>;

    const increasePage = () => {
      if (typeof data !== "undefined")
        setPage((prev) => {
          const difference = data.length - prev;
          if (difference === 0) return prev;
          return difference < numberOfCoinsOnEachPage
            ? prev + difference
            : prev + numberOfCoinsOnEachPage;
        });
    };

    const loadPage = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        increasePage();
      }, 500);
    };

    loadPage();
  }, [scrollYProgress, data]);

  return (
    <CoinBoards>
      {data?.slice(0, page).map(({ name, id, symbol }) => (
        <CoinBoard
          variants={coinVariants}
          initial="initial"
          animate="animate"
          key={id}
        >
          <CoinLink to={`/${id}`}>
            <Symbol
              src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLocaleLowerCase()}`}
            />
            <Name>{name}</Name>
            <Arrow>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
              </svg>
            </Arrow>
          </CoinLink>
        </CoinBoard>
      ))}
      {page >= data.length ? null : (
        <LoaderBoard
          variants={coinVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={page}
        >
          Loading...
        </LoaderBoard>
      )}
    </CoinBoards>
  );
}

export default CoinList;
