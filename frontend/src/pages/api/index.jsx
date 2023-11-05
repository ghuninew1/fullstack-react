import { NavLink, Outlet } from "react-router-dom";
import {navLinks} from "../../component/navbar/navLinks";
// import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
// import 'chartjs-adapter-luxon';
// import {
//     Chart as ChartJS,
//     LinearScale,
//     CategoryScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Legend,
//     Tooltip,
// } from "chart.js";
// import StreamingPlugin from 'chartjs-plugin-streaming';
// import { Chart } from "react-chartjs-2";
// import { triggerTooltip } from "./triggerTooltip.js";
// import { data, options } from "./dataChart.js";

// ChartJS.register(
//     LinearScale,
//     CategoryScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Legend,
//     Tooltip,
//     StreamingPlugin
// );
const Api = () => {
    const { ApiLink } = navLinks();
    // const chartRef = useRef(null);
    // const [chartData, setChartData] = useState({
    //     datasets: [],
    // });

    // useEffect(() => {
    //     const chart = chartRef.current;

    //     if (!chart) {
    //         return;
    //     }

    //     setChartData(data);

    //     // triggerTooltip(chart);
    //     // if (chart) {
    //     //     console.log('CanvasRenderingContext2D', chart.ctx);
    //     //     console.log('HTMLCanvasElement', chart.canvas);        }
    // }, []);

    return (
        <Container>
            <ul className="nav nav-tabs my-4">
                {ApiLink &&
                    ApiLink.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            end={link.to === "/" ? true : false}
                            className={"nav-link"}
                        >
                            {link.name && link.name}
                        </NavLink>
                    ))}
            </ul>
            <div>
                <h2 className="text-center">Api</h2>
                <Outlet />
                {/* <Chart ref={chartRef} type="line" data={chartData}  /> */}
            </div>
        </Container>
    );
};

export default Api;
