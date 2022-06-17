import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ICoinDetailData } from "../api";

const Category = styled.div`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.bgColor};
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${(props) => props.theme.boardBgColor};
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    border: 2px solid ${(props) => props.theme.boardBgColor};
    gap: 2px;
    > div {
      padding: 15px;
      background-color: ${(props) => props.theme.boardTitleBg};
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${(props) => props.theme.boardBgColor};
    gap: 2px;
    border: 2px solid ${(props) => props.theme.boardBgColor};
    border-top: none;
    overflow: hidden;
    :last-child {
      border-radius: 0 0 15px 15px;
    }

    > div {
      padding: 15px;
      background-color: ${(props) => props.theme.bgColor};
    }
  }
`;

interface IOutletContext {
  dataDetail: ICoinDetailData;
}

function Team() {
  const { dataDetail } = useOutletContext<IOutletContext>();

  return (
    <>
      <Category>
        <div>
          <div>Name</div>
          <div>Position</div>
        </div>
      </Category>
      <List>
        {!dataDetail.team.length ? (
          <div>
            <div>-</div>
            <div>-</div>
          </div>
        ) : (
          dataDetail.team.map(({ id, name, position }) => (
            <div key={id}>
              <div>{name}</div>
              <div>{position}</div>
            </div>
          ))
        )}
      </List>
    </>
  );
}

export default Team;
