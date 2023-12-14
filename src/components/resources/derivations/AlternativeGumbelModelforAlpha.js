// THIS COMPONENT IS BEING USED
import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const AlternativeGumbelModelforAlpha = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <SideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">Gumbel Model for Alpha</h1>
              <p className="for-mt-secondary">
                For the absorption rate α<sub>k</sub> we consider the following
                model based on the well-known Gumbel distribution:
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\begin{eqnarray}

\alpha_k=p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]

            \end{eqnarray}\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                where p<sub>k</sub> and q<sub>k</sub> are to be estimated
                <br />
                Then, Π<sub>BTC</sub> and ln P<sub>BTC</sub> will obtain the
                following form:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\Pi_{\mathrm{BTC}}= & \frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)+\right. \\
+ & \left.\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right] \\
\ln P_{\mathrm{BTC}} & =\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)+ \\
& +\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d .
            \end{eqnarray}`}
              />

              <h2 className="for-mt-primary">Gumbel Derivations</h2>
              <p className="for-mt-secondary">
                Here we calculate the sensitivity derivatives of
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\Pi_{\mathrm{BTC}} & =\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_{\mathrm{k}} \cdot p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)+\right. \\
& \left.+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right],
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\ln P_{\mathrm{BTC}} & =\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)+ \\
& +\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                with respect to p<sub>k</sub> and q<sub>k</sub>.
                <br />
                Apparently,
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial^2}{\partial t \partial p_k}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial \ln P_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k} \ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                since other terms do not depend on p<sub>k</sub> and q
                <sub>k</sub>.
                <br />
                Taking into account that
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)\right]=\frac{X^{\prime}}{X}
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">where</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X=\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p k-1} \cdot \exp \left[-q_k t^{-p_k}\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\begin{eqnarray}
X^{\prime}=\frac{\partial X}{\partial t}
            \end{eqnarray}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">we have</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
& X^{\prime}=\frac{\partial}{\partial t}\left(\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)= \\
& =\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot\left(\frac{\partial t^{-p_k-1}}{\partial t} \cdot \exp \left[-q_k t^{-p_k}\right]+t^{-p_k-1} \cdot \frac{\partial}{\partial t} \exp \left[-q_k t^{-p_k}\right]\right)= \\
& =\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot\left(\left(-p_k-1\right) \cdot t^{-p_k-2}+t^{-p_k-1} \cdot\left[p_k \cdot q_k \cdot t^{-p_k-1}\right]\right) \cdot \exp \left[-q_k t^{-p_k}\right]= \\
& =\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right] . \\
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Thus, finally</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X^{\prime}=\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Coming back to the sensitivity problem, let us now calculate the
                sensitivity derivative
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k}\left[\frac{X^{\prime}}{X}\right]=\frac{\partial X^{\prime}}{\partial p_k} \cdot \frac{1}{X}+X^{\prime} \cdot \frac{\partial}{\partial p_k}\left[\frac{1}{X}\right]=\frac{\partial X^{\prime}}{\partial p_k} \cdot \frac{1}{X}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial p_k} .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Evidently,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X^{\prime}}{\partial p_k}=P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left(p_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Applying the multiplication derivative rule, we get
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial}{\partial p_k}\left(p_k \cdot\right. & \left.\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]\right)= \\
& =\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]+ \\
& +p_k \cdot \frac{\partial}{\partial p_k}\left[\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right)\right] \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]+ \\
& +p_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot \frac{\partial t^{-p_k-2}}{\partial p_k} \cdot \exp \left[-q_k t^{-p_k}\right]+ \\
& +p_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \frac{\partial \exp \left[-q_k t^{-p_k}\right]}{\partial p_k}= \\
& =\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]+ \\
& +p_k \cdot\left(-1+q_k \cdot t^{-p_k}-p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]- \\
& -p_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \ln t \cdot \exp \left[-q_k t^{-p_k}\right]+ \\
& +p_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot q_k \cdot t^{-p_k} \cdot \ln t

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">or</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial}{\partial p_k}\left(p_k \cdot\right. & \left.\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]\right)= \\
& =t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left[\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right)+\right. \\
& +p_k \cdot\left(-1+q_k \cdot t^{-p_k}-p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)- \\
& -p_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right)+ \\
& \left.+p_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot q_k \cdot t^{-p_k} \cdot \ln t\right]= \\
& =t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left[p_k \cdot\left(-1+q_k \cdot t^{-p_k}-p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)+\right. \\
& \left.+\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot\left(1-p_k+p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Thus, combining all separate derivatives, we will obtain
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X^{\prime}}{\partial p_k}=P_k \cdot R_k \cdot q_k \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left[p_k \cdot\left(-1+q_k \cdot t^{-p_k}-p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)+\right. \\
\left.+\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot\left(1-p_k+p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Now, compute the following derivative:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X}{\partial p_k} & =P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left(p_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]\right)= \\
& =P_k \cdot R_k \cdot q_k \cdot\left(t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right]-p_k \cdot t^{-p_k-1} \cdot \ln t \cdot \exp \left[-q_k t^{-p_k}\right]+\right. \\
& \left.+p_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)= \\
& =P_k \cdot R_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left(1-p_k \cdot \ln t+p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)= \\
& =P_k \cdot R_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left(1-p_k \cdot \ln t\left[1-q_k \cdot t^{-p_k}\right]\right)

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Substituting the above expressions into the sensitivity
                derivative, we finally obtain
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k} & =\frac{P_k \cdot R_k \cdot q_k}{X} \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left[p_k \cdot\left(-1+q_k \cdot t^{-p_k}-p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)+\right. \\
& \left.+\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot\left(1-p_k+p_k \cdot q_k \cdot t^{-p_k} \cdot \ln t\right)\right]- \\
& -\frac{X^{\prime}}{X^2} \cdot P_k \cdot R_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left(1-p_k \cdot \ln t\left[1-q_k \cdot t^{-p k}\right]\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Let us now proceed with calculating the derivative of ΠBTC with
                respect to qk. To that aim, let us first compute the analogous
                derivatives
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X}{\partial q_k} & =P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1} \cdot \frac{\partial}{\partial q_k}\left(q_k \cdot \exp \left[-q_k t^{-p_k}\right]\right)= \\
& =P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1} \cdot\left(\exp \left[-q_k t^{-p_k}\right]+\exp \left[-q_k t^{-p_k}\right] \cdot\left[-t^{-p_k}\right]\right)= \\
& =P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left(1-t^{-p_k}\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X^{\prime}}{\partial q_k} & =P_k \cdot R_k \cdot p_k \cdot t^{-p_k-2} \cdot \frac{\partial}{\partial q_k}\left(q_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot \exp \left[-q_k t^{-p_k}\right]\right)= \\
& =P_k \cdot R_k \cdot p_k \cdot t^{-p_k-2} \cdot\left(\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot \exp \left[-q_k t^{-p_k}\right]+\right. \\
& \left.+q_k \cdot p_k \cdot t^{-p_k} \cdot \exp \left[-q_k t^{-p_k}\right]-q_k \cdot\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot \exp \left[-q_k t^{-p_k}\right] \cdot t^{-p_k}\right)= \\
& =P_k \cdot R_k \cdot p_k \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]\left(\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot\left(1-t^{-p_k}\right)+\right. \\
& \left.+q_k \cdot p_k \cdot t^{-p_k}\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Similarly, in the case of q<sub>k</sub>, we have
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial q_k} & =\frac{\partial}{\partial q_k}\left[\frac{X^{\prime}}{X}\right]=\frac{\partial X^{\prime}}{\partial q_k} \cdot \frac{1}{X}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial q_k}= \\
& =\frac{P_k \cdot R_k \cdot p_k}{X} \cdot t^{-p_k-2} \cdot \exp \left[-q_k t^{-p_k}\right]\left(\left(-p_k-1+p_k \cdot q_k \cdot t^{-p_k}\right) \cdot\left(1-t^{-p_k}\right)+\right. \\
& \left.+q_k \cdot p_k \cdot t^{-p_k}\right)-\frac{X^{\prime}}{X^2} \cdot P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left(1-t^{-p_k}\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Let us now proceed to the sensitivity derivatives calculations
                for ln P<sub>BTC</sub>. Apparently,
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial \ln P_{\mathrm{BTC}}}{\partial p_k} & =\frac{\partial \ln X}{\partial p_k}=\frac{1}{X} \cdot \frac{\partial X}{\partial p_k}= \\
& =\frac{1}{X} \cdot P_k \cdot R_k \cdot q_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left(1-p_k \cdot \ln t\left[1-q_k \cdot t^{-p_k}\right]\right)

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Similarly</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial q_k} & =\frac{\partial \ln X}{\partial q_k}=\frac{1}{X} \cdot \frac{\partial X}{\partial q_k}= \\
& =\frac{1}{X} \cdot P_k \cdot R_k \cdot p_k \cdot t^{-p_k-1} \cdot \exp \left[-q_k t^{-p_k}\right] \cdot\left(1-t^{-p_k}\right) .
            \end{eqnarray}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeGumbelModelforAlpha;
