import NavCss from "./navBar.module.css";
import { Outlet, NavLink, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signInSelector } from "../../redux/signInReducer/signInReducer";
import { signInAction } from "../../redux/signInReducer/signInReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function NavBar() {
  let { signIn } = useSelector(signInSelector);
  let dispatch = useDispatch();

  let handleLogout = () => {
    dispatch(signInAction.logOut());
  };
  return (
    <>
      <div className={NavCss.navMain}>
        <div className={NavCss.NavContainer}>
          <div className={NavCss.textDiv}>
            <Link to="/">
              <p className={NavCss.textPP}>Busy Buy</p>
            </Link>
          </div>
          <div className={signIn ? NavCss.homeDiv : NavCss.homeDivlog}>
            <img src="./images/Home.png" alt="home" className={NavCss.icons} />
            <Link to="/">
              <p className={NavCss.textP}>Home</p>{" "}
            </Link>
          </div>
          {!signIn ? (
            <div className={NavCss.signinDiv}>
              <img
                src="./images/signin.png"
                alt="signin"
                className={NavCss.icons}
              />
              <NavLink to="/signIn">
                <p className={NavCss.textP}>SignIn</p>
              </NavLink>
            </div>
          ) : (
            <div className={NavCss.signupDiv}>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/my order.png"
                  alt="myorder"
                  className={NavCss.icons}
                />
                <Link to="MyOrder">
                  <p className={NavCss.textP}>My Orders</p>{" "}
                </Link>
              </div>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/cart.png"
                  alt="cart"
                  className={NavCss.icons}
                />
                <Link to="Cart">
                  <p className={NavCss.textP}>cart</p>{" "}
                </Link>
              </div>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/logout.png"
                  alt="logout"
                  className={NavCss.icons}
                />

                <p className={NavCss.textP} onClick={handleLogout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default NavBar;
