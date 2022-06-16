import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ICoinData, searchCoins } from "../api";
import { siteTitleAtom } from "../atoms";
import CoinList from "../components/CoinList";

interface ISearchCoinsData {
  currencies: ICoinData[];
}

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const setSiteTitle = useSetRecoilState(siteTitleAtom);

  const { data } = useQuery<ISearchCoinsData>(["search", keyword], () =>
    searchCoins(keyword || "")
  );

  useEffect(() => {
    setSiteTitle(`Search result of "${keyword}"`);
  }, []);

  return <>{data ? <CoinList data={data.currencies} /> : "no data"}</>;
}

export default Search;
