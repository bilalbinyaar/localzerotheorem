import React from 'react';
import '../ResourcesTextual.css';
import SideBar from '../sidebar/SideBar';
import { MathComponent } from 'mathjax-react';

const RepresentationofaNewAssetClassviaSubstitution = () => {
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
                Representation of a New Asset Class via Substitution
              </h1>
              <p className="for-mt-primary">
                First, consider the case of 2 assets. Then, the Wronskian of the
                functions M<sub>1</sub> and M<sub>2</sub> will be
              </p>
              <MathComponent
                tex={String.raw`W\left(M_1, M_2\right)=\left|\begin{array}{ll}M_1 & M_2 \\M_1^{\prime} & M_2^{\prime}\end{array}\right|=M_1 \cdot M_2^{\prime}-M_1^{\prime} \cdot M_2`}
              />
              <p className="for-mt-secondary">
                On the other hand, we know that
              </p>
              <MathComponent
                tex={String.raw`\frac{\partial\left(M_1+M_2\right)}{\partial t}=M_1^{\prime}+M_2^{\prime}=0, \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;(1)`}
              />
              <p className="for-mt-secondary">leading to</p>
              <MathComponent
                tex={String.raw` \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; M_1^{\prime}=-M_2^{\prime} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                Substituting this into the expression for W (M<sub>1</sub>, M
                <sub>2</sub>), we obtain that
              </p>
              <MathComponent
                tex={String.raw`W\left(M_1, M_2\right)=M_1 \cdot M_2^{\prime}-\left(-M_2^{\prime}\right) \cdot M_2=M_1 \cdot M_2^{\prime}+M_2^{\prime} \cdot M_2=M_2^{\prime} \cdot\left(M_1+M_2\right) .`}
              />
              <p className="for-mt-secondary">
                Apparently, W (M<sub>1</sub>, M<sub>2</sub>) &#8800; 0 at least
                for some t, providing that M<sub>1</sub>, M<sub>2</sub> are
                linearly independent functions of time. However, it is important
                to note that in view of the equality, M<sub>1</sub>
                <sup>'</sup>, M<sub>2</sub>
                <sup>'</sup> are not linearly independent.
                <br />
                The linear independence of M<sub>1</sub> and M<sub>2</sub> means
                that any new asset M<sub>3</sub> in the vector space with basis
                functions M1 and M2 can be represented as
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;M_3=\omega_1 \cdot M_1+\omega_2 \cdot M_2 \text {, }\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                where ω<sub>1</sub> and ω<sub>2</sub> are not simultaneously 0.
                <br />
                Evidently, for any ω<sub>3</sub> ̸= −1, we can write
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\omega_1 \cdot M_1+\omega_2 \cdot M_2+\omega_3 M_3 \neq 0\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                for the above ω<sub>1</sub> and ω<sub>2</sub>. Therefore, M
                <sub>1</sub>, M<sub>2</sub> and M<sub>3</sub> are linearly
                independent functions forming a basis for a new,
                higher-dimensional vector space, in which, any new asset M4 can
                be represented as
              </p>
              <MathComponent
                tex={String.raw`\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;M_4=\omega_1 \cdot M_1+\omega_2 \cdot M_2+\omega_3 M_3\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;`}
              />
              <p className="for-mt-secondary">
                In a similar fashion, one can show that in the n-dimensional
                space with basis functions M<sub>1</sub>, M<sub>2</sub>, . . .,
                M<sub>n</sub>, the new asset M<sub>BTC</sub> can be represented
                as
              </p>
              <MathComponent
                tex={String.raw` M_{\mathrm{BTC}}=\sum_{k=1}^n \omega_k \cdot M_k \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;(2)`}
              />
              <p className="for-mt-secondary">
                with ω<sub>k</sub> ̸= −1 which is satisfied in our case since all
                ωk &gt; 0.
                <br />
                Hereinafter, M<sub>k</sub> is regarded as the total
                capitalization of Market k, and ω<sub>k</sub>– as the
                substitution of Market k.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepresentationofaNewAssetClassviaSubstitution;
