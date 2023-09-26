import React, { useState, useEffect, useRef } from 'react';
import '../../components/navbar/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import logoBlack from '../../assets/logo-black.svg';
import logoWhite from '../../assets/logo-white.svg';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useStateContext } from '../../ContextProvider';
import NavMobile from '../../mobile-components/nav/NavMobile';
import { useDispatch } from 'react-redux';
import { set_day_mode, set_night_mode } from '../../store';

export default function ServicesNavbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();

  // Login State
  const { theme, setTheme } = useStateContext();
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
            className={click ? 'nav-menu active' : 'nav-menu services-nav-menu'}
          >
            <CustomLink to="/services-about">About</CustomLink>
            <CustomLink to="/ZT1-SM8H-1">BTC Example</CustomLink>
            <CustomLink to="/hypothesis">Hypothesis</CustomLink>
            <CustomLink to="/documentations">Documentation</CustomLink>
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

          <div className="btn-group nav-btn">
            <button className="btn btn-nav">Contact</button>
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
