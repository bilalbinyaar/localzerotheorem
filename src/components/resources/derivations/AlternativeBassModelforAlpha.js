// THIS COMPONENT IS BEING USED
import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const AlternativeBassModelforAlpha = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <SideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">Bass Model for Alpha</h1>
              <p className="for-mt-secondary">
                For the absorption rate α<sub>k</sub> we consider the following
                model based on the well-known Bass Diffusion
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\alpha_k=\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{1+\frac{p_k}{q_k} \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                where p<sub>k</sub> and q<sub>k</sub> are time-dependent
                coefficients to be estimated.
                <br />
                Then, Π<sub>BTC</sub> will obtain the following form:
              </p>
              <MathComponent
                tex={String.raw`\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{1+\frac{p_k}{q_k} \cdot \exp \left[-\left(p_k+q_k\right) t\right]} \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right]`}
              />

              <h2 className="for-mt-primary">Bass Derivatives</h2>
              <p className="for-mt-secondary">It is easy to see that</p>
              <MathComponent
                tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k}\left[\frac{X^{\prime}}{X}\right]=\frac{1}{X} \cdot \frac{\partial X^{\prime}}{\partial p_k}+X^{\prime} \cdot \frac{\partial}{\partial p_k}\left[\frac{1}{X}\right]=\frac{1}{X} \cdot \frac{\partial X^{\prime}}{\partial p_k}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial p_k},`}
              />
              <p className="for-mt-secondary">and, similarly,</p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\frac{\partial \Pi_{\mathrm{BTC}}}{\partial q_k}=\frac{1}{X} \cdot \frac{\partial X^{\prime}}{\partial q_k}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial q_k}\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">where</p>
              <MathComponent
                tex={String.raw`X=\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`}
              />
              <p className="for-mt-secondary">Therefore,</p>
              <MathComponent
                tex={String.raw`X^{\prime}=\frac{\partial X}{\partial t}=\sum_{k=1}^n\left(P_k \cdot R_k\right)^{\prime} \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+`}
              />
              <MathComponent
                tex={String.raw`\sum_{k=1}^n P_k \cdot R_k \cdot q_k^{\prime} \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+`}
              />
              <MathComponent
                tex={String.raw`\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot\left(\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right)^{\prime}`}
              />
              <p className="for-mt-secondary">
                Since p<sub>k</sub> and q<sub>k</sub> depend on t, we compute
              </p>
              <MathComponent
                tex={String.raw`\left(\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right)^{\prime}=\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right)^{\prime}}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}-`}
              />
              <MathComponent
                tex={String.raw`\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right)\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^{\prime}}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} .`}
              />
              <p className="for-mt-secondary">
                Now, making use of the chain rule, it is easy to evaluate
              </p>
              <MathComponent
                tex={String.raw`\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right)^{\prime}=-\exp \left[-\left(p_k+q_k\right) t\right] \cdot\left[-\left(p_k+q_k\right) t\right]^{\prime}=`}
              />
              <MathComponent
                tex={String.raw`\left[p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^{\prime}=q_k^{\prime}+p_k^{\prime} \cdot \exp \left[-\left(p_k+q_k\right) t\right]+`}
              />
              <MathComponent
                tex={String.raw`p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot\left[-\left(p_k+q_k\right) \cdot t\right]^{\prime}=`}
              />
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;q_k^{\prime}+p_k^{\prime} \cdot \exp \left[-\left(p_k+q_k\right) t\right]+\;\;\;\;\;\;\;\;`}
              />
              <MathComponent
                tex={String.raw`p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot\left[p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]=`}
              />
              <MathComponent
                tex={String.raw`q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]`}
              />
              <p className="for-mt-secondary">Hence,</p>
              <MathComponent
                tex={String.raw`\left(\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right)^{\prime}=\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`}
              />
              <MathComponent
                tex={String.raw`-\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}`}
              />
              <p className="for-mt-secondary">Thus,</p>
              <MathComponent
                tex={String.raw`X^{\prime}=\frac{\partial X}{\partial t}=\sum_{k=1}^n\left(P_k \cdot R_k\right)^{\prime} \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`}
              />
              <MathComponent
                tex={String.raw`+\sum_{k=1}^n P_k \cdot R_k \cdot q_k^{\prime} \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`}
              />
              <MathComponent
                tex={String.raw`+\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`}
              />
              <MathComponent
                tex={String.raw`-\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}`}
              />
              <p className="for-mt-secondary">
                Now, in order to continue the sensitivity analysis of ΠBTC with
                respect to pk, we need to evaluate the derivatives ∂X/∂p
                <sub>k</sub> and ∂X′/∂p<sub>k</sub>. First,
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial X}{\partial p_k}=\frac{\partial}{\partial p_k}\left[P_k \cdot R_k \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]=`}
              />
              <MathComponent
                tex={String.raw`P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]`}
              />
              <p className="for-mt-secondary">in which</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray} 
            & \frac{\partial}{\partial p_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]=\frac{1}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]} \frac{\partial}{\partial p_k}\left[1-\exp \left[-\left(p_k+q_k\right) t\right]\right]+ \\
            & +\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot \frac{\partial}{\partial p_k}\left[\frac{1}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]= \\
            & =-\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]} \cdot \frac{\partial}{\partial p_k}\left[-\left(p_k+q_k\right) t\right]- \\
            & -\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot \frac{\partial}{\partial p_k}\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)= \\
            & =\frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
            & -\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot\left(\exp \left[-\left(p_k+q_k\right) t\right]+p_k \cdot \frac{\partial \exp \left[-\left(p_k+q_k\right) t\right]}{\partial p_k}\right)= \\
            & =\frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
            & -\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot\left(1+p_k \cdot \frac{\partial}{\partial p_k}\left[-\left(p_k+q_k\right) t\right]\right)= \\
            & =\frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}-\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot\left(1-p_k \cdot t\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}= \\
            & =\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\left[t-\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot\left(1-p_k \cdot t\right)}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]= \\
            & =\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \times \\
            & \times\left[t \cdot q_k+t \cdot p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]-\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot\left(1-p_k \cdot t\right)\right]= \\
            & =\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \times \\
            & \times\left[t \cdot q_k+t \cdot p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]-\left(1-p_k \cdot t-\exp \left[-\left(p_k+q_k\right) t\right]+p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)\right]= \\
            & =\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot\left[\left(p_k+q_k\right) \cdot t+\exp \left[-\left(p_k+q_k\right) t\right]-1\right], \\
            &
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">or</p>
              <MathComponent
                tex={String.raw`
            \begin{eqnarray}
            \frac{\partial}{\partial p_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right] & =\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \times \\
            & \times\left[\left(p_k+q_k\right) \cdot t+\exp \left[-\left(p_k+q_k\right) t\right]-1\right],
            \end{eqnarray}
            `}
              />
              <p className="for-mt-secondary">leading to</p>
              <MathComponent
                tex={String.raw`\frac{\partial X}{\partial p_k}=P_k \cdot R_k \cdot q_k \cdot \frac{\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot\left[\left(p_k+q_k\right) \cdot t+\exp \left[-\left(p_k+q_k\right) t\right]-1\right]`}
              />
              <p className="for-mt-secondary">
                Now, we evaluate the derivative ∂X′/∂p<sub>k</sub>:
              </p>
              <MathComponent
                tex={String.raw`
            \begin{eqnarray}
            \frac{\partial X^{\prime}}{\partial p_k} & =\left(P_k \cdot R_k \cdot q_k\right)^{\prime} \cdot \frac{\partial}{\partial p_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]+ \\
            & +P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left[\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]- \\
            & -P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left[\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right]= \\
            & =\left(P_k \cdot R_k \cdot q_k\right)^{\prime} \cdot \frac{\exp \left[-\left(p_k+q_k\right) t\right] \cdot\left[\left(p_k+q_k\right) \cdot t+\exp \left[-\left(p_k+q_k\right) t\right]-1\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}+ \\
            & +P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left[\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]- \\
            & -P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left[\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Next, we evaluate</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            & \frac{\partial}{\partial p_k}\left[\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]= \\
            & =\frac{\exp \left[-\left(p_k+q_k\right) t\right]+\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot(-t)}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
            & -\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot\left(1-p_k t\right)= \\
            & =\frac{\exp \left[-\left(p_k+q_k\right) t\right] \cdot\left(1-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot t\right)}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
            & -\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-2\left(p_k+q_k\right) t\right] \cdot\left(1-p_k t\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            & \frac{\partial}{\partial p_k}\left[\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right]= \\
            & =\frac{\left[-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)-p_k\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}+ \\
            & +\frac{\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot(-t)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}- \\
            & -\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^4} \times \\
            & \times \frac{\partial}{\partial p_k}\left[\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2\right]= \\
            & =\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \times \\
            & \times \cdot\left(\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot t-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)-p_k\right)- \\
            & -\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^4} \times \\
            & \times 2\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot \frac{\partial}{\partial p_k}\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)= \\
            & =\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2 \times} \\
            & \times\left(\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot t-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)-p_k\right)- \\
            & -\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^4} \times \\
            & \times 2\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)\left(1-p_k \cdot t\right) \cdot .
            \end{eqnarray}`}
              />

              <p className="for-mt-secondary">Thus, eventually,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            \frac{\partial X^{\prime}}{\partial p_k} & =\left(P_k \cdot R_k \cdot q_k\right)^{\prime} \cdot \frac{\exp \left[-\left(p_k+q_k\right) t\right] \cdot\left[\left(p_k+q_k\right) \cdot t+\exp \left[-\left(p_k+q_k\right) t\right]-1\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}+ \\
            & +P_k \cdot R_k \cdot q_k \cdot \frac{\exp \left[-\left(p_k+q_k\right) t\right] \cdot\left(1-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot t\right)}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
            & -P_k \cdot R_k \cdot q_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-2\left(p_k+q_k\right) t\right] \cdot\left(1-p_k t\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}- \\
            & -P_k \cdot R_k \cdot q_k \cdot \frac{\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2 \times} \\
            & \times\left(\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot t-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)-p_k\right)+ \\
            & +P_k \cdot R_k \cdot q_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^4} \times \\
            & \times 2\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)\left(1-p_k \cdot t\right) \cdot
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Similar steps as above will lead us to the following
                expressions:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X}{\partial q_k} & =\frac{\partial}{\partial q_k}\left[P_k \cdot R_k \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]= \\
& =P_k \cdot R_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]


            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">in which</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial}{\partial q_k} & {\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]=\frac{1}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]} \frac{\partial}{\partial q_k}\left[1-\exp \left[-\left(p_k+q_k\right) t\right]+\right.} \\
& +\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot \frac{\partial}{\partial q_k}\left[\frac{1}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]= \\
& =-\frac{\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]} \cdot \frac{\partial}{\partial q_k}\left[-\left(p_k+q_k\right) t\right]- \\
& -\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot \frac{\partial}{\partial q_k}\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)= \\
& =\frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
& -\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot\left(1+p_k \cdot \frac{\partial \exp \left[-\left(p_k+q_k\right) t\right]}{\partial q_k}\right)= \\
& =\frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
& -\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot\left(1+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot \frac{\partial}{\partial q_k}\left[-\left(p_k+q_k\right) t\right]\right)= \\
& =\frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}-\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot\left(1-p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2},

            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">leading to</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X}{\partial q_k} & =P_k \cdot R_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+P_k \cdot R_k \cdot q_k \cdot \frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
& -P_k \cdot R_k \cdot q_k \cdot \frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot\left(1-p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} .


            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                Now, we evaluate the derivative ∂X′/∂q<sub>k</sub>
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

\frac{\partial X^{\prime}}{\partial q_k} & =\left(P_k \cdot R_k\right)^{\prime} \cdot \frac{\partial}{\partial q_k}\left[q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]+ \\
& +P_k \cdot R_k \cdot q_k^{\prime} \cdot \frac{\partial}{\partial q_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]+ \\
& +P_k \cdot R_k \cdot \frac{\partial}{\partial q_k}\left[q_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]- \\
& -P_k \cdot R_k \cdot \frac{\partial}{\partial q_k}\left[q_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right]= \\
& =\left(P_k \cdot R_k\right)^{\prime} \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+\left(P_k \cdot R_k\right)^{\prime} \cdot q_k \cdot \frac{\partial}{\partial q_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]+ \\
& +P_k \cdot R_k \cdot q_k^{\prime} \cdot \frac{\partial}{\partial q_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]+ \\
& +P_k \cdot R_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+ \\
& +P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial q_k}\left[\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]- \\
& -P_k \cdot R_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}- \\
& -P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial q_k}\left[\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right]

            \end{eqnarray}`}
              />

              <p className="for-mt-secondary">or</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
           \frac{\partial X^{\prime}}{\partial q_k} & =\left(P_k \cdot R_k\right)^{\prime} \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+ \\
