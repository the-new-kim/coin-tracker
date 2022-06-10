import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { motion } from "framer-motion";
import useViewportScroll from "../hooks/useViewportScroll";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Loader from "../components/Loader";

const CoinList = styled(motion.ul)`
  width: 100%;
`;
const Coin = styled(motion.li)`
  width: 100%;
  min-height: 80px;
  background-color: ${(props) => props.theme.boardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const TopBtn = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: aliceblue;
  z-index: 2;
  border: 0;
  cursor: pointer;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const coinVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.1,
    },
  },
  exit: {
    scale: 0,
  },
};

const pageNumber = 20;

function Coins() {
  const { data, isLoading } = useQuery<ICoin[]>(["coins"], fetchCoins);
  const { scrollYProgress } = useViewportScroll();
  const [page, setPage] = useState(pageNumber);

  useEffect(() => {
    if (scrollYProgress !== 1) return;

    let timer: ReturnType<typeof setTimeout>;

    const increasePage = () => {
      if (typeof data !== "undefined")
        setPage((prev) => {
          const difference = data.length - prev;
          if (difference === 0) return prev;
          return difference < pageNumber
            ? prev + difference
            : prev + pageNumber;
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

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <TopBtn onClick={scrollToTop}>Top</TopBtn>
      <Loader isLoading={isLoading} />
      {isLoading ? null : (
        <>
          <Header siteTitle="Coins" />
          {!data || !Array.isArray(data) ? (
            "no data"
          ) : (
            <>
              <CoinList>
                {data.slice(0, page).map(({ name, id, symbol }) => (
                  <Link to={`/${id}`} key={id}>
                    <Coin
                      variants={coinVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Symbol
                        src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLocaleLowerCase()}`}
                      />
                      <Name>{name}</Name>
                      <Arrow>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 512"
                        >
                          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                        </svg>
                      </Arrow>
                    </Coin>
                  </Link>
                ))}
              </CoinList>
              {page === data.length ? null : (
                <Coin
                  variants={coinVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key={page}
                >
                  Loading...
                </Coin>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Coins;
