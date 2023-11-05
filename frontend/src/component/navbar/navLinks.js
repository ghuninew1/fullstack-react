export const  navLinks = () => {
    const LinksMain = [
        { to: "/", name: "Home", hidden: false, login: false },
        { to: "/about", name: "About", hidden: false, login: false },
        { to: "/api", name: "Api", hidden: false, login: false },
    ];
    const LoginLink = [
        { to: "/signin", name: "Signin", hidden: false, login: false },
        { to: "/signup", name: "Signup", hidden: false, login: false },
    ];
    const DropdownLink = [
        { to: "/profile", name: "Profile", hidden: false, login: true },
        // { to: "/logout", name: "Logout", hidden: false, login: true },
    ];
    const ApiLink = [
        { to: "/api/get", name: "Get", hidden: false, login: false },
        { to: "/api/create", name: "Create", hidden: false, login: false },
        { to: "/api/crud", name: "Crud", hidden: false, login: false },
        { to: "/api/status", name: "Status", hidden: false, login: false },
        { to: "/api/ping", name: "Ping", hidden: false, login: false },
        { to: "/api/upload", name: "Upload", hidden: false, login: false },
    ];

    return { LinksMain, LoginLink, DropdownLink, ApiLink };
}
