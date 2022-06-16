import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Loader from "./components/Loader";
import TopBtn from "./components/TopBtn";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

function Layout() {
  return (
    <Wrapper>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <TopBtn />
    </Wrapper>
  );
}

export default Layout;
