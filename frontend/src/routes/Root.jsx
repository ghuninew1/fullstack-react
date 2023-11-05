import { Outlet } from "react-router-dom";
import NavBar from "../component/navbar/NavBar";
import Footer from "../component/Footer";
import { Container } from "react-bootstrap";
import UseScroll from "../component/UseScroll";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Root() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <Container
            fluid
            bsPrefix="container-fluid"
            className="cover-container d-flex mx-auto flex-column min-vh-100 h-100 w-100"
        >

            <header>
                <UseScroll sec={0.8}>
                <motion.div className="progress-bar"
                style={{ scaleX }} />
                    <NavBar />
                </UseScroll>

            </header>

            <main className="mt-5">
                <Outlet />
            </main>
            <footer className="mt-auto text-white-50">
                <Footer />
            </footer>
        </Container>
    );
}
