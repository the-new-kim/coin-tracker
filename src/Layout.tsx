import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Loader from "./components/Loader";
import TopBtn from "./components/TopBtn";
import { LoaderType } from "./components/Loader";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px 50px;
`;

function Layout() {
  return (
    <Wrapper>
      <Header />
      <Suspense fallback={<Loader loaderType={LoaderType.FULL_SCREEN} />}>
        <Outlet />
      </Suspense>
      <TopBtn />
    </Wrapper>
  );
}

export default Layout;
