import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { fetchCoins, ICoinData } from "../api";
import { HOME_TITLE, siteTitleAtom } from "../atoms";
import CoinList from "../components/CoinList";

function Home() {
  const { data } = useQuery<ICoinData[]>(["coins"], fetchCoins);
  const setSiteTitle = useSetRecoilState(siteTitleAtom);

  useEffect(() => {
    setSiteTitle(HOME_TITLE);
  }, [setSiteTitle]);

  return <>{data ? <CoinList data={data} /> : "no data"}</>;
}

export default Home;
