import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.svg";

function Header() {
	return (
		<header className="header">
			<img className="header_logo" src={logo} alt="jobored img" />
			<nav className="header_nav">
				<NavLink to="/">Поиск Вакансий</NavLink>
				<NavLink to="/favorite">Избранное</NavLink>
			</nav>
		</header>
	);
}

export default Header;
