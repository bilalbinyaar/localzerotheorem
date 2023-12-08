import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import logoBlack from '../../assets/logo-black.svg';
import logoWhite from '../../assets/logo-white.svg';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useStateContext } from '../../ContextProvider';
// import UserOptions from './components/UserOptions';
import { AiOutlineClose, AiFillGoogleCircle } from 'react-icons/ai';
import NavMobile from '../../mobile-components/nav/NavMobile';
import { useSelector, useDispatch } from 'react-redux';
import {
  set_day_mode,
  set_login,
  set_night_mode,
  set_login_flase,
  set_login_flase_admin,
} from '../../store';
import LoginPopup from '../login-popup/LoginPopup';
import { auth, provider } from '../../firebase_config';
import Swal from 'sweetalert2';
import {
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export default function Navbar() {
  const linkModels = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
  }

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();
  const handlePersistantLogin = () => {
    dispatch(set_login_flase(false));
  };
  const handlePersistantLoginAdmin = () => {
    dispatch(set_login_flase_admin(false));
  };
  // Login State
  const {
    authCheckLogin,
    userEmail,
    setAuthCheckLogin,
    authCheck,
    setAuthCheck,
    theme,
    uid,
    setUid,
    setTheme,
    authCheckLoginInvestor,
    setAuthCheckLoginInvestor,
    setCheckLoginMain,
  } = useStateContext();
  // Login State
  // const [theme, setTheme] = useState("light-theme");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
    if (theme === 'dark-theme') {
      setTheme('light-theme');
      handleDayModeTheme();
      handleiamClick();
    } else {
      setTheme('dark-theme');
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

  // FOR RESPONSIVENESS
  const windowWidth = useRef(window.innerWidth);
  // FOR RESPONSIVENESS

  function toCloseNav() {
    setToggle(false);
    setClick(false);
  }

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [details, setDetails] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

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
        const user = result.user.email;
        // console.log(user);
        // alert("Successfully login with email " + user);
        Swal.fire({
          title: 'Login successful',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
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
          title: 'Login not successful',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, get the UID
        // console.log("User token -->", user.uid)
        setUid(user.uid);
        setAuthCheckLogin(true);
      } else {
        // User is signed out
        setUid('');
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
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
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          if (!email || !password) {
            // alert("Kindly enter input details for signup");
            Swal.fire({
              title: 'Kindly enter input details',
              icon: 'error',
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
            });
          } else {
            // console.log(email, password);
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                Swal.fire({
                  title: 'Login successful',
                  icon: 'success',
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-right',
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
                  title: 'Login not successful',
                  icon: 'error',
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-right',
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
          Don’t have an account?{' '}
          <strong
            className={selectedHeadingIndex === 1 ? 'active' : 'color-yellow'}
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
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          if (!email || !password) {
            // console.log();
            // alert("Kindly enter input details for signup");
            Swal.fire({
              title: 'Kindly enter input details',
              icon: 'error',
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
            });
          } else if (isChecked == false) {
            Swal.fire({
              title: 'Kindly agree to our term and conditions',
              icon: 'error',
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
            });
          } else {
            // console.log(email, password);
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                Swal.fire({
                  title: 'User account is created successfully',
                  icon: 'success',
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-right',
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
                  title: 'Unable to create account with your credentials',
                  icon: 'error',
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-right',
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
          Already have an account?{' '}
          <strong
            className={selectedHeadingIndex === 0 ? 'active' : 'color-yellow'}
            onClick={() => handleClickForPopups(0)}
          >
            Log In
          </strong>
        </p>
      </div>
    </div>,
  ];

  return (
    <div className="header">
      {windowWidth.current <= 1240 ? (
        <NavMobile />
      ) : (
        <div className="container">
          <div className="nav-logo-div">
            {theme === 'dark-theme' ? (
              <Link to="/">
                <img className="nav-logo-img" src={logoWhite} alt="logo" />
              </Link>
            ) : (
              <Link to="/">
                <img className="nav-logo-img" src={logoBlack} alt="logo" />
              </Link>
            )}
          </div>

          {authCheckLoginInvestor == 'True' ? (
            <ul
              id="mobile-nav"
              className={click ? 'nav-menu active' : 'nav-menu'}
            >
              <CustomLink to="/" onClick={toCloseNav}>
                Performance
              </CustomLink>
              <CustomLink to="/risk-management" onClick={toCloseNav}>
                Risk Management
              </CustomLink>
              {/* <CustomLink to="/account-details" className="menu-item">
                Accounts
              </CustomLink> */}
              <CustomLink to="/compare-strategies" className="menu-item">
                Compare
              </CustomLink>
              <CustomLink to="/backtest-strategies" className="menu-item">
                Backtest
              </CustomLink>

              <CustomLink to="/api" className="menu-item">
                API
              </CustomLink>
              <CustomLink to="/theory" className="menu-item">
                Theory
              </CustomLink>
            </ul>
          ) : (
            <ul
              id="mobile-nav"
              className={click ? 'nav-menu active' : 'nav-menu'}
            >
              <CustomLink to="/performance" onClick={toCloseNav}>
                Performance
              </CustomLink>
              <CustomLink to="/risk-management" onClick={toCloseNav}>
                Risk Management
              </CustomLink>
              <CustomLink className="menu-item">
                Forecasts
                <ul className="sub-menu-items">
                  <CustomLink
                    className="sub-menu-item"
                    to="/all-models"
                    onClick={toCloseNav}
                  >
                    All Models
                  </CustomLink>
                  <CustomLink
                    className="sub-menu-item"
                    to="/backtest-models"
                    onClick={toCloseNav}
                  >
                    Backtest
                  </CustomLink>
                  <CustomLink
                    className="sub-menu-item"
                    to="/compare-models"
                    onClick={toCloseNav}
                  >
                    Compare
                  </CustomLink>
                </ul>
              </CustomLink>
              <CustomLink className="menu-item">
                Resources
                <ul className="sub-menu-items">
                  <CustomLink
                    className="sub-menu-item"
                    to="/theory"
                    onClick={toCloseNav}
                  >
                    Theory
                  </CustomLink>
                  <CustomLink
                    className="sub-menu-item"
                    to="/faqs"
                    onClick={toCloseNav}
                  >
                    FAQs
                  </CustomLink>
                </ul>
              </CustomLink>

              {/* <CustomLink to="/" onClick={toCloseNav}>
              Forecasts
            </CustomLink> 
            <CustomLink to="/backtest" onClick={toCloseNav}>
              Backtest
            </CustomLink>
            <CustomLink to="/compare" onClick={toCloseNav}>
              Compare
            </CustomLink> 
            
            <CustomLink to="/derivations" onClick={toCloseNav}>
              Derivations
            </CustomLink> */}
              <CustomLink className="menu-item">
                API
                <ul className="sub-menu-items">
                  <CustomLink
                    className="sub-menu-item"
                    to="/api-registration"
                    onClick={toCloseNav}
                  >
                    Registration
                  </CustomLink>
                  <CustomLink
                    className="sub-menu-item"
                    to="/api"
                    onClick={toCloseNav}
                  >
                    Documentation
                  </CustomLink>
                </ul>
              </CustomLink>
              <CustomLink to="/about" onClick={toCloseNav}>
                About
              </CustomLink>
              <CustomLink to="/contact" onClick={toCloseNav}>
                Contact
              </CustomLink>
              {/* <CustomLink to="/faqs" onClick={toCloseNav}>
              FAQs
            </CustomLink> */}
            </ul>
          )}

          {toggle && (
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {authCheckLoginInvestor === 'True' ? (
                <div>
                  <p className="welcome-user welcome-user-mobile">
                    Welcome, {userEmail}
                  </p>
                </div>
              ) : (
                <div className="display-none"></div>
              )}

              <CustomLink to="/" onClick={toCloseNav}>
                Forecasts
              </CustomLink>
              <CustomLink to="/backtest" onClick={toCloseNav}>
                Backtest
              </CustomLink>
              <CustomLink to="/compare" onClick={toCloseNav}>
                Compare
              </CustomLink>
              <CustomLink to="/theory" onClick={toCloseNav}>
                Theory
              </CustomLink>
              <CustomLink to="/documentation" onClick={toCloseNav}>
                API
              </CustomLink>
              <CustomLink to="/about" onClick={toCloseNav}>
                About
              </CustomLink>
              <CustomLink to="/faqs" onClick={toCloseNav}>
                FAQs
              </CustomLink>

              {/* {authCheck === true ? (
                <CustomLink
                  to="/"
                  onClick={() => {
                    setAuthCheck(false);
                  }}
                >
                  Logout
                </CustomLink>
              ) : (
                <CustomLink to="/login">Login</CustomLink>
              )} */}
            </ul>
          )}

          {/* {toggle && (
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

              <CustomLink to="/" onClick={toCloseNav}>
                Forecasts
              </CustomLink>
              <CustomLink to="/backtest" onClick={toCloseNav}>
                Backtest
              </CustomLink>
              <CustomLink to="/compare" onClick={toCloseNav}>
                Compare
              </CustomLink>
              <CustomLink to="/derivations" onClick={toCloseNav}>
                Derivations
              </CustomLink>
              <CustomLink to="/documentation" onClick={toCloseNav}>
                API
              </CustomLink>
              <CustomLink to="/about" onClick={toCloseNav}>
                About
              </CustomLink>
              <CustomLink to="/faqs" onClick={toCloseNav}>
                FAQs
              </CustomLink>

              {authCheck === true ? (
                <CustomLink
                  to="/"
                  onClick={() => {
                    setAuthCheck(false);
                  }}
                >
                  Logout
                </CustomLink>
              ) : (
                <CustomLink to="/login">Login</CustomLink>
              )}
            </ul>
          )} */}

          <div className="dark-lite">
            {(iamClick && theme === 'dark-theme') || theme == 'dark-theme' ? (
              <BsFillSunFill
                className="dark-lite-icon"
                onClick={() => toggleTheme()}
                size={20}
                style={{ color: '#fff' }}
              />
            ) : (
              <BsFillMoonFill
                className="dark-lite-icon"
                onClick={() => toggleTheme()}
                size={20}
                style={{ color: '#000' }}
              />
            )}
          </div>

          {/* {authCheckLoginInvestor == true ? (
            <div className="btn-group nav-btn">
              <button
                className="btn btn-nav"
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
                  setAuthCheckLoginInvestor(false);
                  linkModels(`/`);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              {authCheckLogin === true ? (
            <div className="btn-group nav-btn">
              <button
                className="btn btn-nav"
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
                  setAuthCheckLogin(false);
                  auth.signOut();
                  linkModels(`/`);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="btn-group nav-btn">
              
              <button className="btn btn-nav" onClick={handleShowPopup}>
                Login
              </button>
              {showPopup && (
                <div className="popup">
                  <div className="popup__content">
                    <div className="login">
                      <div className="containers">
                        <form className="login-form" onSubmit={submitHandler}>
                          <button
                            className="popup__close"
                            onClick={handleClosePopup}
                          >
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
                                className={
                                  selectedHeadingIndex === 0 ? "active" : ""
                                }
                                onClick={() => handleClickForPopups(0)}
                              >
                                Log In
                              </h2>

                              <h2
                                className={
                                  selectedHeadingIndex === 1 ? "active" : ""
                                }
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
            </div>
          )}
            </div>
          ) } */}

          {/* {authCheckLoginInvestor == 'True' ? (
            <div className="btn-group nav-btn">
              <button
                className="btn btn-nav"
                onClick={() => {
                  Swal.fire({
                    title: 'Logout successful',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                  });
                  setAuthCheckLoginInvestor(false);
                  handlePersistantLogin();

                  linkModels(`/`);
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="btn-group nav-btn">
              <button
                className="btn btn-nav"
                onClick={() => {
                  Swal.fire({
                    title: 'Logout successful',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                  });
                  setCheckLoginMain(false);
                  handlePersistantLoginAdmin();
                  linkModels(`/`);
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          )} */}

          <div className="hamburger" onClick={oneClick}>
            {click ? (
              <FaTimes size={20} style={{ color: '#333' }} />
            ) : (
              <FaBars size={20} style={{ color: '#333' }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
