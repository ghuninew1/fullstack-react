import { createContext, useState, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(null);
export const ThemeContext = createContext("light");

export const UseUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Something went wrong!");
    }
    return context;
}
export const UseTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("Something went wrong!");
    }
    return context;
}

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }, []);

    const themeValue = {
        theme,
        toggleTheme,
    }

    const userCheck = useCallback(
        (data) => {
            setUser(data);
        },
        [setUser]
    );

    const userValue = {
        user,
        userCheck,
    }
   

    return (
        <UserContext.Provider value={userValue}>
            <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
        </UserContext.Provider>
    );
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
