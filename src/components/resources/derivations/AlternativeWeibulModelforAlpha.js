import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const AlternativeWeibulModelforAlpha = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <SideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">Weibull Model for Alpha</h1>
              <p className="for-mt-secondary">
                For the absorption rate α<sub>k</sub> we consider the following
                model based on the well-known Weibull distribution:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\alpha_k=\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right],
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                where p<sub>k</sub> and q<sub>k</sub> are to be estimated
                <br />
                Then, Π<sub>BTC</sub> and ln P<sub>BTC</sub> will obtain the
                following form:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\Pi_{\mathrm{BTC}}= & \frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)+\right. \\
+ & \left.\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right] \\
\ln P_{\mathrm{BTC}} & =\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p k}\right]\right)+ \\
& +\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d
            \end{eqnarray}`}
              />

              <h2 className="for-mt-primary">Weibull Derivations</h2>
              <p className="for-mt-secondary">
                Here we calculate the sensitivity derivatives of
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\Pi_{\mathrm{BTC}}= & \frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)+\right. \\
+ & \left.\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right] \\
\ln P_{\mathrm{BTC}} & =\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)+ \\
& +\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                with respect to p<sub>k</sub> and q<sub>k</sub>.
                <br />
                Let us start with the sensitivity with respect to pk.
                Apparently, only the first term in both expressions above
                depends on p<sub>k</sub>. Therefore, we may dismiss other terms
                when calculating the partial derivatives. In other words,
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial^2}{\partial t \partial p_k}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)\right]

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k} \ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right) .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Taking into account that</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)\right]=\frac{X^{\prime}}{X}
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">where</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X=\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                height="10px"
                tex={String.raw`\begin{eqnarray} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;
X^{\prime}=\frac{\partial X}{\partial t}
            \end{eqnarray} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">we have</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X^{\prime} & =\frac{\partial}{\partial t}\left(\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)= \\
