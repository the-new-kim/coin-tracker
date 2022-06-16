import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchCoins } from "../api";
import Header from "../components-old/Header";
import { coinVariants, ICoinData, numberOfCoinsOnEachPage } from "./Coins";
import Loader from "../components-old/Loader";

import {
  CoinBoards,
  CoinBoard,
  CoinLink,
  Symbol,
  Name,
  Arrow,
  LoaderBoard,
} from "./Coins";
import { useEffect, useState } from "react";
import useViewportScroll from "../hooks/useViewportScroll";

interface ISearchCoinsData {
  currencies: ICoinData[];
}

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { isLoading, data } = useQuery<ISearchCoinsData>(
    ["search", keyword],
    () => searchCoins(keyword || "")
  );

  const { scrollYProgress } = useViewportScroll();
  const [page, setPage] = useState(numberOfCoinsOnEachPage);

  useEffect(() => {
    if (scrollYProgress !== 1) return;

    let timer: ReturnType<typeof setTimeout>;

    const increasePage = () => {
      if (typeof data !== "undefined")
        setPage((prev) => {
          const difference = data.currencies.length - prev;
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
    <>
      <Loader isLoading={isLoading} />
      {isLoading ? null : (
        <>
          <Header siteTitle={`Search results of "${keyword}"`} />
          {!data || !data.currencies.length ? (
            "no data"
          ) : (
            <>
              <CoinBoards>
                {data.currencies.slice(0, page).map(({ name, id, symbol }) => (
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 512"
                        >
                          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                        </svg>
                      </Arrow>
                    </CoinLink>
                  </CoinBoard>
                ))}
              </CoinBoards>
              {page >= data.currencies.length ? null : (
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
            </>
          )}
        </>
      )}
    </>
  );
}

export default Search;
