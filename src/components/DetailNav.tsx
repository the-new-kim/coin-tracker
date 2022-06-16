import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Tabs = styled.div`
  width: 100%;
  min-height: 80px;
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
  return (
    <Tabs>
      <Link to={`/${id}/details`}>
        <Tab>Details</Tab>
      </Link>
      <Link to={`/${id}/events`}>
        <Tab>Events</Tab>
      </Link>
      <Link to={`/${id}/twitter`}>
        <Tab>Twitter</Tab>
      </Link>
      <Link to={`/${id}/team`}>
        <Tab>Team</Tab>
      </Link>
    </Tabs>
  );
}

export default DetailNav;
