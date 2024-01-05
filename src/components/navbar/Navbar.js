import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import logoBlack from '../../assets/logo-black.svg';
import logoWhite from '../../assets/logo-white.svg';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useStateContext } from '../../ContextProvider';
import NavMobile from '../../mobile-components/nav/NavMobile';
import { useDispatch } from 'react-redux';
import { set_day_mode, set_night_mode } from '../../store';
import { auth } from '../../firebase_config';

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();

  // Login State
  const {
    setAuthCheckLogin,

    theme,

    setUid,
    setTheme,
    // authCheckLoginInvestor,
  } = useStateContext();

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

  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       Swal.fire({
  //         title: 'Login successful',
  //         icon: 'success',
  //         timer: 2000,
  //         timerProgressBar: true,
  //         toast: true,
  //         position: 'top-right',
  //         showConfirmButton: false,
  //       });
  //       setAuthCheckLogin(true);
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         title: 'Login not successful',
  //         icon: 'error',
  //         timer: 2000,
  //         timerProgressBar: true,
  //         toast: true,
  //         position: 'top-right',
  //         showConfirmButton: false,
  //       });
  //     });
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        setAuthCheckLogin(true);
      } else {
        setUid('');
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

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

          <ul
            id="mobile-nav"
            className={click ? 'nav-menu active' : 'nav-menu'}
          >
            <CustomLink to="/">Performance</CustomLink>
            <CustomLink to="/risk-management">Risk Management</CustomLink>

            <CustomLink className="menu-item">
              Forecasts
              <ul className="sub-menu-items">
                <CustomLink className="sub-menu-item" to="/all-models">
                  All Models
                </CustomLink>
                <CustomLink className="sub-menu-item" to="/backtest-models">
                  Backtest
                </CustomLink>
                <CustomLink className="sub-menu-item" to="/compare-models">
                  Compare
                </CustomLink>
              </ul>
            </CustomLink>
            <CustomLink className="menu-item">
              Resources
              <ul className="sub-menu-items">
                <CustomLink className="sub-menu-item" to="/faqs">
                  FAQs
                </CustomLink>
              </ul>
            </CustomLink>
            <CustomLink className="menu-item">
              API
              <ul className="sub-menu-items">
                <CustomLink className="sub-menu-item" to="/api-registration">
                  Registration
                </CustomLink>
                <CustomLink className="sub-menu-item" to="/api">
                  Documentation
                </CustomLink>
              </ul>
            </CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/contact">Contact</CustomLink>
          </ul>

          <div className="dark-lite">
            {(iamClick && theme === 'dark-theme') || theme === 'dark-theme' ? (
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
