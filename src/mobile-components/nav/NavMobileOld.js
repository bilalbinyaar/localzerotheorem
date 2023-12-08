import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsFillMoonFill, BsFillSunFill, BsGraphUp } from "react-icons/bs";
import logoBlack from "../../assets/logo-black.svg";
import logoWhite from "../../assets/logo-white.svg";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useStateContext } from "../../ContextProvider";
import Swal from "sweetalert2";
import {
  AiFillHome,
  AiOutlineApi,
  AiOutlineUserAdd,
  AiOutlineFileDone,
  AiFillGoogleCircle,
  AiOutlineClose,
  AiOutlineLogout,
  AiFillWallet,
  AiOutlineAppstore,
} from "react-icons/ai";

import { MdOutlineSource } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { set_day_mode, set_night_mode } from "../../store";

import { BsFillLayersFill, BsFillInfoCircleFill } from "react-icons/bs";
import { BiColumns } from "react-icons/bi";
import { FaQuestionCircle, FaRegEdit } from "react-icons/fa";
import "../../components/navbar/Navbar.css";
import { AiOutlineContacts } from "react-icons/ai";
import { auth, provider } from "../../firebase_config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function NavMobileOld(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();

  // Login State
  const {
    authCheckLogin,
    setAuthCheckLogin,
    authCheck,
    userEmail,
    setAuthCheck,
    theme,
    setTheme,
  } = useStateContext();
  // Login State

  // mobile nav state
  const [toggle, setToggle] = useState(false);
  const hamClick = () => setToggle(!toggle);

  function oneClick() {
    hamClick();
    handleClick();
  }
  // mobile nav state end

  // Drop Down
  const [drop, setDrop] = useState(false);
  const dropDown = () => setDrop(!drop);
  // Drop Down End

  // Dark Light Mode
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
      handleDayModeTheme();
      handleiamClick();
    } else {
      setTheme("dark-theme");
      handleNightModeTheme();
      handleiamClick();
    }
  };
  const handleNightModeTheme = () => {
    dispatch(set_night_mode());
  };
  const handleDayModeTheme = () => {
    dispatch(set_day_mode());
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [iamClick, setiamClick] = useState(false);
  const handleiamClick = () => setiamClick(!iamClick);
  // Dark Light Mode

  function toCloseNav() {
    setToggle(false);
    setClick(false);
  }

  const [isChecked, setIsChecked] = useState(false);
  function handleCheckboxClick() {
    setIsChecked(!isChecked);
  }

  // FOR MOBILE POPUP
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        // const user = result.user.email;
        // console.log(user);
        // alert("Successfully login with email " + user);
        Swal.fire({
          title: "Login successful",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-right",
          showConfirmButton: false,
        });
        setAuthCheckLogin(true);

        // setShowPopup(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // console.log("Error occured");
        Swal.fire({
          title: "Login not successful",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-right",
          showConfirmButton: false,
        });

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  // FOR LOGIN AND SIGNUP POPUP FILTERS
  const [selectedHeadingIndex, setSelectedHeadingIndex] = useState(0);
  const handleClickForPopups = (index) => {
    setSelectedHeadingIndex(index);
  };

  const contents = [
    // LOGIN POPUP CONTENT
    <div className="popup-inner">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          onChange={(e) =>
            setDetails({
              ...details,
              email: e.target.value,
            })
          }
          value={details.email}
        />
      </div>
      <div className="form-group no-margin-bottom">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          onChange={(e) =>
            setDetails({
              ...details,
              password: e.target.value,
            })
          }
          value={details.password}
        />
      </div>
      <div className="forget-pwd">
        <p>Forget password?</p>
      </div>
      <input
        className="login-form-btn"
        type="auth"
        value="Log In"
        onClick={() => {
          // console.log("Submit button is clicked");
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          if (!email || !password) {
            // alert("Kindly enter input details for signup");
            Swal.fire({
              title: "Kindly enter input details",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
              showConfirmButton: false,
            });
          } else {
            // console.log(email, password);
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                Swal.fire({
                  title: "Login successful",
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: "top-right",
                  showConfirmButton: false,
                });
                handleClosePopup();
                setAuthCheckLogin(true);
                // alert("User is successfully login :)");
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // alert("Email or password is incorrect");
                Swal.fire({
                  title: "Login not successful",
                  icon: "error",
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: "top-right",
                  showConfirmButton: false,
                });
              });
          }
        }}
      />
      <div className="or-div">
        {/* <span className="hr-div">
            <hr />
          </span> */}
        <span>
          <p>OR</p>
        </span>
        {/* <span className="hr-div">
            <hr />
          </span> */}
      </div>

      <div className="google-login-div">
        <button
          className="google-login-btn"
          onClick={() => {
            signInWithRedirect(auth, provider);
          }}
        >
          <AiFillGoogleCircle className="google-login-icon" />
          Continue with Google
        </button>
      </div>

      <div className="register-text">
        {/* <p>
            <Link to="/signup">New to Zero Theorem? Join now!</Link>
          </p> */}
        <p>
          Don’t have an account?{" "}
          <strong
            className={selectedHeadingIndex === 1 ? "active" : "color-yellow"}
            onClick={() => handleClickForPopups(1)}
          >
            Sign Up
          </strong>
        </p>
      </div>
    </div>,

    // SIGN UP POPUP CONTENT
    <div className="popup-inner">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          onChange={(e) =>
            setDetails({
              ...details,
              email: e.target.value,
            })
          }
          value={details.email}
        />
      </div>
      <div className="form-group no-margin-bottom">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          onChange={(e) =>
            setDetails({
              ...details,
              password: e.target.value,
            })
          }
          value={details.password}
        />
      </div>
      <div className="checkbox-div">
        <input
          type="checkbox"
          id="tandc"
          name="tandc"
          value=""
          onClick={handleCheckboxClick}
        />
        <label for="tandc"> I agree the Term and Conditions</label>
      </div>
      <input
        className="login-form-btn"
        type="auth"
        value="Sign Up"
        onClick={() => {
          // console.log("Submit button is clicked");
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          if (!email || !password) {
            // console.log();
            // alert("Kindly enter input details for signup");
            Swal.fire({
              title: "Kindly enter input details",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
              showConfirmButton: false,
            });
          } else if (isChecked == false) {
            Swal.fire({
              title: "Kindly agree to our term and conditions",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
              showConfirmButton: false,
            });
          } else {
            // console.log(email, password);
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                Swal.fire({
                  title: "User account is created successfully",
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: "top-right",
                  showConfirmButton: false,
                });
                handleClosePopup();
                setAuthCheckLogin(true);
                // setAuthCheck(true);
                // alert("User account is created successfully");
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                  title: "Unable to create account with your credentials",
                  icon: "error",
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: "top-right",
                  showConfirmButton: false,
                });
                // alert("Unable to create account with your credentials");
              });
          }
        }}
      />
      <div className="or-div">
        <span>
          <p>OR</p>
        </span>
      </div>

      <div className="google-login-div">
        <button
          className="google-login-btn"
          onClick={() => {
            signInWithRedirect(auth, provider);
          }}
        >
          <AiFillGoogleCircle className="google-login-icon" />
          Continue with Google
        </button>
      </div>

      <div className="register-text">
        <p>
          Already have an account?{" "}
          <strong
            className={selectedHeadingIndex === 0 ? "active" : "color-yellow"}
            onClick={() => handleClickForPopups(0)}
          >
            Log In
          </strong>
        </p>
      </div>
    </div>,
  ];

  function toCloseNavandShowPopup() {
    toCloseNav();
    handleShowPopup();
  }

  return (
    <div className="header">
      <div className="container">
        <div className="hamburger" onClick={oneClick}>
          {click ? (
            <FaTimes className="ham-icon" size={16} />
          ) : (
            <FaBars className="ham-icon" size={16} />
          )}
        </div>

        <div className="nav-logo-div">
          {theme === "dark-theme" ? (
            <Link to="/">
              <img className="nav-logo-img" src={logoWhite} alt="logo" />
            </Link>
          ) : (
            <Link to="/">
              <img className="nav-logo-img" src={logoBlack} alt="logo" />
            </Link>
          )}
        </div>

        <ul id="mobile-nav" className={click ? "nav-menu active" : "nav-menu"}>
          <CustomLink to="/">Forecasts</CustomLink>
          <CustomLink
            to="/compare-models"
            onClick={toCloseNav}
            state={{ model_name: `${props.model_name}` }}
          >
            Compare
          </CustomLink>
          <CustomLink to="/derivations">Derivations</CustomLink>
          <CustomLink to="/about">About</CustomLink>
          <CustomLink to="/faqs" onClick={toCloseNav}>
            FAQs
          </CustomLink>
        </ul>

        {toggle && (
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {authCheck === true ? (
              <div>
                <p className="welcome-user welcome-user-mobile">
                  Welcome, {userEmail}
                </p>
              </div>
            ) : (
              <div className="display-none"></div>
            )}

            <CustomLink to="/performance" onClick={toCloseNav}>
              <AiFillHome className="nav-icons" />
              Performance
            </CustomLink>

            <CustomLink to="" onClick={toCloseNav}>
              <AiFillWallet className="nav-icons" />
              Forecasts
            </CustomLink>
            {/* Sub Menu */}
            <CustomLink className="mobile-submenu" to="/" onClick={toCloseNav}>
              <AiOutlineAppstore className="nav-icons nav-icons-mobile" />
              All Models
            </CustomLink>
            <CustomLink
              className="mobile-submenu"
              to="/backtest"
              onClick={toCloseNav}
            >
              <BsGraphUp className="nav-icons nav-icons-mobile" />
              Backtest
            </CustomLink>
            <CustomLink
              className="mobile-submenu"
              to="/compare-models"
              onClick={toCloseNav}
            >
              <BiColumns className="nav-icons nav-icons-mobile" />
              Compare
            </CustomLink>

            <CustomLink to="" onClick={toCloseNav}>
              <MdOutlineSource className="nav-icons" />
              Resources
            </CustomLink>
            {/* Sub Menu */}
            <CustomLink
              className="mobile-submenu"
              to="/derivations"
              onClick={toCloseNav}
            >
              <BsFillLayersFill className="nav-icons nav-icons-mobile" />
              Derivations
            </CustomLink>
            <CustomLink
              className="mobile-submenu"
              to="/faqs"
              onClick={toCloseNav}
            >
              <FaQuestionCircle className="nav-icons nav-icons-mobile" />
              FAQs
            </CustomLink>

            {/* <CustomLink to="/" onClick={toCloseNav}>
              <AiFillHome className="nav-icons" />
              Forecasts
            </CustomLink> 
            <CustomLink to="/backtest" onClick={toCloseNav}>
              <BsGraphUp className="nav-icons" />
              Backtest
            </CustomLink>
            <CustomLink to="/compare" onClick={toCloseNav}>
              <BiColumns className="nav-icons" />
              Compare
            </CustomLink> 
            <CustomLink to="/derivations" onClick={toCloseNav}>
              <BsFillLayersFill className="nav-icons" />
              Derivations
            </CustomLink> */}

            <CustomLink to="" onClick={toCloseNav}>
              <AiOutlineApi className="nav-icons" />
              API
            </CustomLink>
            {/* Sub Menu */}
            <CustomLink
              className="mobile-submenu"
              to="/api-registration"
              onClick={toCloseNav}
            >
              <FaRegEdit className="nav-icons nav-icons-mobile" />
              Registration
            </CustomLink>
            <CustomLink
              className="mobile-submenu"
              to="/api"
              onClick={toCloseNav}
            >
              <AiOutlineFileDone className="nav-icons nav-icons-mobile" />
              Documentation
            </CustomLink>

            <CustomLink to="/about" onClick={toCloseNav}>
              <BsFillInfoCircleFill className="nav-icons" />
              About
            </CustomLink>
            {/* <CustomLink to="/faqs" onClick={toCloseNav}>
              <FaQuestionCircle className="nav-icons" />
              FAQs
            </CustomLink> */}
            <CustomLink to="/contact" onClick={toCloseNav}>
              <AiOutlineContacts className="nav-icons" />
              Contact
            </CustomLink>
            {/* {authCheckLogin === true ? (
              <CustomLink
                to=""
                onClick={() => {
                  Swal.fire({
                    title: "Logout successful",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false,
                  });
                  toCloseNav();
                  setAuthCheckLogin(false);
                  auth.signOut();
                  window.location.reload();

                  // linkModels(`/`);
                }}
              >
                <AiOutlineLogout className="nav-icons" />
                Logout
              </CustomLink>
            ) : (
              <CustomLink to="" onClick={toCloseNavandShowPopup}>
                <AiOutlineUserAdd className="nav-icons" />
                Login
              </CustomLink>
            )} */}
          </ul>
        )}

        {showPopup && (
          <div className="popup">
            <div className="popup__content">
              <div className="login">
                <div className="containers">
                  <form className="login-form" onSubmit={submitHandler}>
                    <button className="popup__close" onClick={handleClosePopup}>
                      <AiOutlineClose />
                    </button>
                    <div className="form-inner">
                      {error !== "" ? (
                        <div className="error"> {error} </div>
                      ) : (
                        ""
                      )}
                      <div className="form-headings">
                        <h2
                          className={selectedHeadingIndex === 0 ? "active" : ""}
                          onClick={() => handleClickForPopups(0)}
                        >
                          Log In
                        </h2>

                        <h2
                          className={selectedHeadingIndex === 1 ? "active" : ""}
                          onClick={() => handleClickForPopups(1)}
                        >
                          Sign Up
                        </h2>
                      </div>
                      <div>{contents[selectedHeadingIndex]}</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="dark-lite" onClick={() => toggleTheme()}>
          {(iamClick && theme === "dark-theme") || theme == "dark-theme" ? (
            <BsFillSunFill size={16} style={{ color: "#fff" }} />
          ) : (
            <BsFillMoonFill size={16} style={{ color: "#000" }} />
          )}
        </div>

        {/* {
              authCheck === true ? (
                <div>
                  <div className='welcome-user-div'>
                    <p className='welcome-user'>Welcome, {userEmail}</p>
                    <AiFillCaretDown className='hoverThis' onClick={ dropDown }/>
                  </div>
                  {/* <div>
                    {
                      drop && <UserOptions className='showThis' />
                    } 
                  </div> 

                </div>  
                
                ) : (
                <div className='btn-group nav-btn'>
                  <Link to='/login'><button className='btn btn-nav'>Login</button></Link>
                </div>
                )
            } 
            */}
      </div>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
