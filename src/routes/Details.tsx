import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ICoinDetailData } from "../api";

const Wrapper = styled.div`
  width: 100%;
  > * {
    margin-bottom: 10px;
  }
`;

const Description = styled.div`
  padding: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;

  border-radius: 15px;
  overflow: hidden;
  border: 2px solid ${(props) => props.theme.boardBgColor};
  > * {
    padding: 15px;

    :first-child {
      background-color: ${(props) => props.theme.boardBgColor};
    }
  }
`;

interface IOutletContext {
  dataDetail: ICoinDetailData;
}

function Details() {
  const { dataDetail } = useOutletContext<IOutletContext>();

  return (
    <Wrapper>
      {dataDetail.description === null ? null : (
        <Description>{dataDetail.description}</Description>
      )}
      <Row>
        <div>Started</div>
        <div>
          {dataDetail.started_at === null
            ? "-"
            : new Date(dataDetail.started_at + "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
        </div>
      </Row>
      <Row>
        <div>Whitepaper</div>
        <div>
          {dataDetail.whitepaper.link === null ? (
            "-"
          ) : (
            <Link to={{ pathname: dataDetail.whitepaper.link }} target="_blank">
              {dataDetail.whitepaper.thumbnail ? (
                <img src={dataDetail.whitepaper.thumbnail} />
              ) : (
                "download"
              )}
            </Link>
          )}
        </div>
      </Row>
      <Row>
        <div>Development status</div>
        <div>
          {dataDetail.development_status === null
            ? "-"
            : dataDetail.development_status}
        </div>
      </Row>
      <Row>
        <div>Open Source</div>
        <div>
          {dataDetail.open_source === null
            ? "-"
            : dataDetail.open_source
            ? "Yes"
            : "No"}
        </div>
      </Row>
      <Row>
        <div>Development status</div>
        <div>
          {dataDetail.hash_algorithm === null ? "-" : dataDetail.hash_algorithm}
        </div>
      </Row>
      <Row>
        <div>Hardware wallet</div>
        <div>
          {dataDetail.hardware_wallet === null
            ? "-"
            : dataDetail.hardware_wallet
            ? "Yes"
            : "No"}
        </div>
      </Row>
    </Wrapper>
  );
}

export default Details;
