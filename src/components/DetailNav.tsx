import { motion } from "framer-motion";

import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  /* position: sticky;
  top: 0px; */
  width: 100%;
  height: 80px;
  /* background-color: ${(props) => props.theme.bgColor}; */
  padding: 10px 0;
  /* z-index: 10; */
`;

const Tabs = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.boardBgColor};
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 10px;
`;

const Tab = styled(motion.div)<{ $isMatch?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.$isMatch ? props.theme.activeColor : props.theme.textColor};
`;

interface IDetailNavProps {
  id: string;
}

function DetailNav({ id }: IDetailNavProps) {
  const detailsMatch = useMatch("/:id/");
  const eventsMatch = useMatch("/:id/events");
  const twitterMatch = useMatch("/:id/twitter");
  const teamMatch = useMatch("/:id/team");

  return (
    <Wrapper>
      <Tabs>
        <Link to={`/${id}/`}>
          <Tab $isMatch={!!detailsMatch}>Details</Tab>
        </Link>
        <Link to={`/${id}/events`}>
          <Tab $isMatch={!!eventsMatch}>Events</Tab>
        </Link>
        <Link to={`/${id}/twitter`}>
          <Tab $isMatch={!!twitterMatch}>Twitter</Tab>
        </Link>
        <Link to={`/${id}/team`}>
          <Tab $isMatch={!!teamMatch}>Team</Tab>
        </Link>
      </Tabs>
    </Wrapper>
  );
}

export default DetailNav;
