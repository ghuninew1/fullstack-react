import { Outlet } from "react-router-dom";
import NavBar from "../component/navbar/NavBar";
import Footer from "../component/Footer";
import UseScroll from "../component/UseScroll";

export default function Root() {
    return (
        <div className="cover-container d-flex mx-auto flex-column min-vh-100 h-100 w-100">
            <header>
                <UseScroll sec={0.8}>
                    <NavBar />
                </UseScroll>
            </header>

            <main className="mt-5">
                <Outlet />
            </main>
            <footer className="mt-auto text-white-50">
                <Footer />
            </footer>
        </div>
    );
}
