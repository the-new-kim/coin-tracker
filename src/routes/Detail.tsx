import {
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
  motion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  fetchCoinDetail,
  fetchOHLC,
  fetchTickers,
  ICoinDetailData,
  IOhlcData,
  ITickersData,
} from "../api";
import { siteTitleAtom } from "../atoms";
import Chart from "../components/Chart";
import DetailNav from "../components/DetailNav";
import Price from "../components/Price";

function Detail() {
  // const newsMatch = useMatch("/:id/news");
  // const priceMatch = useMatch("/:id/price");
  const setSiteTitle = useSetRecoilState(siteTitleAtom);

  const { id } = useParams();

  const { data: dataDetail } = useQuery<ICoinDetailData>(["detail", id], () =>
    fetchCoinDetail(id!)
  );

  useEffect(() => {
    if (!dataDetail) return;
    setSiteTitle(dataDetail.name);
  }, [dataDetail, setSiteTitle]);

  return (
    <>
      {id && (
        <>
          <Price id={id} />
          <Chart />
          <DetailNav id={id} />
          <Outlet context={{ dataDetail, id }} />
        </>
      )}
    </>
  );
}

export default Detail;
