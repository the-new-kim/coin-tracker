import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;

    > * {
      width: 100%;
    }

    > a {
      margin-top: 50px;
      /* background-color: ${(props) => props.theme.boardBgColor}; */
      padding: 10px;
      border-radius: 10px;
      border: solid 1px ${(props) => props.theme.textColor};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

function NotFound() {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <hr />
        <h3>Page not found</h3>

        <Link to="/">click to home</Link>
      </div>
    </Wrapper>
  );
}

export default NotFound;
