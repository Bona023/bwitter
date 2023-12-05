import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import Loading from "./components/loading-screen";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "profile",
                element: <Profile />,
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
        background-color: #FFF2F2;
        color:#7286D3;
        font-family: 'Sunflower', sans-serif;
    }
`;

function App() {
    const [isLoading, setLoading] = useState(true);
    const init = async () => {
        setTimeout(() => setLoading(false), 3000);
    };
    useEffect(() => {
        init();
    }, []);
    return (
        <>
            <GlobalStyles />
            {isLoading ? <Loading /> : <RouterProvider router={router} />}
        </>
    );
}

export default App;
