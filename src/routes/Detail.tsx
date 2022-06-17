import { useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { fetchCoinDetail, ICoinDetailData } from "../api";
import { siteTitleAtom } from "../atoms";
import Chart from "../components/Chart";
import DetailNav from "../components/DetailNav";
import Price from "../components/Price";

function Detail() {
  const setSiteTitle = useSetRecoilState(siteTitleAtom);

  const { id } = useParams();

  const { data: dataDetail } = useQuery<ICoinDetailData>(["detail", id], () =>
    fetchCoinDetail(id!)
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!dataDetail) return;
    setSiteTitle(dataDetail.name);
  }, [dataDetail, setSiteTitle]);

  useEffect(() => {
    if (!dataDetail) return;
    dataDetail.error && navigate("/");
  }, [dataDetail, navigate]);

  return (
    <>
      {id && dataDetail && !dataDetail.error ? (
        <>
          <Price id={id} />
          <Chart />
          <DetailNav id={id} />
          <Outlet context={{ dataDetail, id }} />
        </>
      ) : (
        <div>Error</div>
      )}
    </>
  );
}

export default Detail;
