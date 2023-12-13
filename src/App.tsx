import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import Loading from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import { useRecoilValue } from "recoil";
import { lightTheme, darkTheme } from "./theme";
import { darkMode } from "./atom";
import TweetPage from "./routes/tweet-page";
import ErrorPage from "./components/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: ":docId",
                element: <TweetPage />,
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/create-account",
        element: <CreateAccount />,
    },
]);

const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
    }
    body {
        background-color: ${(props) => props.theme.bodyBg};
        color:${(props) => props.theme.text};
        font-family: 'Sunflower', sans-serif;
    }
    ::-webkit-scrollbar {
        display:none;
    }
`;
const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
`;

function App() {
    const [isLoading, setLoading] = useState(true);
    const init = async () => {
        await auth.authStateReady();
        setLoading(false);
    };
    useEffect(() => {
        init();
    }, []);
    const isDark = useRecoilValue(darkMode);
    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <Wrapper>
                <GlobalStyles />
                {isLoading ? <Loading /> : <RouterProvider router={router} />}
            </Wrapper>
        </ThemeProvider>
    );
}

export default App;
