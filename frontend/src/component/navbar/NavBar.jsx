import { Navbar, Dropdown, NavItem } from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UseTheme, UseUser } from "../../store/DataContext";
import { navLinks } from "./navLinks.js";
import { IsData } from "../utils";

const NavBar = () => {
    const { toggleTheme, theme } = UseTheme();
    const { LinksMain, DropdownLink, LoginLink } = navLinks();
    const [hidden, setHidden] = useState(false);
    const { user, userCheck } = UseUser();
    const navigate = useNavigate();

    const handleThemes = () => {
        toggleTheme();
    };

    useEffect(() => {
        if (!IsData(user)) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    }, [user, hidden]);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        userCheck(null);

        setTimeout(() => {
            navigate("/signin");
            window.location.reload();
        }, 1000);
    };

    return (
        <>
            <Navbar expand="md" className={`border-bottom ${theme}`}>
                <Navbar.Brand className="mx-2">
                    <Link to="/" className={`rounded-circle`}>
                        <img
                            src=" https://avatars.githubusercontent.com/u/77183125?s=200&v=4"
                            alt="mdo"
                            width="32"
                            height="32"
                            className="rounded-circle"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-2" />
                <Navbar.Collapse className={"justify-content-end mx-2"}>
                    {LinksMain &&
                        LinksMain.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                end={link.to === "/" ? true : false}
                                className={` nav-link  btn btn-sm btn-outline-${theme} mx-2 py-1 px-2 my-1`}
                            >
                                {link.name && link.name}
                            </NavLink>
                        ))}

                    <NavItem className="text-center">
                        <button
                            className={`bg-theme-${theme} rounded-circle mx-2 item-center btn btn-sm btn-outline-${theme}`}
                            onClick={handleThemes}
                        />
                    </NavItem>

                    {!hidden ? (
                        LoginLink.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                end={link.to === "/" ? true : false}
                                className={"btn btn-outline-info mx-1 py-1 px-2 my-1"}
                            >
                                {link.name && link.name}
                            </NavLink>
                        ))
                    ) : (
                        <Dropdown className="mx-0">
                            <Dropdown.Toggle variant="" className={`rounded-circle w-100`}>
                                <img
                                    src="https://avatars.githubusercontent.com/u/77183125?s=200&v=4"
                                    alt="mdo"
                                    width="32"
                                    height="32"
                                    className="rounded-circle"
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-end text-center w-100">
                                {DropdownLink &&
                                    DropdownLink.map((link) => (
                                        <NavLink
                                            key={link.name}
                                            to={link.to}
                                            className={"dropdown-item text-decoration-none"}
                                        >
                                            {link.name}
                                        </NavLink>
                                    ))}
                                <Dropdown.Item className={"dropdown-item"} onClick={handleLogout}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default NavBar;
