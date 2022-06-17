import { motion } from "framer-motion";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ICoinDetailData } from "../api";

const Wrapper = styled.div`
  width: 100%;
  > * {
    margin-bottom: 10px;
  }
`;

const Description = styled(motion.div)`
  position: relative;
  max-height: 300px;
  > div {
    width: 100%;
    height: 100%;
    max-height: inherit;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    > h3 {
      margin-top: 50px;
      margin-bottom: 10px;
    }
    > p {
      white-space: break-spaces;
      margin-bottom: 50px;
    }
  }
  ::before,
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 50px;

    left: 0;
  }

  ::before {
    top: 0;
    background: linear-gradient(
      180deg,
      ${(props) => props.theme.bgColor} 0%,
      ${(props) => props.theme.bgColorOpacityZero} 100%
    );
  }

  ::after {
    bottom: 0;
    background: linear-gradient(
      0deg,
      ${(props) => props.theme.bgColor} 0%,
      ${(props) => props.theme.bgColorOpacityZero} 100%
    );
  }
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
  // const [descriptionOpen, setDescriptionOpen] = useState(false);

  return (
    <Wrapper>
      {dataDetail.description === null ? null : (
        <Description
        // onClick={() => {
        //   setDescriptionOpen((prev) => !prev);
        // }}
        // initial={{ height: 200 }}
        // animate={{ height: descriptionOpen ? "auto" : 200 }}
        // transition={{ type: "tween", duration: 1 }}
        >
          <div>
            <h3>Description</h3>
            <p>{dataDetail.description}</p>
          </div>
        </Description>
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
            <a
              href={dataDetail.whitepaper.link}
              target="_blank"
              rel="noreferrer"
            >
              {dataDetail.whitepaper.thumbnail ? (
                <img src={dataDetail.whitepaper.thumbnail} alt="whitepaper" />
              ) : (
                "download"
              )}
            </a>
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
