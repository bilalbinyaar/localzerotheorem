// THIS COMPONENT IS BEING USED
import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const SenstitivityAnalysisMarketSpecificAlpha = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <SideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">
                Sensitivity Analysis - Market Specific Alpha Case
              </h1>
              <p className="for-mt-primary">
                In this section, we are going to study the sensitivity of Π
                <sub>BTC</sub> with respect to parameters introduced when
                considering the particular models above. To this end, we are
                going to make use of the following expression for Π
                <sub>BTC</sub>:
              </p>
              <MathComponent
                tex={String.raw`\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n \alpha_k \cdot P_k \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right]`}
              />

              <h2 className="for-mt-primary">
                Sensitivity Analysis with Respect to Volume
              </h2>
              <p className="for-mt-secondary">Since</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}=\frac{W_k}{R} \cdot \frac{\partial}{\partial t}\left[\ln \frac{W_k}{R}\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">where</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;W_k=P_k \cdot \alpha_k, \quad R=\sum_{k=1}^n P_k \cdot R_k\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                then, we straightforwardly conclude that when W<sub>k</sub>/R is
                an increasing (decreasing) function of t, then Π<sub>BTC</sub>{' '}
                is an increasing (decreasing) function of R<sub>k</sub>.
                <br />
                On the other hand,
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k^{\prime}}=\frac{W_k}{R}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                leading to the conclusion that Π<sub>BTC</sub> is an increasing
                function of R<sup>′</sup>
                <sub>k</sub>.
              </p>

              <h2 className="for-mt-primary">
                Sensitivity with Respect to Velocity
              </h2>
              <p className="for-mt-secondary">Taking into account that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial T_j^{\prime}}=-\frac{1}{\left(T_j^{\prime}\right)^2} \cdot \sum_{l=1}^m T_l^{\prime \prime}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                and taking into account that the denominator is positive for all
                t, then it is obvious that
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\sum_{m=1}^n T_m^{\prime \prime}<0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">implies that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial T_j^{\prime}}>0,\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                i.e., Π<sub>BTC</sub> is an increasing function of T<sup>′</sup>
                <sub>j</sub>.
                <br />
                On the other hand,
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\sum_{m=1}^n T_m^{\prime \prime}>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">implies that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial T_j^{\prime}}<0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                i.e., Π<sub>BTC</sub> is a decreasing function of T<sup>′</sup>
                <sub>j</sub>.
              </p>

              <h2 className="for-mt-primary">
                Sensitivity with Respect to Output Parameters
              </h2>
              <p className="for-mt-secondary">Taking into account that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial b}=\frac{b^{\prime}}{b^2},\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                the denominator of which is positive for all t, we conclude that
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial b}>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">when b′ &gt; 0. Similarly,</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial b}<0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                when b′ &lt; 0.
                <br />
                Hence, when b is an increasing (decreasing) function of t, then
                ΠBTC is an increasing (decreasing) function of b.
                <br />
                Using the expression
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial h}=\frac{h^{\prime}}{h^2},\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                we conclude that, when h is an increasing (decreasing) function
                of t, then Π<sub>BTC</sub> is an increasing (decreasing)
                function of h.
                <br />
                However, since
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial d}=-\frac{d^{\prime}}{d^2},\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                we come to the conclusion that when d is an increasing
                (decreasing) function of t, then Π<sub>BTC</sub> is a decreasing
                (increasing) function of d.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenstitivityAnalysisMarketSpecificAlpha;
