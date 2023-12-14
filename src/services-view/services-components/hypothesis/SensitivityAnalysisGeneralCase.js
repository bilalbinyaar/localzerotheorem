import React from 'react';
import '../../../components/resources/ResourcesTextual.css';
import { MathComponent } from 'mathjax-react';
import ServicesSideBar from '../ServicesSideBar';

const SensitivityAnalysisGeneralCase = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <ServicesSideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">
                Sensitivity Analysis - General Case
              </h1>
              <p className="for-mt-primary">
                In this section, we carry out sensitivity analysis for Π
                <sub>BTC</sub> with respect to all parameters included in it. We
                start with the general case and the incorporate some specific
                models and assumptions.
              </p>

              <h2 className="for-mt-primary">
                The Case of the Generalised Model
              </h2>
              <p className="for-mt-secondary">
                First, consider the general case when
              </p>
              <MathComponent
                tex={String.raw`\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)+\ln V_{\mathrm{BTC}}-\ln Q_{\mathrm{BTC}}\right]`}
              />
              <p className="for-mt-secondary">
                Now, before proceeding to the sensitivity analysis, we assume
                that there is no correlation between f′ and f for none of the
                functions entering the expression of ΠBTC.
                <br />
                Detailed calculation of derivatives used for the sensitivity
                analysis carried out in this section are presented at the end of
                this Appendix.
              </p>

              <h3 className="for-mt-primary">
                Sensitivity with Respect to Velocity
              </h3>
              <p className="for-mt-secondary">
                In this section, we study the sensitivity of ΠBTC with respect
                to V<sub>BTC</sub> and V<sup>′</sup>
                <sub>BTC</sub>. First note that since
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial V_{\mathrm{BTC}}}=-\frac{V_{\mathrm{BTC}}^{\prime}}{V_{\mathrm{BTC}}^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Taking into account that the denominator is always positive, we
                come to the evident conclusion that
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial V_{\mathrm{BTC}}}>0 \text { when } \quad V_{\mathrm{BTC}}^{\prime}<0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial V_{\mathrm{BTC}}}<0 \quad \text { when } \quad V_{\mathrm{BTC}}^{\prime}>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                In other words, when VBTC is a decreasing (increasing) function
                of t, then Π<sub>BTC</sub> is an increasing (decreasing)
                function of V<sub>BTC</sub>.
                <br />
                On the other hand, since
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial V_{\mathrm{BTC}}^{\prime}}=\frac{1}{V_{\mathrm{BTC}}}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                which is apparently always positive, we conclude that Π
                <sub>BTC</sub> is an increasing (linear) function of V
                <sup>′</sup>
                <sub>BTC</sub> for all values of t.
              </p>

              <h3 className="for-mt-primary">
                Sensitivity with Respect to Output
              </h3>
              <p className="for-mt-secondary">
                According to the derivative expression derived at the end of
                this section,
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial Q_{\mathrm{BTC}}}=\frac{Q_{\mathrm{BTC}}^{\prime}}{Q_{\mathrm{BTC}}^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Taking into account that Q<sub>BTC</sub> is an increasing
                function of t, implying that Q<sup>′</sup>
                <sub>BTC</sub> &gt; 0, we conclude that
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial Q_{\mathrm{BTC}}}>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                for all t. In other words, ΠBTC is always an increasing function
                of Q<sup>′</sup>
                <sub>BTC</sub>.
                <br />
                Similarly, since
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial Q_{\mathrm{BTC}}^{\prime}}=-\frac{1}{Q_{\mathrm{BTC}}}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">we see that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial Q_{\mathrm{BTC}}^{\prime}}<0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                for all t. Therefore, ΠBTC is a decreasing function of Q
                <sup>′</sup>
                <sub>BTC</sub>.
              </p>

              <h3 className="for-mt-primary">
                Sensitivity with Respect to Asset Prices
              </h3>
              <p className="for-mt-secondary">Taking into account that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k^{\prime}}=\frac{U_{s_k}}{S}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">in which</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;S=\sum_{k=1}^n P_k \cdot U_{s_k}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">it becomes evident that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k^{\prime}}>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                for all t. Thence, ΠBTC is an increasing function of P′k.
                <br />
                On the other hand, since
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}=\frac{U_{s_k}}{S} \cdot \frac{\partial}{\partial t}\left[\ln \left(\frac{U_{s_k}}{S}\right)\right],\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                we observe that when U<sub>sk</sub>/S is an increasing function
                of t, then
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial t}\left[\ln \left(\frac{U_{s_k}}{S}\right)\right]>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">implying that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Similarly, when U<sub>sk</sub>/S is a decreasing function of t,
                then
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}<0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Thence, when U<sub>sk</sub>/S is an increasing (decreasing)
                function of t, Π<sub>BTC</sub> is an increasing (decreasing)
                function of P<sub>k</sub>.
              </p>

              <h3 className="for-mt-primary">
                Sensitivity with Respect to Absorption (U<sub>sk</sub>)
              </h3>
              <p className="for-mt-secondary">Since</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial U_{s_k}^{\prime}}=\frac{P_k}{S}>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                for all t. Therefore, Π<sub>BTC</sub> is an increasing function
                of U<sup>′</sup>
                <sub>sk</sub>.
                <br />
                On the other hand,
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial U_{s_k}}=\frac{P_k}{S} \cdot \frac{\partial}{\partial t}\left[\ln \left(\frac{P_k}{S}\right)\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                providing that when P<sub>k</sub>/S is an increasing
                (decreasing) function of t, Π<sub>BTC</sub> is an increasing
                (decreasing) function of U<sub>sk</sub>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensitivityAnalysisGeneralCase;
