import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillMoonFill, BsFillSunFill, BsGraphUp } from 'react-icons/bs';
import logoBlack from '../../assets/logo-black.svg';
import logoWhite from '../../assets/logo-white.svg';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useStateContext } from '../../ContextProvider';
import {
  AiFillHome,
  AiOutlineApi,
  AiOutlineFileDone,
  AiFillWallet,
  AiOutlineAppstore,
} from 'react-icons/ai';
import { MdOutlineSource, MdManageAccounts } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { set_day_mode, set_night_mode } from '../../store';
import { BsFillLayersFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { BiColumns } from 'react-icons/bi';
// import { FaQuestionCircle, FaRegEdit } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import '../../components/navbar/Navbar.css';
import { AiOutlineContacts } from 'react-icons/ai';

export default function NavMobile(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();

  // Login State
  const { theme, setTheme, authCheckLoginInvestor } = useStateContext();
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
            <Link to="/">
              <img className="nav-logo-img" src={logoWhite} alt="logo" />
            </Link>
          ) : (
            <Link to="/">
              <img className="nav-logo-img" src={logoBlack} alt="logo" />
            </Link>
          )}
        </div>

        {toggle && (
          <div>
            {authCheckLoginInvestor === 'True' ? (
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                {/* <CustomLink to="/performance" onClick={toCloseNav}>
                  <AiFillHome className="nav-icons" />
                  Performance
                </CustomLink> */}
                {/* <CustomLink to="/risk-management" onClick={toCloseNav}>
                  <MdManageAccounts className="nav-icons" />
                  Risk Management
                </CustomLink> */}

                <CustomLink to="/compare-models" onClick={toCloseNav}>
                  <BiColumns className="nav-icons nav-icons-mobile" />
                  Compare
                </CustomLink>
                <CustomLink to="/backtest-models" onClick={toCloseNav}>
                  <BsGraphUp className="nav-icons nav-icons-mobile" />
                  Backtest
                </CustomLink>
                <CustomLink to="/api" onClick={toCloseNav}>
                  <AiOutlineApi className="nav-icons" />
                  API
                </CustomLink>
                <CustomLink to="/theory" onClick={toCloseNav}>
                  <BsFillLayersFill className="nav-icons nav-icons-mobile" />
                  Theory
                </CustomLink>
              </ul>
            ) : (
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                {/* <CustomLink to="/performance" onClick={toCloseNav}>
                  <AiFillHome className="nav-icons" />
                  Performance
                </CustomLink> */}
                {/* <CustomLink to="/risk-management" onClick={toCloseNav}>
                  <MdManageAccounts className="nav-icons" />
                  Risk Management
                </CustomLink> */}
                <CustomLink to="" onClick={toCloseNav}>
                  <AiFillWallet className="nav-icons" />
                  Forecasts
                </CustomLink>
                {/* Sub Menu */}
                <CustomLink
                  className="mobile-submenu"
                  to="/all-models"
                  onClick={toCloseNav}
                >
                  <AiOutlineAppstore className="nav-icons nav-icons-mobile" />
                  All Models
                </CustomLink>
                <CustomLink
                  className="mobile-submenu"
                  to="/backtest-models"
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

                <CustomLink to="/faqs" onClick={toCloseNav}>
                  <MdOutlineSource className="nav-icons" />
                  FAQs
                </CustomLink>
                {/* Sub Menu */}
                {/* <CustomLink
                  className="mobile-submenu"
                  to="/theory"
                  onClick={toCloseNav}
                >
                  <BsFillLayersFill className="nav-icons nav-icons-mobile" />
                  Theory
                </CustomLink> 
                <CustomLink
                  className="mobile-submenu"
                  to="/faqs"
                  onClick={toCloseNav}
                >
                  <FaQuestionCircle className="nav-icons nav-icons-mobile" />
                  FAQs
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
                <CustomLink to="/contact" onClick={toCloseNav}>
                  <AiOutlineContacts className="nav-icons" />
                  Contact
                </CustomLink>
              </ul>
            )}
          </div>
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
