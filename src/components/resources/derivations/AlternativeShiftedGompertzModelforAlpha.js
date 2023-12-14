// THIS COMPONENT IS BEING USED
import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const AlternativeShiftedGompertzModelforAlpha = () => {
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
                Shifted Gompertz Model for Alpha
              </h1>
              <p className="for-mt-secondary">
                Consider now the following particular model for the absorption
                rate α<sub>k</sub> corresponding to the well-known shifted
                Gompertz distribution:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\alpha_k=p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right),


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
\Pi_{\mathrm{BTC}}= & \frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k\right)+\right. \\
+ & \left.\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right] \\
\ln P_{\mathrm{BTC}}= & \ln \left(\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k\right)+ \\
& +\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d .
            \end{eqnarray}`}
              />

              <h2 className="for-mt-primary">Shifted Gompertz Derivations</h2>
              <p className="for-mt-secondary">
                In this appendix, we will consider the sensitivity of
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\Pi_{\mathrm{BTC}} & =\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k\right)+\right. \\
& \left.+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\ln P_{\mathrm{BTC}} & =\ln \left(\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k\right)+ \\
& +\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                with respect to p<sub>k</sub> and q<sub>k</sub>.
                <br />
                Let us start with the sensitivity with respect to p<sub>k</sub>.
                Apparently, only the first term in both expressions above
                depends on p<sub>k</sub>. Therefore, we may dismiss other terms
                when calculating the partial derivatives. In other words,
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial^2}{\partial t \partial p_k}\left[\ln \left(\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k\right)\right]

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k} \ln \left(\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Taking into account that</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k\right)\right]=\frac{X^{\prime}}{X},
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">where</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X=\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\begin{eqnarray}
X^{\prime}=\frac{\partial X}{\partial t}
            \end{eqnarray}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">we have</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X^{\prime} & =\frac{\partial}{\partial t}\left[\sum_{k=1}^n P_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right) \cdot R_k\right]= \\
& =\sum_{k=1}^n P_k \cdot p_k \cdot R_k \cdot \frac{\partial}{\partial t}\left[\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">On the other hand,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial}{\partial t}[\exp [ & \left.\left.-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)\right]= \\
& =\frac{\partial}{\partial t}\left[\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+ \\
& +\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot \frac{\partial}{\partial t}\left[\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)\right]= \\
& =\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot \frac{\partial}{\partial t}\left(-p_k t-q_k \exp \left(-p_k t\right)\right) \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+ \\
& +\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(-q_k \cdot \frac{\partial}{\partial t}\left[\exp \left(-p_k t\right)\right]\right)= \\
& =\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(-p_k-q_k \exp \left(-p_k t\right) \cdot\left(-p_k\right)\right) \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+ \\
& +\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(p_k \cdot q_k \cdot \exp \left(-p_k t\right)\right)= \\
& =-p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1-q_k \exp \left(-p_k t\right)\right) \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+ \\
& +\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot p_k \cdot q_k \cdot \exp \left(-p_k t\right)= \\
& =p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[q_k \cdot \exp \left(-p_k t\right)-\right. \\
& \left.-\left(1-q_k \exp \left(-p_k t\right)\right) \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)\right] .

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Simplifying the expression in the last bracket, we derive
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
& q_k \cdot \exp \left(-p_k t\right)-\left(1-q_k \exp \left(-p_k t\right)\right) \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)= \\
&=q_k \cdot \exp \left(-p_k t\right)-1-q_k \cdot\left[1-\exp \left(-p_k t\right)\right]+q_k \cdot \exp \left(-p_k t\right)+ \\
&+q_k^2 \cdot \exp \left(-p_k t\right) \cdot\left[1-\exp \left(-p_k t\right)\right]= \\
&=2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Therefore, finally</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
X^{\prime} & =-\sum_{k=1}^n P_k \cdot R_k \cdot p_k^2 \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]
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

\frac{\partial X^{\prime}}{\partial p_k} & =-P_k \cdot R_k \cdot \frac{\partial}{\partial p_k}\left(p_k^2 \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times\right. \\
& \left.\times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]\right) .

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Applying the multiplication derivative rule, we get
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
& \frac{\partial}{\partial p_k}\left(p_k^2 \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times\right. \\
& \left.\times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]\right)= \\
& =\frac{\partial p_k^2}{\partial p_k} \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+ \\
& +p_k^2, \frac{\partial \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]}{\partial p_k} \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+ \\
& +p_k^2 \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times \frac{\partial}{\partial p_k}\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]= \\
& =2 p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+ \\
& +p_k^2 \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[-t-q_k \exp \left(-p_k t\right) \cdot(-t)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+ \\
& +p_k^2 \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right) \cdot(-t)-q_k \cdot\left[-\exp \left(-p_k t\right) \cdot(-t)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-\right. \\
& \left.-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(-q_k \cdot \exp \left(-p_k t\right) \cdot(-t)\right)\right]= \\
& =2 p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]- \\
& -p_k^2 t \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[1-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+ \\
& +p_k^2 \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[-2 q_k t \cdot \exp \left(-p_k t\right)-q_k t \cdot \exp \left(-p_k t\right) \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-\right. \\
& \left.-q_k^2 t \cdot \exp \left(-p_k t\right) \cdot\left[1-\exp \left(-p_k t\right)\right]\right]= \\
& =2 p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]- \\
& -p_k^2 t \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[1-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+ \\
& +p_k^2 \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times q_k t \cdot \exp \left(-p_k t\right) \cdot\left[-2-\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right]= \\
& =2 p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]- \\
& -p_k^2 t \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[1-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]- \\
& -p_k^2 \cdot q_k t \cdot \exp \left(-p_k t\right) \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2+\left(1-q_k \cdot \exp \left(-p_k t\right)\right)+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right] . \\
&
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Thus,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X^{\prime}}{\partial p_k} & =-P_k \cdot R_k \cdot 2 p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]- \\
& -p_k^2 t \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[1-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(p_k t\right)\right) \quad 1\right] \\
& -p_k^2 \cdot q_k t \cdot \exp \left(-p_k t\right) \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2+\left(1-q_k \cdot \exp \left(-p_k t\right)\right)+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right] .

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Now, compute the following derivative:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X}{\partial p_k} & =P_k \cdot R_k \cdot \frac{\partial}{\partial p_k}\left[p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)\right]= \\
& =P_k \cdot R_k \cdot\left[\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+\right. \\
& +p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[-t-q_k \exp \left(-p_k t\right) \cdot(-t)\right] \times \\
& \left.\times\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot q_k \cdot\left[-\exp \left(-p_k t\right) \cdot(-t)\right]\right]= \\
& =P_k \cdot R_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]-\right. \\
& \left.-p_k t \cdot\left[1-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+p_k \cdot q_k t \cdot \exp \left(-p_k t\right)\right] .

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Substituting the above expressions into the sensitivity
                derivative, we finally obtain
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
& \frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=-\frac{P_k \cdot R_k \cdot 2 p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]}{X} \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]- \\
& -p_k^2 t \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left[1-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]- \\
& -p_k^2 \cdot q_k t \cdot \exp \left(-p_k t\right) \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2+\left(1-q_k \cdot \exp \left(-p_k t\right)\right)+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right]- \\
& -\frac{X^{\prime} \cdot P_k \cdot R_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]}{X^2} \cdot\left[1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]-\right. \\
& \left.-p_k t \cdot\left[1-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+p_k \cdot q_k t \cdot \exp \left(-p_k t\right)\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Similarly, in the case of q<sub>k</sub>, we have
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \Pi_{\mathrm{BTC}}}{\partial q_k}=\frac{\partial}{\partial q_k}\left[\frac{X^{\prime}}{X}\right]=\frac{\partial X^{\prime}}{\partial q_k} \cdot \frac{1}{X}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial q_k} .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Here,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X^{\prime}}{\partial q_k} & =-P_k \cdot R_k \cdot p_k^2 \cdot \frac{\partial}{\partial q_k}\left(\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times\right. \\
& \left.\times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]\right)= \\
& =-P_k \cdot R_k \cdot p_k^2 \cdot\left[\frac{\partial}{\partial q_k}\left(\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]\right) \times\right. \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+ \\
& +\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \left.\times \frac{\partial}{\partial q_k}\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]\right]= \\
& =-P_k \cdot R_k \cdot p_k^2 \cdot\left[\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot\left(-\exp \left(-p_k t\right)\right) \times\right. \\
& \times\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+ \\
& +\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[2 \cdot \exp \left(-p_k t\right)-\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-\right. \\
& \left.\left.-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(-\exp \left(-p_k t\right)\right)\right]\right] \\
& =P_k \cdot R_k \cdot p_k^2 \cdot \exp \left(-p_k t\right) \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+\right. \\
& {\left.\left[1-q_k \cdot \exp \left(-p_k t\right)\right)+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]-2\right] \cdot }

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">On the other hand,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial X}{\partial q_k} & =P_k \cdot R_k \cdot p_k \cdot\left[\frac{\partial \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]}{\partial q_k} \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+\right. \\
& \left.+\exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \cdot \frac{\partial}{\partial q_k}\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)\right]= \\
& =P_k \cdot R_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right] \times \\
& \times\left[-\exp \left(-p_k t\right) \cdot\left(2+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+1\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Therefore,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

& \frac{\partial \Pi_{\mathrm{BTC}}}{\partial q_k}=\frac{P_k \cdot R_k \cdot p_k^2 \cdot \exp \left(-p_k t\right) \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]}{X} \times \\
& \times\left[\left[2 q_k \cdot \exp \left(-p_k t\right)-q_k \cdot\left[1-\exp \left(-p_k t\right)\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)-1\right]+\right. \\
& \left.+\left[\exp \left(p_k t\right)-1\right] \cdot\left(1-q_k \cdot \exp \left(-p_k t\right)\right)+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]-2\right]- \\
& -\frac{X^{\prime} \cdot P_k \cdot R_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]}{X^2} \times \\
& \times\left[-\exp \left(-p_k t\right) \cdot\left(2+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+1\right]


            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Let us now proceed to the sensitivity derivatives calculations
                for ln P<sub>BTC</sub>. Apparently,
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial p_k} & =\frac{\partial \ln X}{\partial p_k}=\frac{1}{X} \cdot \frac{\partial X}{\partial p_k}= \\
& =\frac{P_k \cdot R_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]}{X} \cdot\left[1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]-\right. \\
& \left.-p_k t \cdot\left[1-q_k \exp \left(-p_k t\right)\right] \cdot\left(1+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+p_k \cdot q_k t \cdot \exp \left(-p_k t\right)\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Similarly,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
\frac{\partial \ln P_{\mathrm{BTC}}}{\partial q_k} & =\frac{\partial \ln X}{\partial q_k}=\frac{1}{X} \cdot \frac{\partial X}{\partial q_k}= \\
& =\frac{P_k \cdot R_k \cdot p_k \cdot \exp \left[-p_k t-q_k \exp \left(-p_k t\right)\right]}{X} \times \\
& \times\left[-\exp \left(-p_k t\right) \cdot\left(2+q_k \cdot\left[1-\exp \left(-p_k t\right)\right]\right)+1\right] .
            \end{eqnarray}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeShiftedGompertzModelforAlpha;
