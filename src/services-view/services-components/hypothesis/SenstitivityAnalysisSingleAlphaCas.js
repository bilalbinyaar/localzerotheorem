// THIS COMPONENT IS BEING USED
import React from 'react';
import '../../../components/resources/ResourcesTextual.css';
import P1Day from '../../../assets/single-alpha/7-01.png';
import P1Night from '../../../assets/single-alpha/7-01-white.png';
import P2Day from '../../../assets/single-alpha/7-03.png';
import P2Night from '../../../assets/single-alpha/7-03-white.png';
import P3Day from '../../../assets/single-alpha/7-02.png';
import P3Night from '../../../assets/single-alpha/7-02-white.png';
import { useStateContext } from '../../../ContextProvider';
import { MathComponent } from 'mathjax-react';
import ServicesSideBar from '../ServicesSideBar';

const SenstitivityAnalysisSingleAlphaCas = () => {
  const { theme } = useStateContext();

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
                Sensitivity Analysis - Single Alpha Case
              </h1>
              <p className="for-mt-primary">
                In this section, we consider the sensitivity analysis in the
                single α , i.e., we assume that the absorption rate is the same
                for all markets. Here we will use actual raw market data to
                determine relational effects.
                <br />
                In the case of single absorption, consideration of particular
                models leads to the following expression for Π<sub>BTC</sub>:
              </p>
              <MathComponent
                tex={String.raw`\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \alpha+\ln \left(\sum_{k=1}^n P_k \cdot R_k\right)+\ln \left(\frac{1}{n} \sum_{j=1}^n T_j^{\prime}\right)-\ln b-\ln h+\ln d\right]`}
              />
              <p className="for-mt-secondary">Therefore, we have</p>
              <MathComponent
                tex={String.raw`\ln P_{\mathrm{BTC}}=\ln \alpha+\ln \left(\sum_{k=1}^n P_k \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d`}
              />

              <h2 className="for-mt-primary">
                Sensitivity of ln P<sub>BTC</sub>
              </h2>
              <p className="for-mt-secondary">
                Using the simple formulas obtained in Appendix 1, we come to the
                following conclusions.
              </p>
              <p className="for-mt-secondary margin-left">
                1. ln P<sub>BTC</sub> is an increasing function of α for all
                values of t. See Figure 5 (a).
                <br />
                2. ln P<sub>BTC</sub> is an increasing function of Pk and Rk for
                all values of k and t.
                <br />
                3. ln P<sub>BTC</sub> is always an increasing function of P. See
                Figure 5 (b).
                <br />
                4. ln P<sub>BTC</sub> is an increasing function of T′j for all
                values of j and t. See Figure 5 (c).
                <br />
                5. ln P<sub>BTC</sub> is a decreasing function of b and h, and
                it is an increasing function of d for all values of t. See
                Figure 5 (d-f).
              </p>
              <div className="for-mt-primary">
                {theme === 'dark-theme' ? (
                  <div className="img-doc">
                    <img src={P1Night} alt="p1" />
                  </div>
                ) : (
                  <div className="img-doc">
                    <img src={P1Day} alt="p1" />
                  </div>
                )}
                <p className="for-mt-secondary for-text-align">
                  Figure 5: Sensitivity plots of ln P<sub>BTC</sub> with respect
                  to system parameters
                </p>
              </div>
              <div className="for-mt-primary">
                {theme === 'dark-theme' ? (
                  <div className="img-doc">
                    <img src={P3Night} alt="p1" />
                  </div>
                ) : (
                  <div className="img-doc">
                    <img src={P3Day} alt="p1" />
                  </div>
                )}
                <p className="for-mt-secondary for-text-align">
                  Figure 6: Sensitivity plots of ln P<sub>BTC</sub> with respect
                  to sum of P<sub>k</sub> (a) and R<sub>k</sub> (b)
                </p>
              </div>

              <h2 className="for-mt-primary">
                Sensitivity of Π<sub>BTC</sub>
              </h2>
              <h3 className="for-mt-secondary">
                Sensitivity with Respect to Absorption Rate
              </h3>
              <p className="for-mt-secondary">In this case,</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial \alpha}=-\frac{\alpha^{\prime}}{\alpha^2},\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                leading us to the conclusion that when α is an increasing
                function of t, i.e., when α′ &gt; 0, ΠBTC is a decreasing
                function of α. And, when α is a decreasing function of t, i.e.,
                when α′ &lt; 0, Π<sub>BTC</sub> is an increasing function of α.
                <br />
                On the other hand,
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial \alpha^{\prime}}=\frac{1}{\alpha}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Since α &gt; 0 for all t, we conclude that Π<sub>BTC</sub> is an
                increasing function of α′ for all values of t.
              </p>

              <h3 className="for-mt-secondary">
                Sensitivity with Respect to Price and Asset Volume
              </h3>
              <p className="for-mt-secondary">
                Due to symmetry of Π<sub>BTC</sub> with respect to P<sub>k</sub>{' '}
                and R<sub>k</sub>, we derive similar formulas for
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}=\frac{R_k}{P}\left[1-P^{\prime}\right]\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}=\frac{P_k}{P}\left[1-P^{\prime}\right],\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">where</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;P=\sum_{m=1}^n P_m \cdot R_m\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Apparently, the sign of both ∂Π<sub>BTC</sub>/∂P<sub>k</sub> and
                ∂Π<sub>BTC</sub>/∂R<sub>k</sub> depends on the sign of the
                expression 1 − P′. More specifically, when 1 − P′ &gt; 0, we get
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}>0 \text { and } \frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}>0 \text {, }\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                meaning that Π<sub>BTC</sub> is an increasing function of P
                <sub>k</sub> and R<sub>k</sub> simultaneously. On the other
                hand, 1 − P′ &lt; 0 leads to
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}<0 \text { and } \frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}<0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                meaning that Π<sub>BTC</sub> is a decreasing function of P
                <sub>k</sub> and R<sub>k</sub> simultaneously.
                <br />
                Note that Π<sub>BTC</sub> is symmetric also with respect to P
                <sup>′</sup>
                <sub>k</sub> and R<sup>′</sup>
                <sub>k</sub> with
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k^{\prime}}=\frac{R_k}{P}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k^{\prime}}=\frac{P_k}{P}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Apparently, both expressions are positive for all values of t
                leading to the conclusion that Π<sub>BTC</sub> is an increasing
                function of both P<sup>′</sup>
                <sub>k</sub> and R<sup>′</sup>
                <sub>k</sub>.
              </p>

              <h3 className="for-mt-secondary">
                Sensitivity with Respect to Sum
              </h3>
              <p className="for-mt-secondary">On the basis of the expression</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P}=-\frac{P^{\prime}}{P^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                we conclude that when P is an increasing (decreasing) function
                of time, i.e., P′ &gt; 0 (P′ &lt; 0, respectively), then Π
                <sub>BTC</sub> is a decreasing (increasing) function of P.
              </p>

              <h3 className="for-mt-secondary">
                Sensitivity with Respect to Transactions
              </h3>
              <p className="for-mt-secondary">
                The sensitivity of Π<sub>BTC</sub> with respect to transactions
                is more complicated to explore, since the corresponding
                derivative is given by
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial T_j^{\prime}}=-\frac{1}{\left(T_j^{\prime}\right)^2} \cdot \sum_{l=1}^m T_l^{\prime \prime}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Therefore, taking into account that (T<sup>′</sup>
                <sub>j</sub>)<sup>2</sup> is positive for all values of t, we
                come to the conclusion that when
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\sum_{l=1}^m T_l^{\prime \prime}<0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                then Π<sub>BTC</sub> is an increasing function of T<sup>′</sup>
                <sub>j</sub>, and when
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\sum_{l=1}^m T_l^{\prime \prime}>0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                evidently, Π<sub>BTC</sub> is a decreasing function of T
                <sup>′</sup>
                <sub>j</sub>.
              </p>

              <h3 className="for-mt-secondary">
                Sensitivity with Respect to Output Parameters
              </h3>
              <p className="for-mt-secondary">In Appendix 1 we derive that</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial b}=\frac{b^{\prime}}{b^2}, \quad \frac{\partial \Pi_{\mathrm{BTC}}}{\partial h}=\frac{h^{\prime}}{h^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial d}=-\frac{d^{\prime}}{d^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">And for the derivatives</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial b^{\prime}}=-\frac{1}{b}, \quad \frac{\partial \Pi_{\mathrm{BTC}}}{\partial h^{\prime}}=-\frac{1}{h}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial d^{\prime}}=\frac{1}{d}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Note that b &gt; 0, h &gt; 0 and d &gt; 0 for all values of t
                <br />
                Therefore, we straightforwardly conclude
              </p>
              <p className="for-mt-secondary margin-left">
                1. When b′ &gt; 0 (b′ &lt; 0), i.e., b is an increasing
                (decreasing) function of t, then ΠBTC is an increasing
                (decreasing) function of b.
                <br />
                2. When h′ &gt; 0 (h′ &lt; 0), i.e., h is an increasing
                (decreasing) function of t, then ΠBTC is an increasing
                (decreasing) function of h.
                <br />
                3. When d′ &gt; 0 (d′ &lt; 0), i.e., d is a decreasing
                (increasing) function of t, then ΠBTC is a decreasing
                (increasing) function of d.
                <br />
                4. ΠBTC is a decreasing function of b′ and h′ and it is an
                increasing function of d′ for all values of t.
              </p>

              <h3 className="for-mt-secondary">
                Numerical Analysis for Particular Data
              </h3>
              <p className="for-mt-secondary">
                In this section, we are going to verify the conclusions obtained
                in the previous section on a particular database. To this aim,
                in Figure 7, we plot the dependence of corresponding derivative
                of ΠBTC with respect to sensitivity parameter.
                <br />
                Specifically, Figure 7 (a) shows that when α increases, α′
                becomes negative. Therefore, since
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial \alpha}=-\frac{\alpha^{\prime}}{\alpha^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                we conclude that for large α, ΠBTC is an increasing function of
                α.
                <br />
                An important conclusion is based on Figure 7 (b). Evidently, 1
                −P′ becomes positive when P increases. Therefore, taking into
                account that
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P_k}=\frac{R_k}{P} \cdot\left(1-P^{\prime}\right), \quad \frac{\partial \Pi_{\mathrm{BTC}}}{\partial R_k}=\frac{P_k}{P} \cdot\left(1-P^{\prime}\right),\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                we obtain that Π<sub>BTC</sub> increases with respect to P
                <sub>k</sub> and R<sub>k</sub> for all k when P increases
                <br />
                Similar behavior is observed for P as shown on Figure 7 (c).
                Since P′ becomes negative for large values of P, and taking into
                account that
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial P}=-\frac{P^{\prime}}{P^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                we conclude that for large values of P, ΠBTC is an increasing
                function of P.
                <br />
                Figure 7 (c) shows similar behavior for T<sup>′</sup>
                <sub>1</sub> leading to the conclusion that for large values of
                T<sup>′</sup>
                <sub>1</sub>, Π<sub>BTC</sub> is an increasing function of T
                <sup>′</sup>
                <sub>1</sub>.
                <br />
                On the other hand, since
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial d}=-\frac{d^{\prime}}{d^2}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                and as Figure 7 (e) shows, d′ is positive for large values of d,
                we come to the conclusion that for large values of d, Π
                <sub>BTC</sub> is an increasing function of d.
              </p>
              <div className="for-mt-primary">
                {theme === 'dark-theme' ? (
                  <div className="img-doc">
                    <img src={P2Night} alt="p1" />
                  </div>
                ) : (
                  <div className="img-doc">
                    <img src={P2Day} alt="p1" />
                  </div>
                )}
                <p className="for-mt-secondary for-text-align">
                  Figure 7: Sensitivity plots of α′(a), 1 − P′(b), P′(c),
                  T′1(d), d′(e) and h′(f)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenstitivityAnalysisSingleAlphaCas;
