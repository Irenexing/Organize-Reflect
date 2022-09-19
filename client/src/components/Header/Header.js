import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__title">
        Organize and Reflect
      </Link>
      <div>
      <Link to="/" className="header__navbar">Calendar</Link>
      <Link to="/journals" className="header__navbar">Journal</Link>
      </div>
    </header>
  );
}

export default Header;

