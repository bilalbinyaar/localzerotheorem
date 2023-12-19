import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const FrechetDerivation = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <SideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">Frechet Model for Alpha</h1>
              <p className="for-mt-secondary">
                For the absorption rate α<sub>k</sub> we consider the following
                model based on the well-known Frechet distribution:
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\begin{eqnarray}
\alpha_k=p_k \cdot q_k \cdot t^{-p_k-1}
            \end{eqnarray}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                where p<sub>k</sub> and q<sub>k</sub> are to be estimated
                <br />
                Then, Π<sub>BTC</sub> will obtain the following form:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1}\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right], \\
\ln P_{\mathrm{BTC}}=\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1}\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d .
            \end{eqnarray}`}
              />

              <h2 className="for-mt-primary">Frechet Derivations</h2>
              <p className="for-mt-secondary">
                Here we calculate the sensitivity derivatives of
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1}\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right],
            \end{eqnarray}`}
              />

              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\ln P_{\mathrm{BTC}}=\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p k-1}\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                with respect to p<sub>k</sub> and q<sub>k</sub>.
                <br />
                Apparently,
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial^2}{\partial t \partial p_k}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1}\right)\right]
            \end{eqnarray}`}
              />

              <p className="for-mt-secondary">and</p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k} \ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1}\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                since other terms do not depend on p<sub>k</sub> and q
                <sub>k</sub>.
                <br />
                Taking into account that
              </p>

              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\begin{eqnarray}
\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1}\right)\right]=\frac{X^{\prime}}{X}
            \end{eqnarray}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">where</p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}

X=\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1}, \quad X^{\prime}=\frac{\partial X}{\partial t}



            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">we have</p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
X^{\prime}=\frac{\partial}{\partial t}\left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1}\right)=-\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot\left(p_k+1\right) \cdot q_k \cdot t^{-p_k-2} .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Let us now calculate the sensitivity derivative
              </p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k}\left[\frac{X^{\prime}}{X}\right]=\frac{\partial X^{\prime}}{\partial p_k} \cdot \frac{1}{X}+X^{\prime} \cdot \frac{\partial}{\partial p_k}\left[\frac{1}{X}\right]=\frac{\partial X^{\prime}}{\partial p_k} \cdot \frac{1}{X}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial p_k}
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Evidently,</p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X^{\prime}}{\partial p_k}=-P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left(p_k \cdot\left(p_k+1\right) \cdot t^{-p k-2}\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Applying the multiplication derivative rule, we get
              </p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial}{\partial p_k}\left(p_k \cdot\left(p_k+1\right) \cdot t^{-p_k-2}\right)=\left(2 p_k+1\right) \cdot t^{-p_k-2}-p_k \cdot\left(p_k+1\right) \cdot t^{-p_k-2} \cdot \ln t= \\
=t^{-p_k-2} \cdot\left[2 p_k+1-p_k \cdot\left(p_k+1\right) \cdot \ln t\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Thus,</p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X^{\prime}}{\partial p_k}=-P_k \cdot R_k \cdot q_k \cdot t^{p_k{ }^2} \cdot\left[2 p_k+1-p_k \cdot\left(p_k+1\right) \cdot \ln t\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">On the other hand</p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X}{\partial p_k} & =P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left(p_k \cdot t^{-p_k-1}\right)= \\
& =P_k \cdot R_k \cdot q_k \cdot\left[t^{-p_k-1}-p_k \cdot t^{-p k-1} \cdot \ln t\right]= \\
& =P_k \cdot R_k \cdot q_k \cdot t^{-p_k-1} \cdot\left[1-p_k \cdot \ln t\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Substituting the above expressions into the sensitivity
                derivative, we finally obtain
              </p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k} & =-\frac{P_k \cdot R_k \cdot q_k}{X} \cdot t^{-p_k-2} \cdot\left[2 p_k+1-p_k \cdot\left(p_k+1\right) \cdot \ln t\right]- \\
& -\frac{X^{\prime}}{X^2} \cdot P_k \cdot R_k \cdot q_k \cdot t^{-p_k-1} \cdot\left[1-p_k \cdot \ln t\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Let us now proceed with calculating the derivative of Π
                <sub>BTC</sub> with respect to qk. To that aim, notice that X
                and X′ are linear in qk leading to
              </p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X}{\partial q_k}=P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1} \cdot \frac{\partial}{\partial q_k}\left(q_k\right)=P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1}
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X^{\prime}}{\partial q_k}=-P_k \cdot R_k \cdot t^{-p_k-2} \cdot\left[2 p_k+1-p_k \cdot\left(p_k+1\right) \cdot \ln t\right]

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Similarly, in the case of q<sub>k</sub>, we have
              </p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial q_k} & =-\frac{P_k \cdot R_k}{X} \cdot t^{-p_k-2} \cdot\left[2 p_k+1-p_k \cdot\left(p_k+1\right) \cdot \ln t\right]- \\
& -\frac{X^{\prime}}{X^2} \cdot P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1} .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Let us now proceed to the sensitivity derivatives calculations
                for ln P<sub>BTC</sub>. Apparently
              </p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial \ln X}{\partial p_k}=\frac{1}{X} \cdot \frac{\partial X}{\partial p_k}=\frac{1}{X} \cdot P_k \cdot R_k \cdot q_k \cdot t^{-p_k-1} \cdot\left[1-p_k \cdot \ln t\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Similarly,</p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial q_k}=\frac{\partial \ln X}{\partial q_k}=\frac{1}{X} \cdot \frac{\partial X}{\partial q_k}=\frac{1}{X} \cdot P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1}
            \end{eqnarray}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrechetDerivation;
