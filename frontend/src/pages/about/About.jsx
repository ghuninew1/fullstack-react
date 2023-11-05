import { NavLink, Outlet } from 'react-router-dom'


const About = () => {
  return (
    <>
    <ul className="nav nav-tabs my-4">
        <li className="nav-item">
            <NavLink className="nav-link " to={"/about"} end>
            About
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link " to={"/about/det"}>
            About Det
            </NavLink>
        </li>
    </ul>
    <div>
        <h2 className="text-center">About</h2>
        <Outlet />
    </div>
</>
  )
}

export default About