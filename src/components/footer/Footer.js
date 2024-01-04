import React from 'react';
import './Footer.css';
import logoBlack from '../../assets/logo-black.svg';
import logoWhite from '../../assets/logo-white.svg';
import { useStateContext } from '../../ContextProvider';
import { AiOutlineTwitter } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useStateContext();
  return (
    <div className="footer">
      <div className="footer-main-div">
        <div className="container">
          <div className="footer-inner-left">
            <div className="footer-logo-div">
              {theme === 'dark-theme' ? (
                <Link to="/">
                  <img className="footer-logo-img" src={logoWhite} alt="logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img className="footer-logo-img" src={logoBlack} alt="logo" />
                </Link>
              )}
            </div>
            <h2>Disclaimer</h2>
            <p className="disclaimer-text">
              The information provided on this website does not constitute
              investment advice, financial advice, trading advice, or any other
              sort of advice and you should not treat any of this website's
              content as such. Zero Theorem Pty Ltd does not recommend that any
              cryptocurrency should be bought, sold, or held by you. Do conduct
              your own due diligence and consult your financial advisor before
              making any investment decisions.
            </p>
          </div>
          <div className="footer-inner-right">
            <div className="forecasts-card footer-card">
              <div className="announcement-card">
                <div className="announcement-row">
                  <div className="title-div footer-ann-h">
                    <h2>Contact Us</h2>
                  </div>
                </div>

                <div className="announcement-news">
                  <div className="news-inner footer-news-inner">
                    <div>
                      <h3>ZERO THEOREM PTY LTD </h3>
                      <br />
                      <p>
                        ABN: XXX XX XXX
                        <br />
                        ACN: XXX XX XXX
                      </p>
                    </div>
                    <div className="news-textual">
                      <p className="footer-br-mb">
                        24 Rogers Avenue,
                        <br />
                        Brighton East, 3187
                        <br />
                        Melbourne, Australia
                        <br />
                        Email: info@zerotheorem.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bar-container container">
          <div className="footer-inner-left">
            <p className="footer-copyright-text">
              &#169; 2023 Zero Theorem. All rights reserved.
            </p>
          </div>
          <div className="footer-inner-right for-footer-bar">
            <div className="forecasts-card footer-card">
              <div className="announcement-card">
                <div className="announcement-news">
                  <div className="news-inner footer-news-inner inner-footer-bar">
                    <p className="footer-follow-text">Find us</p>
                    <div className="footer-icons-div">
                      <Link
                        to="https://twitter.com/zer0theorem"
                        target="_blank"
                      >
                        <AiOutlineTwitter className="footer-icons twi" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
