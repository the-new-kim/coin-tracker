import { useRecoilValue } from "recoil";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { isDarkModeAtom } from "./atoms";
import Router from "./Router";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body { 
  font-family: "Kanit", sans-serif;
  font-weight: 100;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  
}

a {
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
  transition: color 300ms ease-out;
  * {
    transition: color 300ms ease-out;
  }
  :hover {
      color: ${(props) => props.theme.hoverColor};
     
      * {
        color: ${(props) => props.theme.hoverColor};
      }
    }
    svg {
    width: 30%;
    transition: fill ease-out 300ms;
    fill: ${(props) => props.theme.textColor};
  }
  :hover svg {
    fill: ${(props) => props.theme.hoverColor};
  }
}

h1,h2,h3,h4,h5 {
	font-weight: 500;
	/* text-transform: uppercase; */
}
h1 {font-size: 1.7em}
h2 {font-size: 1.6em}
h3 {font-size: 1.2em}
h4 {font-size: 1em}




`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

function App() {
  const isDarkMode = useRecoilValue(isDarkModeAtom);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Wrapper>
        <Router />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
