import { Link, NavLink } from "react-router-dom";
import Cartwidget from "../CartWidget/CartWidget"
import './NavBar.css';

const NavBar = () => {
    return (
        <header className="navbar">
            <Link className="h1" to={"/"}>
                <h1> Panflex🥯 </h1>
            </Link>

            <nav>
                <ul>
                    <li>
                        <NavLink className="button" to={`/category/1`}><strong>Panaderia</strong></NavLink>
                    </li>

                    <li>
                        <NavLink className="button" to={`/category/2`}><strong>Dulces</strong></NavLink>
                    </li>


                </ul>
            </nav>

            <Cartwidget />

        </header>
    )
}

export default NavBar