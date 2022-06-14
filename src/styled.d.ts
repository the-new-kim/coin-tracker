// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    border: {
      background: string;
      hover: {
        background: string;
      };
    };
    boardBgColor: string;
    boardBgColor2: string;
    hoverColor: string;
    activeColor: string;
    textRed: string;
    textGreen: string;
  }
}
