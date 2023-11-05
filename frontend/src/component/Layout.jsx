import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UseUser } from "../store/DataContext";
import { IsData } from "./utils";
import PropTypes from "prop-types";
import GetData from "./GetData";

const Layout = ({ children }) => {
    const { userCheck } = UseUser();
    const token = localStorage.getItem("token");
    const users = localStorage.getItem("user");
    const [expires, setExpires] = useState(null);
    const { curenUser } = GetData();

    useEffect(() => {
        if (!IsData(users) || !IsData(token)) {
            <Navigate to="/signin" replace={true} />;
        } else {
            const cerRentUse = curenUser({ token });
            cerRentUse &&
                cerRentUse.then((res) => {
                    if (
                        res.data?.token === token &&
                        new Date(res.data.expires) > new Date()
                    ) {
                        userCheck(res.data);
                        setExpires(new Date(res.data.expires));
                    } else {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setExpires(null);
                        userCheck(null);
                        <Navigate to="/signin" replace={true} />;
                    }
                });
        }
    }, [users, token, curenUser, userCheck]);

    console.log("expires", expires);

    if (IsData(users) && IsData(token)) {
        if (expires && expires > new Date()) {
            return children;
        }
    } else {
        return <Navigate to="/signin" replace={true} />;
    }
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
