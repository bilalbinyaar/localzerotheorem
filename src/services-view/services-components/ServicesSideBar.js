// THIS COMPONENT IS BEING USED
import React, { useState } from 'react';
import '../../components/resources/sidebar/SideBar.css';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useStateContext } from '../../ContextProvider';
import { Link } from 'react-router-dom';

const ServicesSideBar = () => {
  const { showSeven, setShowSeven } = useStateContext();

  const [toggleRes, setToggleRes] = useState(false);
  const hamClickRes = () => setToggleRes(!toggleRes);

  const [iamClickRes, setiamClickRes] = useState(false);
  const handleiamClickRes = () => setiamClickRes(!iamClickRes);

  function oneClickRes() {
    hamClickRes();
    handleiamClickRes();
  }

  return (
    <div className="res-main-for-height">
      {/* FOR MOBILE */}
      <div className="heading-mob" onClick={oneClickRes}>
        <h1>Hypothesis</h1>
        <div>{iamClickRes ? <AiFillCaretUp /> : <AiFillCaretDown />}</div>
      </div>

      {toggleRes && (
        <div id="for-mob-sidebar" className="side-bar">
          <div className="sidebar-head">
            <h1>Hypothesis</h1>
          </div>

          <div className="for-hr sidebar-hr"></div>

          <div className="sidebar-navigator">
            {/* MENU ITEM 1 */}
            <div className="main-item">
              <Link to="/hypothesis">
                <div>
                  <h3>The Underlying Assumptions</h3>
                </div>
              </Link>
            </div>

            {/* MENU ITEM 2 */}
            <div className="main-item">
              <Link to="/hypothesis-of-representation-of-a-new-asset-class-via-substitution">
                <div>
                  <h3>Representation of a New Asset Class via Substitution</h3>
                </div>
              </Link>
            </div>

            {/* MENU ITEM 3 */}
            <div className="main-item">
              <Link to="/hypothesis-of-the-governing-equation">
                <div>
                  <h3>The Governing Equation</h3>
                </div>
              </Link>
            </div>

            {/* MENU ITEM 4 */}
            <div className="main-item" onClick={() => setShowSeven(!showSeven)}>
              <Link to="/hypothesis-of-investigating-alpha">
                <div>
                  <h3>Investigating Alpha</h3>
                </div>
              </Link>
            </div>

            {/* MENU ITEM 5 */}
            <div className="main-item">
              <Link to="/hypothesis-of-sensitivity-analysis-general-case">
                <div>
                  <h3>Sensitivity Analysis - General Case</h3>
                </div>
              </Link>
            </div>

            {/* MENU ITEM 6 */}
            <div className="main-item">
              <Link to="/hypothesis-of-senstitivity-analysis-market-specific-alpha">
                <div>
                  <h3>Senstitivity Analysis - Market Specific Alpha</h3>
                </div>
              </Link>
            </div>

            {/* MENU ITEM 7 */}
            <div className="main-item">
              <Link to="/hypothesis-of-senstitivity-analysis-single-alpha-case">
                <div>
                  <h3>Senstitivity Analysis - Single Alpha Case</h3>
                </div>
              </Link>
            </div>

            {/* MENU ITEM 14 */}
            <div className="main-item">
              <Link to="/hypothesis-of-an-initial-solution">
                <div>
                  <h3>An Initial Solution</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FOR WEB */}
      <div id="for-web-sidebar" className="side-bar">
        <div className="sidebar-head">
          <h1>Hypothesis</h1>
        </div>

        <div className="for-hr sidebar-hr"></div>

        <div className="sidebar-navigator">
          {/* MENU ITEM 1 */}
          <div className="main-item">
            <Link to="/hypothesis">
              <div>
                <h3>The Underlying Assumptions</h3>
              </div>
            </Link>
          </div>

          {/* MENU ITEM 2 */}
          <div className="main-item">
            <Link to="/hypothesis-of-representation-of-a-new-asset-class-via-substitution">
              <div>
                <h3>Representation of a New Asset Class via Substitution</h3>
              </div>
            </Link>
          </div>

          {/* MENU ITEM 3 */}
          <div className="main-item">
            <Link to="/hypothesis-of-the-governing-equation">
              <div>
                <h3>The Governing Equation</h3>
              </div>
            </Link>
          </div>

          {/* MENU ITEM 4 */}
          <div className="main-item" onClick={() => setShowSeven(!showSeven)}>
            <Link to="/hypothesis-of-investigating-alpha">
              <div>
                <h3>Investigating Alpha</h3>
              </div>
            </Link>
          </div>

          {/* MENU ITEM 5 */}
          <div className="main-item">
            <Link to="/hypothesis-of-sensitivity-analysis-general-case">
              <div>
                <h3>Sensitivity Analysis - General Case</h3>
              </div>
            </Link>
          </div>

          {/* MENU ITEM 6 */}
          <div className="main-item">
            <Link to="/hypothesis-of-senstitivity-analysis-market-specific-alpha">
              <div>
                <h3>Senstitivity Analysis - Market Specific Alpha</h3>
              </div>
            </Link>
          </div>

          {/* MENU ITEM 7 */}
          <div className="main-item">
            <Link to="/hypothesis-of-senstitivity-analysis-single-alpha-case">
              <div>
                <h3>Senstitivity Analysis - Single Alpha Case</h3>
              </div>
            </Link>
          </div>

          {/* MENU ITEM 14 */}
          <div className="main-item">
            <Link to="/hypothesis-of-an-initial-solution">
              <div>
                <h3>An Initial Solution</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSideBar;
