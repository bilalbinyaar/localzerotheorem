// THIS COMPONENT IS BEING USED
import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const Derivations = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <SideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">Derivations</h1>
              <p className="for-mt-primary">
                We collect the derivative calculations that are used in
                sensitivity analysis with respect to system parameters.
              </p>

              <h2 className="for-mt-primary">
                Derivative of ln P<sub>BTC</sub>
              </h2>
              <p className="for-mt-secondary">
                We now proceed with evaluation of derivatives of the expression
              </p>
              <MathComponent
                tex={String.raw`\ln P_{\mathrm{BTC}}=\ln \alpha+\ln \left(\sum_{k=1}^n P_k \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d`}
              />
              <p className="for-mt-secondary">
                Apparently, ln P<sub>BTC</sub> does not depend on parameter
                derivatives explicitly.
              </p>

              <h3 className="for-mt-secondary">With Respect to α</h3>
              <p className="for-mt-secondary">We easily compute</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \ln P_{\mathrm{BTC}}}{\partial \alpha}=\frac{\partial \ln \alpha}{\partial \alpha}=\frac{1}{\alpha}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />

              <h3 className="for-mt-secondary">
                With Respect to Price and Volume
              </h3>
              <p className="for-mt-secondary">
                It is easy to see that ln P<sub>BTC</sub> is symmetric with
                respect to P<sub>k</sub> and R<sub>k</sub>, leading to
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \ln P_{\mathrm{BTC}}}{\partial P_k}=\frac{1}{P} \frac{\partial}{\partial P_k}\left(P_k \cdot R_k\right)=\frac{R_k}{P}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \ln P_{\mathrm{BTC}}}{\partial R_k}=\frac{1}{P} \frac{\partial}{\partial R_k}\left(P_k \cdot R_k\right)=\frac{P_k}{P}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />

              <h3 className="for-mt-secondary">With Respect to Transactions</h3>
              <p className="for-mt-secondary">
                Due to linear dependence of ln PBTC on T<sup>′</sup>
                <sub>j</sub>, we obtain
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \ln P_{\mathrm{BTC}}}{\partial P}=1\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />

              <h3 className="for-mt-secondary">
                With Respect to Output Parameters
              </h3>
              <p className="for-mt-secondary">
                In the case of output parameters, we easily derive
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \ln P_{\mathrm{BTC}}}{\partial b}=-\frac{\partial \ln b}{\partial b}=-\frac{1}{b}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \ln P_{\mathrm{BTC}}}{\partial h}=-\frac{\partial \ln h}{\partial h}=-\frac{1}{h}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \ln P_{\mathrm{BTC}}}{\partial d}=\frac{\partial \ln d}{\partial d}=\frac{1}{d}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />

              <h2 className="for-mt-secondary">
                Derivative of Π<sub>BTC</sub>
              </h2>
              <p className="for-mt-secondary">We consider the expression</p>
              <MathComponent
                tex={String.raw`\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \alpha+\ln \left(\sum_{k=1}^n P_k \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right]`}
              />

              <h3 className="for-mt-secondary">With Respect to α</h3>
              <p className="for-mt-secondary">
                Apparently, only the first term in the expression for ΠBTC
                depends on α explicitly. Therefore, we get
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial \alpha}=\frac{\partial}{\partial \alpha}\left[\frac{\alpha^{\prime}}{\alpha}\right]=-\frac{\alpha^{\prime}}{\alpha^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">On the other hand,</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial \alpha^{\prime}}=\frac{\partial}{\partial \alpha^{\prime}}\left[\frac{\alpha^{\prime}}{\alpha}\right]=\frac{1}{\alpha}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />

              <h3 className="for-mt-secondary">With Respect to Price</h3>
              <p className="for-mt-secondary">In this case,</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}=\frac{\partial}{\partial P_k}\left[\frac{\sum_{k=1}^n\left(P_k \cdot R_k\right)^{\prime}}{\sum_{k=1}^n P_k R_k}\right]=\frac{\partial}{\partial P_k}\left[\frac{\sum_{k=1}^n\left(P_k^{\prime} \cdot R_k+P_k \cdot R_k^{\prime}\right)}{\sum_{k=1}^n P_k R_k}\right]=`}
              />
              <MathComponent
                tex={String.raw`-\frac{1}{P^2} \cdot \frac{\partial P}{\partial P_k} \cdot \sum_{k=1}^n\left(P_k^{\prime} \cdot R_k+P_k \cdot R_k^{\prime}\right)+\frac{1}{P} \frac{\partial}{\partial P_k}\left[\sum_{k=1}^n\left(P_k^{\prime} \cdot R_k+P_k \cdot R_k^{\prime}\right)\right]=`}
              />
              <MathComponent
                tex={String.raw`-\frac{1}{P^2} \cdot R_k \cdot \sum_{m=1}^n\left(P_m^{\prime} \cdot R_m+P_m \cdot R_m^{\prime}\right)+\frac{1}{P} \cdot R_k=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\frac{R_k}{P}\left[-\sum_{m=1}^n\left(P_m^{\prime} \cdot R_m+P_m \cdot R_m^{\prime}\right)+1\right]=\frac{R_k}{P}\left[1-P^{\prime}\right]\;\;\;\;`}
              />
              <p className="for-mt-secondary">Here,</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;P=\sum_{k=1}^n P_k \cdot R_k \text {. }\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                On the other hand, ΠBTC is a linear function with respect to P
                <sup>′</sup>
                <sub>k</sub> with the linear coefficient
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k^{\prime}}=\frac{\partial}{\partial P_k^{\prime}}\left[\frac{1}{P} \sum_{k=1}^n\left(P_k^{\prime} \cdot R_k+P_k \cdot R_k^{\prime}\right)\right]=\frac{R_k}{P}\;\;\;`}
              />

              <h3 className="for-mt-secondary">With Respect to Volume</h3>
              <p className="for-mt-secondary">
                And in a similar way we compute
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}=\frac{\partial}{\partial R_k}\left[\frac{\sum_{k=1}^n\left(P_k \cdot R_k\right)^{\prime}}{\sum_{k=1}^n P_k R_k}\right]=\frac{\partial}{\partial R_k}\left[\frac{\sum_{k=1}^n\left(P_k^{\prime} \cdot R_k+P_k \cdot R_k^{\prime}\right)}{\sum_{k=1}^n P_k R_k}\right]=`}
              />
              <MathComponent
                tex={String.raw`-\frac{1}{P^2} \cdot \frac{\partial P}{\partial R_k} \cdot \sum_{k=1}^n\left(P_k^{\prime} \cdot R_k+P_k \cdot R_k^{\prime}\right)+\frac{1}{P} \frac{\partial}{\partial R_k}\left[\sum_{k=1}^n\left(P_k^{\prime} \cdot R_k+P_k \cdot R_k^{\prime}\right)\right]=`}
              />
              <MathComponent
                tex={String.raw`-\frac{1}{P^2} \cdot P_k \cdot \sum_{m=1}^n\left(P_m^{\prime} \cdot R_m+P_m \cdot R_m^{\prime}\right)+\frac{1}{P} \cdot P_k=`}
              />
              <MathComponent
                tex={String.raw`\frac{P_k}{P}\left[-\sum_{m=1}^n\left(P_m^{\prime} \cdot R_m+P_m \cdot R_m^{\prime}\right)+1\right]=\frac{P_k}{P}\left[1-P^{\prime}\right]`}
              />
              <p className="for-mt-secondary">
                Similar to the case of P<sup>′</sup>
                <sub>k</sub>, ΠBTC is a linear function with respect to R
                <sup>′</sup>
                <sub>k</sub> as well. At this, the linear coefficient is defined
                as follows:
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k^{\prime}}=\frac{\partial}{\partial R_k^{\prime}}\left[\frac{1}{P} \sum_{k=1}^n\left(P_k^{\prime} \cdot R_k+P_k \cdot R_k^{\prime}\right)\right]=\frac{P_k}{P} .`}
              />

              <h3 className="for-mt-secondary">With Respect to Sum</h3>
              <p className="for-mt-secondary">
                The case of derivative with respect to P is even simpler.
                Indeed,
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P}=\frac{\partial}{\partial P}\left[\frac{P^{\prime}}{P}\right]=-\frac{P^{\prime}}{P^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />

              <h3 className="for-mt-secondary">With Respect to Transactions</h3>
              <p className="for-mt-secondary">In this case,</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial T_j^{\prime}}=\frac{\partial}{\partial T_j^{\prime}}\left[\frac{\partial}{\partial t}\left[\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)\right]\right]=\frac{\partial}{\partial T_j^{\prime}}\left[\frac{\sum_{j=1}^m T_j^{\prime \prime}}{\sum_{j=1}^m T_j^{\prime}}\right]=-\frac{1}{\left(T_j^{\prime}\right)^2} \cdot \sum_{l=1}^m T_l^{\prime \prime} .`}
              />

              <h3 className="for-mt-secondary">
                With Respect to Output Parameters
              </h3>
              <p className="for-mt-secondary">
                We easily evaluate the following partial derivatives:
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial b}=-\frac{\partial}{\partial b}\left[\frac{\partial \ln b}{\partial t}\right]=-\frac{\partial}{\partial b}\left(\frac{b^{\prime}}{b}\right)=\frac{b^{\prime}}{b^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial h}=-\frac{\partial}{\partial h}\left[\frac{\partial \ln h}{\partial t}\right]=\frac{h^{\prime}}{h^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial d}=\frac{\partial}{\partial d}\left[\frac{\partial \ln d}{\partial t}\right]=-\frac{d^{\prime}}{d^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                And for the derivatives we have
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial b^{\prime}}=-\frac{\partial}{\partial b^{\prime}}\left(\frac{b^{\prime}}{b}\right)=-\frac{1}{b}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial h^{\prime}}=-\frac{\partial}{\partial h^{\prime}}\left[\frac{h^{\prime}}{h}\right]=-\frac{1}{h},\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial d^{\prime}}=\frac{\partial}{\partial d^{\prime}}\left[\frac{d^{\prime}}{d}\right]=\frac{1}{d}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Derivations;
