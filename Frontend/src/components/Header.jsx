import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/argentBankLogo.png";
import { logout } from "../slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in"); // Redirige vers la page de connexion
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link to="/user">
              <span className="main-nav-item">
                <i className="fa fa-user-circle"></i>{" "}
                {user?.firstName || "User"}
              </span>
            </Link>
            <a className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Logout
            </a>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
