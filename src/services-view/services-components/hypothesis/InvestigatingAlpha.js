// THIS COMPONENT IS BEING USED
import React from 'react';
import '../../../components/resources/ResourcesTextual.css';
import P1Day from '../../../assets/investing-alpha/Pics_1.png';
import P1Night from '../../../assets/investing-alpha/Pics_1-white.png';
import P2Day from '../../../assets/investing-alpha/Pics_2.png';
import P2Night from '../../../assets/investing-alpha/Pics_2-white.png';
import P3Day from '../../../assets/investing-alpha/Pics_3.png';
import P3Night from '../../../assets/investing-alpha/Pics_3-white.png';
import P4Day from '../../../assets/investing-alpha/Pics_4.png';
import P4Night from '../../../assets/investing-alpha/Pics_4-white.png';
import { useStateContext } from '../../../ContextProvider';
import { MathComponent } from 'mathjax-react';
import ServicesSideBar from '../ServicesSideBar';

const InvestigatingAlpha = () => {
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
              <h1 className="res-det-heading">Investigating Alpha</h1>
              <p className="for-mt-primary">
                In this section, we are going to investigate the time-dependent
                behavior of the absorption rate (α) in two principal cases: when
                the absorption rate is assumed to be the same for all markets
                and when it is unique for each market.
              </p>

              <h2 className="for-mt-primary">
                The Case of Market Specific Alpha (α<sub>k</sub>)
              </h2>
              <p className="for-mt-secondary">
                In this case, we derive a single equation for all α<sub>k</sub>:
              </p>
              <MathComponent
                tex={String.raw`\sum_{k=1}^n P_k \cdot \alpha_k \cdot R_k=\frac{P_{\mathrm{BTC}} \cdot b \cdot h}{d \cdot \sum_{j=1}^m T_j^{\prime}} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;(10)`}
              />
              <p className="for-mt-secondary">
                Note that (10) is a single functional equation with respect to n
                unknowns α<sub>1</sub>, α<sub>2</sub>, . . ., α<sub>n</sub>.
                Apparently, unlike the previous case, it can not be solved
                exactly for continuous t. Therefore, we need to consider (10) at
                discrete values of t where the data measurements are made.
                <br />
                In order to describe the algorithm of determination of α
                <sub>1</sub>, α<sub>2</sub>, . . ., α<sub>n</sub>, let us denote
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;F\left(\alpha_1, \alpha_2, \ldots, \alpha_n ; t\right)=\sum_{k=1}^n P_k \cdot \alpha_k \cdot R_k\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;S(t)=\frac{P_{\mathrm{BTC}} \cdot b \cdot h}{d \cdot \sum_{j=1}^m T_j^{\prime}}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">Then, (10) can be written as</p>
              <MathComponent
                tex={String.raw`F\left(\alpha_1, \alpha_2, \ldots, \alpha_n ; t\right)=S(t) \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;(11)`}
              />
              <p className="for-mt-secondary">
                It is important to recognize that in (11), α<sub>1</sub>, α
                <sub>2</sub>, . . ., α<sub>n</sub>, P<sub>BTC</sub>, b, h, d and
                T<sub>j</sub>
                <sup>'</sup>
                are all functions of time.
                <br />
                Now assume that the raw data measurements have been made at
                given instances t<sub>i</sub>, i = 1, 2, . . . , N. For example,
                when data are measured on daily basis, then t<sub>1</sub>, t
                <sub>2</sub>, . . ., t<sub>N</sub> represent days. Evaluating
                both sides of (11) at instances t<sub>i</sub>, i = 1, 2, . . . ,
                N, we will have
              </p>
              <MathComponent
                tex={String.raw`F\left(\alpha_1\left(t_1\right), \alpha_2\left(t_1\right), \ldots, \alpha_n\left(t_1\right) ; t_1\right)=S\left(t_1\right),`}
              />
              <MathComponent
                tex={String.raw`F\left(\alpha_1\left(t_2\right), \alpha_2\left(t_2\right), \ldots, \alpha_n\left(t_2\right) ; t_2\right)=S\left(t_2\right),`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;.\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;.\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;.\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`F\left(\alpha_1\left(t_N\right), \alpha_2\left(t_N\right), \ldots, \alpha_n\left(t_N\right) ; t_N\right)=S\left(t_N\right) \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;(12)`}
              />
              <p className="for-mt-secondary">
                Note that (12) is linear with respect to each α<sub>k</sub> (t
                <sub>i</sub>), k = 1, 2, . . . , n, i = 1, 2, . . . , N.
                Nonetheless, (12) contains N equations with respect to n · N
                unknowns. At this, N ≫ n and the system is under-determined.
                Therefore, direct methods can not be applied for solving (12).
                On the other hand, in order to determined unknowns α<sub>k</sub>{' '}
                (t<sub>i</sub>), k = 1, 2, . . . , n, i = 1, 2, . . . , N, we
                can apply either efficient numerical methods of linear
                programming, choosing, e.g., P<sub>BTC</sub> as a cost function,
                or we can solve the equivalent problem of numerical minimization
              </p>
              <MathComponent
                tex={String.raw`\left\|F\left(\alpha_1\left(t_i\right), \alpha_2\left(t_i\right), \ldots, \alpha_n\left(t_i\right) ; t_i\right)-S\left(t_i\right)\right\| \rightarrow \min _{0 \leq \alpha_k\left(t_i\right) \leq 1}, \quad k=1,2, \ldots, n \quad i=1,2, \ldots, N`}
              />
              <p className="for-mt-secondary">
                Here, ||·|| denotes an appropriate norm. In this case, it can be
                the l<sup>2</sup>-norm. Then, the problem formulation will be:
                determine the solution to the following numerical minimization
                problem:
              </p>
              <MathComponent
                tex={String.raw`\left|F\left(\alpha_1\left(t_i\right), \alpha_2\left(t_i\right), \ldots, \alpha_n\left(t_i\right) ; t_i\right)-S\left(t_i\right)\right|^2 \rightarrow \min _{0 \leq \alpha_k\left(t_i\right) \leq 1}, \quad k=1,2, \ldots, n \quad i=1,2, \ldots, N`}
              />

              <h2 className="for-mt-primary">The Case of Single Alpha (α)</h2>
              <p className="for-mt-secondary">
                In the case of single absorption, consideration of particular
                models leads to the following expression for Π<sub>BTC</sub>:
              </p>
              <MathComponent
                tex={String.raw`\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n \alpha \cdot P_k \cdot R_k\right)+\ln \left(\frac{1}{n} \sum_{j=1}^n T_j^{\prime}\right)-\ln b-\ln h+\ln d\right]=`}
              />
              <MathComponent
                tex={String.raw`\frac{\partial}{\partial t}\left[\ln \left(\alpha \cdot \sum_{k=1}^n P_k \cdot R_k\right)+\ln \left(\frac{1}{n} \sum_{j=1}^n T_j^{\prime}\right)-\ln b-\ln h+\ln d\right]=`}
              />
              <MathComponent
                tex={String.raw`\frac{\partial}{\partial t}\left[\ln \alpha+\ln \left(\sum_{k=1}^n P_k \cdot R_k\right)+\ln \left(\frac{1}{n} \sum_{j=1}^n T_j^{\prime}\right)-\ln b-\ln h+\ln d\right] .`}
              />
              <p className="for-mt-secondary">
                Similarly, in this case, we have
              </p>
              <MathComponent
                tex={String.raw`\ln P_{\mathrm{BTC}}=\ln \alpha+\ln \left(\sum_{k=1}^n P_k \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d`}
              />

              <h2 className="for-mt-primary">Numerical Analysis</h2>
              <p className="for-mt-secondary">
                In this section, we are going to consider the determination of
                single and individual absorption rates. To this end, we are
                going to consider a specific database of 11 markets, i.e., n =
                11. Based on the database structure, the time variable has the
                following form:
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;t_i=7+\frac{i}{365}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                with N = 1592 data points. In this particular case, m = 1, so
                that there is only T<sub>1</sub>
                <sup>′</sup>
                <br />
                In this case, we have a system of 1592 equations with respect to
                11·1592 = 17512 unknowns, which are computed by minimizing the l
                <sup>1</sup>-norm of the residue:
              </p>
              <MathComponent
                tex={String.raw`Err\left(t_i\right)=\left|F\left(\alpha_1\left(t_i\right), \alpha_2\left(t_i\right), \ldots, \alpha_n\left(t_i\right) ; t_i\right)-S\left(t_i\right)\right| \rightarrow \min _{0 \leq \alpha_k\left(t_i\right) \leq 1},`}
              />
              <p className="for-mt-secondary">
                with N = 1592 data points. In this particular case, m = 1, so
                that there is only T<sub>1</sub>
                <sup>′</sup>
                <br />
                with k = 1, 2, . . . , 11, and i = 1, 2, . . . , 1592.
                <br />
                The numerical values of α<sub>k</sub> (t<sub>i</sub>) are
                plotted in Figures 1 and 2 below. The corresponding error
                function Err is plotted in Figure 11, as well.
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
                  Figure 1: Dependence of α<sub>1</sub>, . . ., α<sub>6</sub> on
                  t according to (12)
                </p>
              </div>
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
                  Figure 2: Dependence of α<sub>7</sub>, . . ., α<sub>11</sub>{' '}
                  and Err on t according to (12)
                </p>
              </div>
              <p className="for-mt-secondary">
                Thus, the numerical analysis in the above particular case shows
                similar behavior and range of values for α<sub>1</sub>, α
                <sub>2</sub>, . . ., α<sub>11</sub> making the dependence of the
                absorption rate on a specific market very weak. This apparently
                suggests that, in general, for n markets, we can make an
                assumption that
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\alpha_1 \approx \alpha_2 \approx \ldots \approx \alpha_n:=\alpha\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                which will simplify the rigorous analysis significantly.
                <br />
                Our aim now is to show that the case of individual absorption
                rates can be, to some extent, approximated by a single
                absorption rate for all markets. In other words, we are going to
                assume that the absorption rate introduced in (9) does not
                depend on the subscript k. Then,
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\sum_{k=1}^n \alpha_k \cdot P_k \cdot R_k=\alpha \cdot \sum_{k=1}^n P_k \cdot R_k,\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                where P<sub>k</sub> and R<sub>k</sub> are given, αk are
                determined in the previous section and α is unknown determined
                as follows:
              </p>
              <MathComponent
                tex={String.raw`\alpha=\frac{\sum_{k=1}^n \alpha_k \cdot P_k \cdot R_k}{\sum_{k=1}^n P_k \cdot R_k} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;(13)`}
              />
              <p className="for-mt-secondary">
                Figure 3 below shows the dependence of α and ln α on t.
              </p>
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
                  Figure 3: Dependence of α and ln α on t according to (13)
                </p>
              </div>
              <p className="for-mt-secondary">
                In order to estimate the error of approximation by single
                absorption rate, we measure the error
              </p>
              <MathComponent
                tex={String.raw`\mathrm{MSE}=\frac{1}{2}\left(\alpha \sum_{k=1}^n P_k \cdot R_k-S\right)^2 \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;(14)`}
              />
              <div className="for-mt-primary">
                {theme === 'dark-theme' ? (
                  <div className="img-doc">
                    <img src={P4Night} alt="p1" />
                  </div>
                ) : (
                  <div className="img-doc">
                    <img src={P4Day} alt="p1" />
                  </div>
                )}
                <p className="for-mt-secondary for-text-align">
                  Figure 4: Dependence of MSE (14) with respect to t
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigatingAlpha;
