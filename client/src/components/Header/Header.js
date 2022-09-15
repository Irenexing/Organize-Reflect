import "./Header.scss";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title" >Organize and Reflect</h1>
      </Link>

    </header>
  );
}

export default Header;

