// THIS COMPONENT IS BEING USED
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillMoonFill, BsFillSunFill, BsGraphUp } from 'react-icons/bs';
import logoBlack from '../../assets/logo-black.svg';
import logoWhite from '../../assets/logo-white.svg';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useStateContext } from '../../ContextProvider';
import { AiFillHome } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { set_day_mode, set_night_mode } from '../../store';
import '../../components/navbar/Navbar.css';
import { AiOutlineContacts } from 'react-icons/ai';

export default function ServicesNavMobile(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();
  const { handleAdminInvestorView } = useStateContext();

  // Login State
  const { theme, setTheme } = useStateContext();
  // Login State

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

  function toCloseNav() {
    setToggle(false);
    setClick(false);
  }
  function toCloseNavLogin() {
    setToggle(false);
    setClick(false);
    handleAdminInvestorView();
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
          {theme === 'dark-theme' ? (
            <Link to="/services-about">
              <img className="nav-logo-img" src={logoWhite} alt="logo" />
            </Link>
          ) : (
            <Link to="/services-about">
              <img className="nav-logo-img" src={logoBlack} alt="logo" />
            </Link>
          )}
        </div>

        {toggle && (
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <CustomLink to="/services-about" onClick={toCloseNav}>
              <AiFillHome className="nav-icons" />
              About
            </CustomLink>
            <CustomLink to="/ZT1-SE9H-1" onClick={toCloseNav}>
              <BsGraphUp className="nav-icons" />
              BTC Example
            </CustomLink>
            <CustomLink to="/contact-us" onClick={toCloseNav}>
              <AiOutlineContacts className="nav-icons" />
              Contact
            </CustomLink>
            <CustomLink to="/login" onClick={toCloseNavLogin}>
              <AiOutlineContacts className="nav-icons" />
              Login
            </CustomLink>
          </ul>
        )}

        <div className="dark-lite" onClick={() => toggleTheme()}>
          {(iamClick && theme === 'dark-theme') || theme === 'dark-theme' ? (
            <BsFillSunFill size={16} style={{ color: '#fff' }} />
          ) : (
            <BsFillMoonFill size={16} style={{ color: '#000' }} />
          )}
        </div>
      </div>
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
