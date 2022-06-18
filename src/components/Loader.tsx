import styled from "styled-components";

const FullScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Detail = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Chart = styled.div`
  width: 100%;
  aspect-ratio: 1.53 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export enum LoaderType {
  FULL_SCREEN,
  CHART,
  SCROLL,
  DETAIL,
}

interface ILoaderProps {
  loaderType: LoaderType;
}

function Loader({ loaderType }: ILoaderProps) {
  return (
    <>
      {loaderType === LoaderType.FULL_SCREEN && (
        <FullScreen>
          <h1>Loading...</h1>
        </FullScreen>
      )}
      {loaderType === LoaderType.DETAIL && (
        <Detail>
          <p>Loading...</p>
        </Detail>
      )}
      {loaderType === LoaderType.CHART && (
        <Chart>
          <p>Loading...</p>
        </Chart>
      )}
    </>
  );
}

export default Loader;
