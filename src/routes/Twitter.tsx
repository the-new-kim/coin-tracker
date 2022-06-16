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
  padding: 10px;
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
      {!data || !data.length
        ? "no data"
        : data.map(({ date, user_name, status, status_id }) => (
            <Tweet key={status_id}>{status}</Tweet>
          ))}
    </Wrapper>
  );
}

export default Twitter;
