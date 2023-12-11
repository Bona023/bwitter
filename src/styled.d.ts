import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bodyBg: string;
        text: string;
        btnBgNormal: string;
        btnBgActive: string;
        pointColor: string;
        inputBg: string;
        accentColor: string;
        tweetBg: string;
        tweetIcon: string;
        tweetAccent: string;
        myTweetsTab: string;
        myLikesTab: string;
        myReplyTab: string;
    }
}
