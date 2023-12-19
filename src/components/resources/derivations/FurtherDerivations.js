import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const FurtherDerivations = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <SideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">Further Derivations</h1>

              <h2 className="for-mt-primary">With Respect to Velocity</h2>
              <p className="for-mt-secondary">
                Here we present derivations of some partial derivatives required
                for sensitivity analysis carried out in previous sections.
                <br />
                In order to study the sensitivity of Π<sub>BTC</sub> with
                respect to V<sub>BTC</sub>, we compute
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial V_{\mathrm{BTC}}}=\frac{\partial}{\partial V_{\mathrm{BTC}}}\left[\frac{\partial \ln V_{\mathrm{BTC}}}{\partial t}+\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)-\ln Q_{\mathrm{BTC}}\right]\right]=`}
              />
              <MathComponent
                tex={String.raw`\frac{\partial}{\partial V_{\mathrm{BTC}}}\left[\frac{\partial \ln V_{\mathrm{BTC}}}{\partial t}\right]=\frac{\partial}{\partial V_{\mathrm{BTC}}}\left[\frac{V_{\mathrm{BTC}}^{\prime}}{V_{\mathrm{BTC}}}\right]=-\frac{V_{\mathrm{BTC}}^{\prime}}{V_{\mathrm{BTC}}^2}`}
              />
              <p className="for-mt-secondary">
                On the other hand, the sensitivity of Π<sub>BTC</sub> with
                respect to V<sup>′</sup>
                <sub>BTC</sub> is carried out on the basis of the derivative
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial Q_{\mathrm{BTC}}}=\frac{\partial}{\partial Q_{\mathrm{BTC}}}\left[-\frac{\partial \ln Q_{\mathrm{BTC}}}{\partial t}+\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)+\ln V_{\mathrm{BTC}}\right]\right]=`}
              />
              <MathComponent
                tex={String.raw`=-\frac{\partial}{\partial Q_{\mathrm{BTC}}}\left[\frac{\partial \ln Q_{\mathrm{BTC}}}{\partial t}\right]=-\frac{\partial}{\partial Q_{\mathrm{BTC}}}\left[\frac{Q_{\mathrm{BTC}}^{\prime}}{Q_{\mathrm{BTC}}}\right]=\frac{Q_{\mathrm{BTC}}^{\prime}}{Q_{\mathrm{BTC}}^2}`}
              />

              <h2 className="for-mt-primary">With Respect to Output</h2>
              <p className="for-mt-secondary">In this case, we have</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial Q_{\mathrm{BTC}}}=\frac{\partial}{\partial Q_{\mathrm{BTC}}}\left[-\frac{\partial \ln Q_{\mathrm{BTC}}}{\partial t}+\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)+\ln V_{\mathrm{BTC}}\right]\right]=`}
              />
              <MathComponent
                tex={String.raw`-\frac{\partial}{\partial Q_{\mathrm{BTC}}}\left[\frac{\partial \ln Q_{\mathrm{BTC}}}{\partial t}\right]=-\frac{\partial}{\partial Q_{\mathrm{BTC}}}\left[\frac{Q_{\mathrm{BTC}}^{\prime}}{Q_{\mathrm{BTC}}}\right]=\frac{Q_{\mathrm{BTC}}^{\prime}}{Q_{\mathrm{BTC}}^2}`}
              />
              <p className="for-mt-secondary">In the same way, we compute</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial Q_{\mathrm{BTC}}^{\prime}}=\frac{\partial}{\partial Q_{\mathrm{BTC}}}\left[-\frac{\partial \ln Q_{\mathrm{BTC}}}{\partial t}+\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)+\ln V_{\mathrm{BTC}}\right]\right]=`}
              />

              <h2 className="for-mt-primary">With Respect to Asset Price</h2>
              <p className="for-mt-secondary">
                We start with simplifying the corresponding term in the
                expression of Π<sub>BTC</sub>,
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)\right]=\frac{\sum_{k=1}^n\left(P_k \cdot U_{s_k}\right)^{\prime}}{\sum_{k=1}^n P_k \cdot U_{s_k}}=\frac{1}{S} \cdot \sum_{k=1}^n\left(P_k^{\prime} \cdot U_{s_k}+P_k \cdot U_{s_k}^{\prime}\right)=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\frac{1}{S} \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">in which</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;S=\sum_{k=1}^n P_k \cdot U_{s_k}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                As a matter of fact, Π<sub>BTC</sub> is linear in P<sup>′</sup>
                <sub>k</sub>. Therefore, the derivative of ΠBTC with respect to
                that variable is easy to compute. Indeed
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k^{\prime}}=\frac{\partial}{\partial P_k^{\prime}}\left[\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)\right]+\frac{\partial}{\partial t}\left[\ln V_{\mathrm{BTC}}-\ln Q_{\mathrm{BTC}}\right]\right]=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{\partial}{\partial P_k^{\prime}}\left[\frac{1}{S} \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}\right]=\frac{U_{s_k}}{S}\;\;\;\;`}
              />
              <p className="for-mt-secondary">On the other hand</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}=\frac{\partial}{\partial P_k}\left[\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)\right]+\frac{\partial}{\partial t}\left[\ln V_{\mathrm{BTC}}-\ln Q_{\mathrm{BTC}}\right]\right]=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{\partial}{\partial P_k}\left[\frac{1}{S} \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}\right]=\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{\partial}{\partial P_k}\left[\frac{1}{S}\right] \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \frac{\partial}{\partial P_k}\left[\sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}\right]+\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{\partial}{\partial P_k}\left[\frac{1}{S}\right] \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}+\frac{1}{S} \cdot \frac{\partial}{\partial P_k}\left[\sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}\right]\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Let us compute the derivatives above one by one:
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{\partial}{\partial P_k}\left[\frac{1}{S}\right]=-\frac{1}{S^2} \cdot \frac{\partial}{\partial P_k}\left[\sum_{k=1}^n P_k \cdot U_{s_k}\right]=-\frac{U_{s_k}}{S^2},\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial P_k}\left[\sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}\right]=0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial M_k}\left[\sum_{k=1}^n P_k \cdot U_{s k}^{\prime}\right]=U_{s k}^{\prime}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Substituting these expressions into ∂Π<sub>BTC</sub>/∂P
                <sub>k</sub>, we obtain
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}=\frac{\partial}{\partial P_k}\left[\frac{1}{S}\right] \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \frac{\partial}{\partial P_k}\left[\sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}\right]+\frac{\partial}{\partial P_k}\left[\frac{1}{S}\right] \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}=`}
              />
              <MathComponent
                tex={String.raw`-\frac{U_{s_k}}{S^2} \cdot \sum_{l=1}^n P_l^{\prime} \cdot U_{s_l}+\frac{U_{s_k}^{\prime}}{S}-\frac{U_{s_k}}{S^2} \cdot \sum_{l=1}^n P_l \cdot U_{s_l}^{\prime}=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{U_{s_k}}{S} \cdot\left[\frac{U_{s_k}^{\prime}}{U_{s_k}} \cdot S-\frac{\partial}{\partial t}\left(\sum_{l=1}^n P_l \cdot U_{s_l}\right)\right]=\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{U_{s_k}}{S^2} \cdot S \cdot\left[\frac{U_{s_k}^{\prime}}{U_{s_k}}-\frac{\partial \ln S}{\partial t}\right]=\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{U_{s_k}}{S} \cdot \frac{\partial}{\partial t}\left[\ln U_{s_k}-\ln S\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">or</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}=\frac{U_{s_k}}{S} \cdot \frac{\partial}{\partial t}\left[\ln \left(\frac{U_{s_k}}{S}\right)\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />

              <h2 className="for-mt-primary">With Respect to Absorption</h2>
              <p className="for-mt-secondary">
                In this case as well, we are going to use the expression
              </p>
              <MathComponent
                tex={String.raw`\Pi_{\mathrm{BTC}}=\frac{1}{S} \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}+\frac{\partial}{\partial t}\left[\ln V_{\mathrm{BTC}}-\ln Q_{\mathrm{BTC}}\right]`}
              />
              <p className="for-mt-secondary">Then, obviously,</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial U_{s_k}^{\prime}}=\frac{\partial}{\partial U_{s_k}^{\prime}}\left[\frac{1}{S} \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}\right]=\frac{P_k}{S}`}
              />
              <p className="for-mt-secondary">On the other hand,</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial U_{s_k}}=\frac{\partial}{\partial U_{s_k}}\left[\frac{1}{S} \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}+\frac{\partial}{\partial t}\left[\ln V_{\mathrm{BTC}}-\ln Q_{\mathrm{BTC}}\right]\right]=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{\partial}{\partial U_{s_k}}\left[\frac{1}{S}\right] \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\frac{1}{S} \cdot \frac{\partial}{\partial U_{s_k}}\left[\sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}\right]+\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{\partial}{\partial U_{s_k}}\left[\frac{1}{S}\right] \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}+\frac{1}{S} \cdot \frac{\partial}{\partial U_{s_k}}\left[\sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}\right]\;\;\;\;`}
              />
              <p className="for-mt-secondary">Apparently,</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial U_{s_k}}\left[\frac{1}{S}\right]=-\frac{P_k}{S^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial U_{s_k}}\left[\sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}\right]=P_k^{\prime}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial U_{s_k}}\left[\sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}\right]=0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">Therefore,</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial U_{s_k}}=-\frac{P_k}{S^2} \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}-\frac{P_k}{S^2} \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}+\frac{P_k^{\prime}}{S}=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{P_k}{S} \cdot\left[-\frac{1}{S} \cdot \sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}-\frac{1}{S} \cdot \sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}+\frac{P_k^{\prime}}{P_k}\right]=\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{P_k}{S} \cdot\left[-\frac{1}{S} \cdot\left(\sum_{k=1}^n P_k^{\prime} \cdot U_{s_k}+\sum_{k=1}^n P_k \cdot U_{s_k}^{\prime}\right)+\frac{P_k^{\prime}}{P_k}\right]=\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\frac{P_k}{S} \cdot\left[\frac{P_k^{\prime}}{P_k}-\frac{1}{S} \cdot \frac{\partial}{\partial t}\left(\sum_{k=1}^n P_k \cdot U_{s_k}\right)\right]=\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\frac{P_k}{S} \cdot\left[\frac{P_k^{\prime}}{P_k}-\frac{P_k^{\prime}}{S}\right]=\frac{P_k}{S} \cdot \frac{\partial}{\partial t}\left[\ln P_k-\ln S\right]\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">or</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial U_{s_k}}=\frac{P_k}{S} \cdot \frac{\partial}{\partial t}\left[\ln \left(\frac{P_k}{S}\right)\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />

              <h2 className="for-mt-primary">With Respect to Volume</h2>
              <p className="for-mt-secondary">In this case,</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}=\frac{\partial}{\partial R_k}\left[\frac{\partial}{\partial t} \ln \left(\sum_{k=1}^n P_k \cdot R_k\right)\right]=\frac{\partial}{\partial R_k}\left[\frac{\left(\sum_{k=1}^n W_k \cdot R_k\right)^{\prime}}{\sum_{k=1}^n W_k \cdot R_k}\right]^{\prime}=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial R_k}\left[\frac{1}{R} \cdot \sum_{k=1}^n\left(W_k^{\prime} \cdot R_k+W_k \cdot R_k^{\prime}\right)\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">where</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;W_k=P_k \cdot \alpha_k, \quad R=\sum_{k=1}^n P_k \cdot R_k\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">Therefore,</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}=\frac{\partial}{\partial R_k}\left[\frac{1}{R} \cdot \sum_{k=1}^n\left(W_k^{\prime} \cdot R_k+W_k \cdot R_k^{\prime}\right)\right]=`}
              />
              <MathComponent
                tex={String.raw`\frac{\partial}{\partial R_k}\left[\frac{1}{R}\right] \cdot \sum_{k=1}^n\left(W_k^{\prime} \cdot R_k+W_k \cdot R_k^{\prime}\right)+\frac{1}{R} \cdot \frac{\partial}{\partial R_k}\left[\sum_{k=1}^n\left(W_k^{\prime} \cdot R_k+W_k \cdot R_k^{\prime}\right)\right]`}
              />
              <p className="for-mt-secondary">
                Taking into account the chain rule, we obtain
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial R_k}\left[\frac{1}{R}\right]=-\frac{1}{R^2} \cdot \frac{\partial R}{\partial R_k}=-\frac{W_k}{R^2} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">On the other hand,</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial}{\partial R_k}\left[\sum_{k=1}^n\left(W_k^{\prime} \cdot R_k+W_k \cdot R_k^{\prime}\right)\right]=W_k^{\prime}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                providing us with this final form:
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}=-\frac{W_k}{R^2} \cdot \sum_{k=1}^n\left(W_k^{\prime} \cdot R_k+W_k \cdot R_k^{\prime}\right)+\frac{P_k^{\prime}}{R}=`}
              />
              <MathComponent
                tex={String.raw`\frac{W_k}{R} \cdot\left[-\frac{1}{R} \cdot \sum_{k=1}^n\left(W_k^{\prime} \cdot R_k+W_k \cdot R_k^{\prime}\right)+\frac{W_k^{\prime}}{W_k}\right]=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{W_k}{R} \cdot\left[-\frac{R^{\prime}}{R}+\frac{W_k^{\prime}}{W_k}\right]=\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{W_k}{R} \cdot \frac{\partial}{\partial t}\left[\ln W_k-\ln R\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">or</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}=\frac{W_k}{R} \cdot \frac{\partial}{\partial t}\left[\ln \frac{W_k}{R}\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                It is much easier to establish that
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k^{\prime}}=\frac{\partial}{\partial R_k^{\prime}}\left[\frac{1}{R} \cdot \sum_{k=1}^n\left(W_k^{\prime} \cdot R_k+W_k \cdot R_k^{\prime}\right)\right]=\frac{W_k}{R}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurtherDerivations;
