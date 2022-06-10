// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    boardBgColor: string;
    hoverColor: string;
    activeColor: string;
  }
}
