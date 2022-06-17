import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchTwitter, ITwitterData } from "../api";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Tweet = styled(motion.li)`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 80px;
  background: ${(props) => props.theme.border.background};
  border-radius: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 20px;
  display: grid;
  grid-template-areas:
    "status status"
    "date user";

  gap: 10px;
  /* * {
    z-index: 2;
  } */

  /* ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    opacity: 0;
    background: ${(props) => props.theme.border.hover.background};
    z-index: 1;
    transition: opacity ease-out 300ms;
  }

  :hover {
    ::after {
      opacity: 1;
    }
  } */
`;

const Status = styled.p`
  grid-area: status;
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
`;

const TweetDate = styled.div`
  grid-area: date;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const User = styled.div`
  grid-area: user;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const NoData = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 80px;

  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IOutletContext {
  id: string;
}

function Twitter() {
  const { id } = useOutletContext<IOutletContext>();
  const { data } = useQuery<ITwitterData[]>(
    ["twitter", id],
    () => fetchTwitter(id),
    { suspense: false }
  );

  return (
    <Wrapper>
      {!data || !data.length ? (
        <NoData>No Data.</NoData>
      ) : (
        data.slice(0, 10).map(({ date, user_name, status, status_id }) => (
          <Tweet key={status_id}>
            <Status>{status}</Status>
            <TweetDate>
              {date
                ? new Date(date + "").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "-"}
            </TweetDate>
            <User>{user_name}</User>
          </Tweet>
        ))
      )}
    </Wrapper>
  );
}

export default Twitter;
