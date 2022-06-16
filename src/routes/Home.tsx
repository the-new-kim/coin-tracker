import { AnimateSharedLayout, motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins, ICoinData } from "../api";
import { HOME_TITLE, siteTitleAtom } from "../atoms";
import CoinList from "../components/CoinList";

const TestLayout = styled(motion.div)`
  position: fixed;

  background-color: darkblue;
  top: 100px;
  left: 100px;
  z-index: 100;
  padding: 50px;
`;

const Box = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: white;
`;

function Home() {
  const { data } = useQuery<ICoinData[]>(["coins"], fetchCoins);
  const setSiteTitle = useSetRecoilState(siteTitleAtom);

  useEffect(() => {
    setSiteTitle(HOME_TITLE);
  }, [setSiteTitle]);

  return (
    <>
      {data ? <CoinList data={data} /> : "no data"}
      <AnimateSharedLayout>
        <TestLayout layout>
          <Box layout />
        </TestLayout>
      </AnimateSharedLayout>
    </>
  );
}

export default Home;