& +\left(P_k \cdot R_k \cdot q_k\right)^{\prime} \cdot \frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
& -\left(P_k \cdot R_k \cdot q_k\right)^{\prime} \cdot \frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot\left(1-p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}+ \\
& +P_k \cdot R_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+ \\
& +P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial q_k}\left[\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]- \\
& -P_k \cdot R_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}- \\
-P_k & \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial q_k}\left[\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Furthermore,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}

& \frac{\partial}{\partial q_k}\left[\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]= \\
& =\frac{\exp \left[-\left(p_k+q_k\right) t\right]-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot t}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
& -\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \cdot \frac{\partial}{\partial q_k}\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)= \\
& =\frac{\exp \left[-\left(p_k+q_k\right) t\right]-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot t}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
& -\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot\left(1-p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2},
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
           & \frac{\partial}{\partial q_k}\left[\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right]= \\
& =\frac{-p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot(-t)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}- \\
& -\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^4} \cdot \frac{\partial}{\partial q_k}\left[\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2\right]= \\
& =-\frac{\left(p_k+t \cdot\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}- \\
& -\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^4} \cdot\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right) \times \\
& \times 2 \cdot\left(1-p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot
            \end{eqnarray}`}
              />

              <p className="for-mt-secondary">Hence,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
           \frac{\partial X^{\prime}}{\partial q_k} & =\left(P_k \cdot R_k\right)^{\prime} \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+ \\
& +\left(P_k \cdot R_k \cdot q_k\right)^{\prime} \cdot \frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
& -\left(P_k \cdot R_k \cdot q_k\right)^{\prime} \cdot \frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot\left(1-p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}+ \\
& +P_k \cdot R_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+ \\
& +P_k \cdot R_k \cdot q_k \cdot \frac{\exp \left[-\left(p_k+q_k\right) t\right]-\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot t}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}- \\
& -P_k \cdot R_k \cdot q_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot\left(1-p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} \\
& -P_k \cdot R_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}- \\
& +P_k \cdot R_k \cdot q_k \cdot \frac{\left(p_k+t \cdot\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}- \\
& +P_k \cdot R_k \cdot q_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^4} \times \\
& \times 2\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right) \cdot\left(1-p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right) .
            \end{eqnarray}`}
              />

              <p className="for-mt-secondary">Apparently,</p>
              <MathComponent
                tex={String.raw` \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\begin{eqnarray}

\frac{\partial X}{\partial p_k^{\prime}}=\frac{\partial X}{\partial q_k^{\prime}}=0,
            \end{eqnarray}  \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">and</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
           \frac{\partial X^{\prime}}{\partial p_k^{\prime}} & =\frac{\partial}{\partial p_k^{\prime}}\left[\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]- \\
& -\frac{\partial}{\partial p_k^{\prime}}\left[\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right]= \\
& =P_k \cdot R_k \cdot q_k \cdot \frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}-P_k \cdot R_k \cdot q_k \cdot \frac{\left(1-p_k \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}= \\
& =\frac{P_k \cdot R_k \cdot q_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\left[t \cdot\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)-1+p_k \cdot t\right]= \\
& =\frac{P_k \cdot R_k \cdot q_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\left[\left(q_k+p_k\right) \cdot t+p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]-1\right] .
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Therefore,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
           \frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k^{\prime}} & =\frac{1}{X} \cdot \frac{\partial X}{\partial p_k^{\prime}}= \\
& =\frac{1}{X} \cdot \frac{P_k \cdot R_k \cdot q_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[\left(p_k+q_k\right) t\right]\right)^2}\left[\left(q_k+p_k\right) \cdot t+p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]-1\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">Similarly,</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
           \frac{\partial X^{\prime}}{\partial q_k^{\prime}} & =\frac{\partial}{\partial p_k^{\prime}}\left[\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]- \\
& -\frac{\partial}{\partial p_k^{\prime}}\left[\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\right]= \\
& =P_k \cdot R_k \cdot q_k \cdot \frac{t \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}-P_k \cdot R_k \cdot q_k \cdot \frac{\left(1-p_k \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}= \\
& =\frac{P_k \cdot R_k \cdot q_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}\left[\left(q_k+p_k\right) \cdot t+p_k \cdot t \cdot \exp \left[-\left(p_k+q_k\right) t\right]-1\right],
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">i.e.,</p>
              <MathComponent
                tex={String.raw` \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\begin{eqnarray}
           \frac{\partial X^{\prime}}{\partial p_k^{\prime}}=\frac{\partial X^{\prime}}{\partial q_k^{\prime}} .
            \end{eqnarray} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeBassModelforAlpha;
