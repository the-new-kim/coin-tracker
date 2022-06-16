import { useLocation } from "react-router-dom";
import styled from "styled-components";

const HomeLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <HomeLoader>
          <h1>Home loading...</h1>
        </HomeLoader>
      ) : (
        <HomeLoader>
          <h1>Other page loading...</h1>
        </HomeLoader>
      )}
    </>
  );
}

export default Loader;
