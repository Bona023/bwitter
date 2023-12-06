import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bodyBg: string;
        text: string;
        btnBgD: string;
        btnBgL: string;
        pointColor: string;
        inputBg: string;
        accentColor: string;
        tweetBg: string;
        tweetText: string;
        tweetAccent: string;
    }
}