& =\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot \frac{\partial}{\partial t}\left(\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right) .
            \end{eqnarray}`}
              />

              <p className="for-mt-secondary">On the other hand,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
& \frac{\partial}{\partial t}\left(\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)=\frac{\partial}{\partial t}\left[\left(\frac{t}{q_k}\right)^{p_k-1}\right] \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
&+\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \frac{\partial}{\partial t} \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]=\frac{p_k-1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
&+\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left(-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1}\right)= \\
&=\frac{p_k-1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{2 p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]= \\
&=\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Thus, finally</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X^{\prime}=\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p k}\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Coming back to the sensitivity problem, let us now calculate the
                sensitivity derivative
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k}\left[\frac{X^{\prime}}{X}\right]=\frac{\partial X^{\prime}}{\partial p_k} \cdot \frac{1}{X}+X^{\prime} \cdot \frac{\partial}{\partial p_k}\left[\frac{1}{X}\right]=\frac{\partial X^{\prime}}{\partial p_k} \cdot \frac{1}{X}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial p_k}
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Apparently,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X^{\prime}}{\partial p_k}=P_k \cdot R_k \cdot \frac{\partial}{\partial p_k}\left(\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]\right) .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Applying the multiplication derivative rule, we get
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial}{\partial p_k}\left(\frac{p_k}{q_k}\right. & \left.\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]\right)= \\
& =\frac{\partial}{\partial p_k}\left(\frac{p_k}{q_k}\right) \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
& +\frac{p_k}{q_k} \cdot \frac{\partial}{\partial p_k}\left(\left(\frac{t}{q_k}\right)^{p k-2}\right) \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p k}\right]+ \\
& +\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \frac{\partial}{\partial p_k}\left(\exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right) \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
& +\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p k}\right] \cdot \frac{\partial}{\partial p_k}\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p k}\right] \cdot
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Since</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
& \frac{\partial}{\partial p_k}\left(\frac{p_k}{q_k}\right)=\frac{1}{q_k}, \quad \frac{\partial}{\partial p_k}\left(\left(\frac{t}{q_k}\right)^{p_k-2}\right)=\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \ln \left(\frac{t}{q_k}\right), \\
& \frac{\partial}{\partial p_k}\left(\exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)=\exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[-\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right)\right]= \\
&=-\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right) \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right], \\
& \frac{\partial}{\partial p_k}\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]=\frac{1}{q_k}-\frac{1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right)= \\
&=\frac{1}{q_k}-\frac{1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k} \cdot\left[1-p_k \cdot \ln \left(\frac{t}{q_k}\right)\right]= \\
&=\frac{1}{q_k}-\frac{1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k} \cdot\left[1-\ln \left(\frac{t}{q_k}\right)^{p_k}\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Combining all separate derivatives, we will obtain
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial}{\partial p_k}\left(\frac{p_k}{q_k}\right. & \left.\cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]\right)= \\
& =\frac{1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
& +\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \ln \left(\frac{t}{q_k}\right) \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]- \\
& -\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right) \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
& +\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left(\frac{1}{q_k}-\frac{1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k} \cdot\left[1-\ln \left(\frac{t}{q_k}\right)^{p_k}\right]\right)= \\
& =\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{1}{q_k} \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]+\right. \\
& +\frac{1}{q_k} \cdot \ln \left(\frac{t}{q_k}\right)^{p_k} \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]- \\
& -\frac{1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right)^{p_k} \cdot\left[\frac{p_k-1}{q_k} \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
& \left.+\frac{p_k}{q_k} \cdot \frac{1}{q_k} \cdot\left(1-\left(\frac{t}{q_k}\right)^{p_k} \cdot\left[1-\ln \left(\frac{t}{q_k}\right)^{p_k}\right]\right)\right]= \\
& =\frac{1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k}{q_k} \cdot\left(1-\left(\frac{t}{q_k}\right)^{p_k} \cdot\left[1-\ln \left(\frac{t}{q_k}\right)^{p_k}\right]\right)+\right. \\
& \left.+\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\ln \left(\frac{t}{q_k}\right)^{p_k}-\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right)^{p_k}\right]\right]

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Thus,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
& \frac{\partial X^{\prime}}{\partial p_k}=\frac{P_k \cdot R_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k}{q_k} \cdot\left(1-\left(\frac{t}{q_k}\right)^{p_k} \cdot\left[1-\ln \left(\frac{t}{q_k}\right)^{p_k}\right]\right)+\right. \\
&+ {\left.\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\ln \left(\frac{t}{q_k}\right)^{p_k}-\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right)^{p_k}\right]\right] }
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Now, compute the following derivative:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X}{\partial p_k} & =P_k \cdot R_k \cdot \frac{\partial}{\partial p_k}\left(\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]\right)= \\
& =P_k \cdot R_k \cdot\left[\frac{1}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]+\right. \\
& +\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \ln \left(\frac{t}{q_k}\right) \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
& \left.+\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left(-\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right)\right)\right]= \\
& =\frac{P_k \cdot R_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\ln \left(\frac{t}{q_k}\right)^{p_k} \cdot\left(1-\left(\frac{t}{q_k}\right)^{p k}\right)\right] .


            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Substituting the above expressions into the sensitivity
                derivative, we finally obtain
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}= & \frac{1}{X} \cdot \frac{P_k \cdot R_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k}{q_k} \cdot\left(1-\left(\frac{t}{q_k}\right)^{p_k} \cdot\left[1-\ln \left(\frac{t}{q_k}\right)^{p_k}\right]\right)+\right. \\
& \left.+\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\ln \left(\frac{t}{q_k}\right)^{p_k}-\left(\frac{t}{q_k}\right)^{p_k} \cdot \ln \left(\frac{t}{q_k}\right)^{p_k}\right]\right]- \\
- & \frac{X^{\prime}}{X^2} \cdot \frac{P_k \cdot R_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\ln \left(\frac{t}{q_k}\right)^{p_k} \cdot\left(1-\left(\frac{t}{q_k}\right)^{p_k}\right)\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Before proceeding to computing of derivatives with respect to q
                <sub>k</sub>, let us simplify the expressions for X and X′.
                Namely
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X & =\sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]= \\
& =\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k^{-1} \cdot t^{p_k-1} \cdot q_k^{-p_k+1} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right]= \\
& =\sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot t^{p_k-1} \cdot q_k^{-p_k} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right], \\
X^{\prime}= & \sum_{k=1}^n P_k \cdot R_k \cdot \frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[\frac{p_k-1}{q_k}-\frac{p_k}{q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k}\right]= \\
= & \sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot q_k^{-1} \cdot t^{p_k-2} \cdot q_k^{-p_k+2} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right] \cdot q_k^{-1} \cdot\left[p_k-1-p_k \cdot t^{p_k} \cdot q_k^{-p_k}\right]= \\
= & \sum_{k=1}^n P_k \cdot R_k \cdot p_k \cdot t^{p_k-2} \cdot q_k^{-p_k} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right] \cdot\left[p_k-1-p_k \cdot t^{p_k} \cdot q_k^{-p_k}\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Thus,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X}{\partial q_k} & =P_k \cdot R_k \cdot p_k \cdot t^{p_k-1} \cdot \frac{\partial}{\partial q_k}\left(q_k^{-p_k} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right]\right)= \\
& =P_k \cdot R_k \cdot p_k \cdot t^{p_k-1} \cdot\left[\frac{\partial q_k^{p_k}}{\partial q_k} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right]+q_k^{-p_k} \cdot \frac{\partial}{\partial q_k}\left(\exp \left[-t^{p_k} \cdot q_k^{-p_k}\right]\right)\right]= \\
& =P_k \cdot R_k \cdot p_k \cdot t^{p_k-1} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right] \cdot\left[-p_k q_k^{-p_k-1}+q_k^{-p_k} \cdot\left(-p_k \cdot t^{p_k} \cdot q_k^{-p_k-1}\right)\right]= \\
& =-P_k \cdot R_k \cdot p_k^2 \cdot t^{p_k-1} \cdot q_k^{-p_k-1} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right] \cdot\left[1+q_k^{-p_k} \cdot t^{p_k}\right]= \\
& =-P_k \cdot R_k \cdot p_k^2 \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p k}\right] \cdot\left[1+\left(\frac{t}{q_k}\right)^{p_k}\right]

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X^{\prime}}{\partial q_k} & =P_k \cdot R_k \cdot p_k \cdot t^{p_k-2} \cdot \frac{\partial}{\partial q_k}\left(q_k^{-p_k} \cdot \exp \left[-t^{p_k} \cdot q_k^{-p_k}\right] \cdot\left[p_k-1-p_k \cdot t^{p_k} \cdot q_k^{-p_k}\right]\right)= \\
& =-P_k \cdot R_k \cdot p_k^2 \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[p_k \cdot\left(1-\left(\frac{t}{q_k}\right)^{p_k}\right)-1\right]+ \\
& +P_k \cdot R_k \cdot p_k^3 \cdot q_k \cdot\left(\frac{t}{q_k}\right)^{2 p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Similarly, in the case of q<sub>k</sub>, we have
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial q_k} & =\frac{\partial}{\partial q_k}\left[\frac{X^{\prime}}{X}\right]=\frac{\partial X^{\prime}}{\partial q_k} \cdot \frac{1}{X}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial q_k}= \\
& =-\frac{P_k \cdot R_k \cdot p_k^2}{X} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[p_k \cdot\left(1-\left(\frac{t}{q_k}\right)^{p_k}\right)-1\right]+ \\
& +\frac{P_k \cdot R_k \cdot p_k^3 \cdot q_k}{X} \cdot\left(\frac{t}{q_k}\right)^{2 p_k-2} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right]+ \\
& +\frac{X^{\prime} \cdot P_k \cdot R_k \cdot p_k^2}{X^2} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\left(\frac{t}{q_k}\right)^{p_k}\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Let us now proceed to the sensitivity derivatives calculations
                for ln P<sub>BTC</sub>. Apparently,
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial p_k} & =\frac{\partial \ln X}{\partial p_k}=\frac{1}{X} \cdot \frac{\partial X}{\partial p_k}= \\
& =\frac{P_k \cdot R_k}{X \cdot q_k} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\ln \left(\frac{t}{q_k}\right)^{p_k} \cdot\left(1-\left(\frac{t}{q_k}\right)^{p_k}\right)\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Similarly,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial q_k} & =\frac{\partial \ln X}{\partial q_k}=\frac{1}{X} \cdot \frac{\partial X}{\partial q_k}= \\
& =-\frac{P_k \cdot R_k \cdot p_k^2}{X} \cdot\left(\frac{t}{q_k}\right)^{p_k-1} \cdot \exp \left[-\left(\frac{t}{q_k}\right)^{p_k}\right] \cdot\left[1+\left(\frac{t}{q_k}\right)^{p k}\right]
            \end{eqnarray}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeWeibulModelforAlpha;
