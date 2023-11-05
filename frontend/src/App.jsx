import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Login from "./pages/login/Login.jsx";
import About from "./pages/about/About.jsx";
import Ping from "./pages/ping/Ping.jsx";
import Upload from "./pages/api/Upload.jsx";
import Register from "./pages/login/Register.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/login/Profile.jsx";
import Layout from "./component/Layout.jsx";
import Api from "./pages/api/index.jsx";
import AboutDet from "./pages/about/AboutDet.jsx";
import CreateApi from "./pages/api/CreateApi.jsx";
import Edit from "./pages/api/Edit.jsx";
import GetApi from "./pages/api/GetApi.jsx";
import Status from "./pages/ping/Status.jsx";
import Crud from "./pages/api/Crud.jsx";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: (
                        <Layout>
                            <div className="container">
                                <h1>Home</h1>
                            </div>
                        </Layout>
                    ),
                },
                {
                    path: "/api",
                    element: (
                        <Layout>
                            <Api />
                        </Layout>
                    ),
                    children: [
                        {
                            path: "get",
                            element: <GetApi />,
                        },
                        {
                            path: "create",
                            element: <CreateApi />,
                        },
                        {
                            path: "crud",
                            element: <Crud />,
                        },
                        {
                            path: "edit/:id",
                            element: <Edit />,
                        },
                        {
                            path: "ping",
                            element: <Ping />,
                        },
                        {
                            path: "status",
                            element: 
                            <Status />
                        },
                        {
                            path: "upload",
                            element: <Upload />,
                        },
                    ],
                },

                {
                    path: "/profile",
                    element: (
                        <Layout>
                            <Profile />
                        </Layout>
                    ),
                },
                {
                    path: "/about",
                    element: (
                        <Layout>
                            <About />
                        </Layout>
                    ),
                    children: [
                        {
                            path: "",
                            element: <h1>About</h1>,
                        },
                        {
                            path: "det",
                            element: <AboutDet />,
                        },
                    ],
                },
                { path: "/signin", element: <Login /> },
                { path: "/signup", element: <Register /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
