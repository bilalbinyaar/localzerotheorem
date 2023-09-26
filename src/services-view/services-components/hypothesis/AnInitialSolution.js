import React from 'react';
import '../../../components/resources/ResourcesTextual.css';
import { MathComponent } from 'mathjax-react';
import img1 from '../../../assets/initial-solution/2-01.png';
import img2 from '../../../assets/initial-solution/3-01.png';
import img3 from '../../../assets/initial-solution/3-011.png';
import img4 from '../../../assets/initial-solution/1i.png';
import img5 from '../../../assets/initial-solution/2i.png';
import img6 from '../../../assets/initial-solution/3i.png';
import img7 from '../../../assets/initial-solution/4i.png';
import img8 from '../../../assets/initial-solution/5i.png';
import img9 from '../../../assets/initial-solution/6i.png';
import img10 from '../../../assets/initial-solution/7i.png';
import img11 from '../../../assets/initial-solution/8i.png';
import img12 from '../../../assets/initial-solution/9i.png';
import img13 from '../../../assets/initial-solution/10i.png';
import ServicesSideBar from '../ServicesSideBar';

const AnInitialSolution = () => {
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
                An Initial Solution to Zero Theorem
              </h1>

              <h2 className="for-mt-primary">Simplified Variant</h2>
              <MathComponent
                tex={String.raw`\pi_{B T C}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n \alpha_k \cdot P_k \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln (b)-\ln (h)+\ln (d)\right]`}
              />

              <h2 className="for-mt-primary">
                Reinforcement Learning as a Solution
              </h2>
              <p className="for-mt-secondary">
                Reinforcement learning is a field of machine learning where an
                agent sequentially interacts with the environment and tries to
                achieve a goal by maximising the long-term reward. Traditional
                reinforcement learning methods are only applicable to
                small-scale problems. To overcome the limitations of traditional
                reinforcement learning methods, DeepMind presented a
                groundbreaking work where they combined recent advances of deep
                learning and traditional reinforcement learning methods. The
                proposal of DQN lead to the emergence of a new field called deep
                reinforcement learning (DRL). Since DQN, various advanced
                methods have been proposed that can solve large-scale complex
                tasks. The field of DRL has variety of applications such as in
                finance, healthcare, robotics, e-games, advertisement, and
                communication networks.
              </p>
              <div className="img-doc for-mt-primary">
                <img src={img1} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 1: Reinforcement learning framework where agent interacts
                with the environment by taking some action and receiving reward.
                Based on the taken action, the state of environment changes and
                agent receives reward.
                <br />
                <br />
                As shown in Figure 4, agent interacts with the environment
                (system) and tries to learn a policy (strategy) that maximises
                future rewards. Specifically, at each timestep, the agent takes
                current state as input and takes an action based on its past
                experience. Based on the action, agent receives a reward and the
                environment moves to a new state. The goal of the agent is to
                learn a policy that maximises longterm future reward. DRL
                methods (algorithns) can be categorised into different types,
                for instance, online and offline (datadriven) DRL methods. In
                online methods, agent interacts with the environment and learns
                to maximise the reward. Whereas offline DRL methods do not
                require online interaction with the environment instead they can
                learn from a pre-collected expert dataset.
                <br />
                <br />
                The selection of the DRL method is dependent of the nature of
                the problem in-hand, for example, policy gradient-based methods
                are used to solve continuous control problems. In our case
                (simplified variant), we need to estimate ln α to solve
                Equation. 1 and get an estimated π<sup>′</sup>
                <sub>BTC</sub> Estimating ln α is a continuous control problem
                since ln α is a continuous number between a certain range
                (explained in action space subsection). There are various
                advanced DRL algorithms that can be used to estimate ln α such
                as twin delayed deep deterministic policy gradients [4].
                However, it is important to first formulate the problem and then
                consider the selection of DRL algorithm. Therefore, in the next
                section, we formulate our problem in the form that can be solved
                by DRL algorithms.
              </p>

              <h2 className="for-mt-primary">Problem formulation</h2>
              <p className="for-mt-secondary">
                We first need to create an environment that will enable DRL
                algorithm(s) to learn and achieve the desired goal, i.e.,
                estimate ln α and calculate π<sup>′</sup>
                <sub>BTC</sub> that reduces error and achieves higher target
                accuracy. In order to create an environment, we need to define a
                state space (input to the DRL agent), action space (output of
                DRL agent), and reward function (guides the DRL agent to achieve
                the desired goal). The success of any DRL method is highly
                dependent on the design of state space, action space, and reward
                function. Therefore, these components should be defined
                carefully.
              </p>
              <h3 className="for-mt-primary">State space</h3>
              <p className="for-mt-secondary">
                Before defining the state space, we first introduce following
                terms:
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
& -\mathrm{s} 1=\ln \left(\sum_{k=1}^n P_k \cdot R_k\right)_{@ t}-\ln \left(\sum_{k=1}^n P_k \cdot R_k\right)_{@ t-1} \\
& -\mathrm{s} 2=\ln (b) \propto t-\ln (b)_{@ t-1} \\
& -\mathrm{s} 3=\ln (h) \propto t-\ln (h) \propto t-1 \\
& -\mathrm{s} 4=\ln (d){ }^{\alpha t}-\ln (d) a t-1 \\
& -\mathrm{s} 5=\ln \left(\frac{1}{n} \sum_{j=1}^n T_j^{\prime}\right)_{\alpha t}-\ln \left(\frac{1}{n} \sum_{j=1}^n T_j^{\prime}\right)_{\Delta t-1} \\
& -s 6=\ln \left(\pi_{B T C}\right)_{a t-1}-\ln \left(\pi_{B T C}\right)_{a t-2} \\
&
\end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                These terms (s1 to s6) are in log difference format such that
                the log value of previous timestep (t − 1) is subtracted from
                the log value of current timestep (t). It can be seen that these
                terms are taken from the Equation 1. The term s6 represents log
                difference value of previous timestep, i.e., if the current
                timestep is t then the log value π<sub>BTC</sub> at t − 2 is
                subtracted from the log value of πBT C at t−1. This is due to
                the fact that we are estimating the π<sub>BTC</sub> for current
                timestep and we do not know its value. Now we define state space
                vector S as follows:
              </p>
              <MathComponent
                tex={String.raw`\mathbf{S}=[\mathrm{s} 1, \mathrm{~s} 2, \mathrm{~s} 3, \mathrm{~s} 4, \mathrm{~s} 5, \mathrm{~s} 6]`}
              />
              <p className="for-mt-secondary">
                It can be seen that the state space vector consists of all the
                relevant information required to estimate π<sup>′</sup>
                <sub>BTC</sub>
              </p>
              <h3 className="for-mt-primary">Action space</h3>
              <p className="for-mt-secondary">
                As we need to estimate α, the action space is defined as A = [a]
                where a represents α and it is a continuous variables. Here, we
                need to define the range for a such that the DRL algorithm has a
                bounded space to search from. To do that, we used the data
                provided in the dataset for the calculation of α. After solving
                the Equation 1 with the given dataset, we get the ranges of α in
                the log difference. The distribution plot of α is shown in
                Figure 2.
              </p>
              <div className="img-doc for-mt-primary">
                <img src={img2} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 2: The distribution plot of α in terms of log difference
                values, i.e., ln(α)<sub>t</sub> − ln(α)<sub>t-1</sub>
              </p>
              <p className="for-mt-secondary">
                We define action range between [-1, 1] and use a scaling
                function that will scale a to α. The scaling function improves
                the learning of the DRL agent and it is defined as follow:
              </p>
              <MathComponent
                tex={String.raw`a_t^{\text {scaled }}=\frac{\left(a_t-\eta_{\min }\right) \cdot\left(\zeta_{\max }-\zeta_{\min }\right)}{\eta_{\max }-\eta_{\min }}+\zeta_{\min }`}
              />
              <p className="for-mt-secondary">
                where a<sup>scaled</sup>
                <sub>t</sub>
                is the rescaled action at timestep t, a<sub>t</sub> is actual
                action at timestep t, η<sub>min</sub> and η<sub>max</sub> are
                source (α) range min and max respectively, ζ<sub>min</sub> and ζ
                <sub>max</sub> are destination range ([-1, 1]) min and max
                respectively.
              </p>
              <h3 className="for-mt-primary">Reward function</h3>
              <p className="for-mt-secondary">
                Reward function plays a key role in the success of DRL
                algorithm, therefore, it should be carefully designed. Here, we
                are trying to achieve two objectives: (1) maximise target
                accuracy (2) minimise error on π<sup>′</sup>
                <sub>BTC</sub>. A reward function is derived that can achieve
                both objectives simultaneously. The details of the reward
                function are below.
                <br />
                <br />
                Lets assume a DRL agent is interacting with the trading
                environment and its task is to estimate α for current timestep.
                The current timestep is denoted as t, previous timestep is
                denoted as t − 1 and next timestep is denoted as t + 1. Since
                this is a training environment, we do have access to actual
                closing prices which can be written as π<sup>′</sup>
                <sub>BTC actual @t+1</sub> and π<sup>′</sup>
                <sub>BTC actual @t</sub>, i.e., actual closing price for current
                and previous timestep respectively. Further, we define π
                <sub>positive @t</sub> as (high−open)/close and π
                <sub>negative @t</sub> as (low−open)/close. The DRL agent takes
                action at which is then rescaled as a scaled t and executed in
                the environment. Then agent receives a reward using the
                following reward function:
              </p>
              <MathComponent
                tex={String.raw`
            r(t)=r_{\text {target }}(t)+r_{\text {error }}(t)
            `}
              />
              <p className="for-mt-secondary">
                where r<sub>target</sub> is the target accuracy reward defined a
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            r_{\text {target }}(t)= g(t) & \pi_{B T C \text { estimated } a t}^{\prime} \geq 0 \\ f(t) & \text { otherwise }
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">with</p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            g(t)= 1 & \pi_{B T C \text { estimated }}^{\prime} \Delta t \leq \pi_{\text {positive }} \Delta t \\ -1 & \text { otherwise }
            \end{eqnarray}`}
              />
              {/* <p className="for-mt-secondary">and</p> */}
              {/* <MathComponent tex={String.raw`\begin{eqnarray}
            f(t)= 1 & \mid \pi_{B T C}^{\prime} \text { estimated } ₫ t|\leq| \pi_{\text {negative }} a t \mid \\ -1 & \text { otherwise }
            \end{eqnarray}`} /> */}
              {/* <MathComponent tex={String.raw`\begin{eqnarray}
            dummy
            \end{eqnarray}`} /> */}
              <p className="for-mt-secondary">
                The reward for minimising error on π<sup>′</sup>
                <sub>BTC</sub> is defined as follow
              </p>
              <MathComponent
                tex={String.raw`r_{\text {error }}=-1 \cdot\left|\pi_{B T C \text { actual }}^{\prime} \Delta t-\pi_{B T C \text { estimated } @ t+1}^{\prime}\right|`}
              />
              <div className="img-doc for-mt-primary">
                <img src={img3} alt="p1" />
              </div>
              <p className="for-mt-secondary">Fig. 3: s</p>

              <h2 className="for-mt-primary">DRL Algorithms</h2>
              <h3 className="for-mt-primary">DDPG</h3>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            L(\theta)=\mathbb{E}_{s_t, a_t, r_{t+1}, s_{t+1} \sim D}\left[\left(r_{t+1}+\gamma Q_{\theta^{\prime}}\left(s_{t+1}, \pi_{\phi^{\prime}}\left(s_{t+1}\right)\right)-Q_\theta\left(s_t, a_t\right)\right)^2\right] \\
            J(\phi)=\mathbb{E}_{s_t \sim D}\left[Q_\theta\left(s_t, \pi_\phi\left(s_t\right)\right)\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                where θ 0 and φ are the target network parameters. There target
                network parameters are updated every iteration.
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            \theta^{\prime} \leftarrow \tau \theta+(1-\tau) \theta^{\prime} \\
            \phi^{\prime} \leftarrow \tau \phi+(1-\tau) \phi^{\prime}
            \end{eqnarray}`}
              />
              <h3 className="for-mt-primary">TD3</h3>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            L\left(\theta_i\right)=\mathbb{E}_{s_t, a_t, r_{t+1}, s_{t+1} \sim D}\left[\left(r_{t+1}+\gamma \min _j Q_{\theta_j^{\prime}}\left(s_{t+1}, \pi_{\phi^{\prime}}\left(s_{t+1}\right)+\epsilon\right)-Q_{\theta_i}\left(s_t, a_t\right)\right)^2\right] \\
            J(\phi)=\mathbb{E}_{s_t \sim D}\left[\min _i Q_{\theta_i}\left(s_t, \pi_\phi\left(s_t\right)\right)\right]
            \end{eqnarray}`}
              />

              <h3 className="for-mt-primary">SAC</h3>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            L\left(\theta_i\right)=\mathbb{E}_{s_t, a_t, r_{t+1}, s_{t+1} \sim D, a_{t+1} \sim \pi_\phi\left(\cdot \mid s_{t+1}\right)}\left[\left(y-Q_{\theta_i}\left(s_t, a_t\right)\right)^2\right] \\
            y=r_{t+1}+\gamma\left(\min _j Q_{\theta_j}\left(s_{t+1}, a_{t+1}\right)-\alpha \log \left(\pi_\phi\left(a_{t+1} \mid s_{t+1}\right)\right)\right) \\
            J(\phi)=\mathbb{E}_{s_t \sim D, a_t \sim \pi_\phi\left(\cdot \mid s_t\right)}\left[\alpha \log \left(\pi_\phi\left(a_t \mid s_t\right)\right)-\min _i Q_{\theta_i}\left(s_t, \pi_\phi\left(a_t \mid s_t\right)\right)\right]
            \end{eqnarray}`}
              />

              <p className="for-mt-secondary">
                The temperature parameter α is also automatically adjustable
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            J(\alpha)=\mathbb{E}_{s_t \sim D, a_t \sim \pi_\phi\left(\cdot \mid s_t\right)}\left[-\alpha\left(\log \left(\pi_\phi\left(a_t \mid s_t\right)\right)+H\right)\right]
            \end{eqnarray}`}
              />

              <h3 className="for-mt-primary">CQL</h3>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            L\left(\theta_i\right)=\alpha \mathbb{E}_{s_t \sim D}\left[\log \sum_a \exp Q_{\theta_i}\left(s_t, a\right)-\mathbb{E}_{a \sim D}\left[Q_{\theta_i}(s, a)\right]-\tau\right]+L_{\mathrm{SAC}}\left(\theta_i\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                where α is an automatically adjustable value via Lagrangian dual
                gradient descent and τ is a threshold value. If the action-value
                difference is smaller than τ , the α will become smaller.
                Otherwise, the α will become larger to aggressively penalize
                action-values. In continuous control, log Σ<sub>a</sub>
                exp Q(s, a) is computed as follows
              </p>
              {/* <MathComponent tex={String.raw`\begin{eqnarray}
            \log \sum_a \exp Q(s, a) \approx \log \left(\frac{1}{2 N} \sum_{a_i \sim \operatorname{Unf}(a)}^N\left[\frac{\exp Q\left(s, a_i\right)}{\operatorname{Unif}(a)}\right]+\frac{1}{2 N} \sum_{a_i \sim \pi_\phi(a \mid s)}^N\left[\frac{\exp Q\left(s, a_i\right)}{\pi_\phi\left(a_i \mid s\right)}\right]\right)
            \end{eqnarray}`} /> */}
              {/* <MathComponent tex={String.raw`\begin{eqnarray}
            dummy
            \end{eqnarray}`} /> */}

              <h3 className="for-mt-primary">AWR</h3>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            L(\theta)=\mathbb{E}_{s_t, R_t \sim D}\left[\left(R_t-V\left(s_t \mid \theta\right)\right)^2\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                where Rt is approximated using TD(λ) to mitigate high variance
                issue. The policy function is also trained as a supervised
                regression problem
              </p>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            J(\phi)=\mathbb{E}_{s_t, a_t, R_t \sim D}\left[\log \pi\left(a_t \mid s_t, \phi\right) \exp \left(\frac{1}{B}\left(R_t-V\left(s_t \mid \theta\right)\right)\right)\right]
            \end{eqnarray}`}
              />

              <h3 className="for-mt-primary">AWAC</h3>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            J(\phi)=\mathbb{E}_{s_t, a_t \sim D}\left[\log \pi_\phi\left(a_t \mid s_t\right) \exp \left(\frac{1}{\lambda} A^\pi\left(s_t, a_t\right)\right)\right]
            \end{eqnarray}`}
              />
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            A^\pi\left(s_t, a_t\right)=Q_\theta\left(s_t, a_t\right)-Q_\theta\left(s_t, a_t^{\prime}\right)$ and $a_t^{\prime} \sim \pi_\phi\left(\cdot \mid s_t\right)$
            \end{eqnarray}`}
              />

              <h3 className="for-mt-primary">PLAS</h3>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            a \sim p_\beta\left(a \mid s, z=\pi_\phi(s)\right)
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                where β is a parameter of the decoder in Conditional VAE
              </p>

              <h3 className="for-mt-primary">BEAR</h3>
              <MathComponent
                tex={String.raw`\begin{eqnarray}
            L(\beta)=\mathbb{E}_{s_t, a_t \sim D, a \sim \pi_\beta\left(\cdot \mid s_t\right)}\left[\left(a-a_t\right)^2\right]
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                The policy objective is a combination of SAC’s objective and MMD
                penalty.
              </p>
              {/* <MathComponent tex={String.raw`\begin{eqnarray}
            J(\phi)=J_{S A C}(\phi)-\mathbb{E}_{s_t \sim D} \alpha\left(\operatorname{MMD}\left(\pi_\beta\left(\cdot \mid s_t\right), \pi_\phi\left(\cdot \mid s_t\right)\right)-\epsilon\right)
            \end{eqnarray}`} /> */}
              {/* <MathComponent tex={String.raw`\begin{eqnarray}
            dummy
            \end{eqnarray}`} /> */}
              <p className="for-mt-secondary">
                where MMD is computed as follows.
              </p>

              <MathComponent
                tex={String.raw`\begin{eqnarray}
            {MMD}(x, y)= \frac{1}{N^2} \sum_{i, i^{\prime}} k\left(x_i, x_{i^{\prime}}\right)-\frac{2}{N M} \sum_{i, j} k\left(x_i, y_j\right)+\frac{1}{M^2} \sum_{j, j^{\prime}} k\left(y_j, y_{j^{\prime}}\right)
            
            \end{eqnarray}`}
              />
              <p className="for-mt-secondary">
                where k(x, y) is a gaussian kernel k(x, y) = exp ((x − y)
                <sup>2</sup> / 2σ<sup>2</sup>))
              </p>

              <h2 className="for-mt-primary">Experimental results</h2>
              <div className="img-doc ">
                <img src={img4} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 5: TD3 Residual graphs (a) sample quantiles vs. theoretical
                quantiles (b) residuals vs. fitted values, (c) histograms of
                residuals, and (d) residuals vs. the order of the data.
              </p>
              <div className="img-doc ">
                <img src={img5} alt="p1" />
              </div>

              <p className="for-mt-secondary">
                Fig. 6: A2C Residual graphs (a) sample quantiles vs. theoretical
                quantiles (b) residuals vs. fitted values, (c) histograms of
                residuals, and (d) residuals vs. the order of the data.
              </p>
              <div className="img-doc ">
                <img src={img6} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 7: PPO Residual graphs (a) sample quantiles vs. theoretical
                quantiles (b) residuals vs. fitted values, (c) histograms of
                residuals, and (d) residuals vs. the order of the data
              </p>
              <div className="img-doc ">
                <img src={img7} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 8: DDPG Residual graphs (a) sample quantiles vs.
                theoretical quantiles (b) residuals vs. fitted values, (c)
                histograms of residuals, and (d) residuals vs. the order of the
                data.
              </p>
              <div className="img-doc ">
                <img src={img8} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 9: SAC Residual graphs (a) sample quantiles vs. theoretical
                quantiles (b) residuals vs. fitted values, (c) histograms of
                residuals, and (d) residuals vs. the order of the data
              </p>
              <div className="img-doc ">
                <img src={img9} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 10: CQL Residual graphs (a) sample quantiles vs.
                theoretical quantiles (b) residuals vs. fitted values, (c)
                histograms of residuals, and (d) residuals vs. the order of the
                data.
              </p>
              <div className="img-doc for-mt-secondary">
                <img src={img10} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 11: BEAR Residual graphs (a) sample quantiles vs.
                theoretical quantiles (b) residuals vs. fitted values, (c)
                histograms of residuals, and (d) residuals vs. the order of the
                data.
              </p>
              <div className="img-doc ">
                <img src={img11} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 12: PLAS Residual graphs (a) sample quantiles vs.
                theoretical quantiles (b) residuals vs. fitted values, (c)
                histograms of residuals, and (d) residuals vs. the order of the
                data.
              </p>
              <div className="img-doc ">
                <img src={img12} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 13: AWAC Residual graphs (a) sample quantiles vs.
                theoretical quantiles (b) residuals vs. fitted values, (c)
                histograms of residuals, and (d) residuals vs. the order of the
                data.
              </p>
              <div className="img-doc ">
                <img src={img13} alt="p1" />
              </div>
              <p className="for-mt-secondary">
                Fig. 14: AWR Residual graphs (a) sample quantiles vs.
                theoretical quantiles (b) residuals vs. fitted values, (c)
                histograms of residuals, and (d) residuals vs. the order of the
                data
              </p>

              {/* <h2 className="for-mt-primary">References</h2>
            <p className="for-mt-secondary">
              1. V. Mnih, K. Kavukcuoglu, D. Silver, A. A. Rusu, J. Veness, M. G. Bellemare, A. Graves,
M. Riedmiller, A. K. Fidjeland, G. Ostrovski et al., “Human-level control through deep reinforcement learning,” nature, vol. 518, no. 7540, pp. 529–533, 2015.
              <br/>
              2. V. Talpaert, I. Sobh, B. R. Kiran, P. Mannion, S. Yogamani, A. El-Sallab, and P. Perez, “Exploring applications of deep reinforcement learning for real-world autonomous driving systems,”
arXiv preprint arXiv:1901.01536, 2019.
              <br/>
3. N. C. Luong, D. T. Hoang, S. Gong, D. Niyato, P. Wang, Y.-C. Liang, and D. I. Kim, “Applications of deep reinforcement learning in communications and networking: A survey,” IEEE
Communications Surveys & Tutorials, vol. 21, no. 4, pp. 3133–3174, 2019
              <br/>
4. S. Fujimoto, H. Hoof, and D. Meger, “Addressing function approximation error in actor-critic
methods,” in International Conference on Machine Learning. PMLR, 2018, pp. 1587–1596.
              <br/>
5. V. Mnih, A. P. Badia, M. Mirza, A. Graves, T. Lillicrap, T. Harley, D. Silver, and
K. Kavukcuoglu, “Asynchronous methods for deep reinforcement learning,” in International
conference on machine learning. PMLR, 2016, pp. 1928–1937
              <br/>
6. J. Schulman, F. Wolski, P. Dhariwal, A. Radford, and O. Klimov, “Proximal policy optimization
algorithms,” arXiv preprint arXiv:1707.06347, 2017.
              <br/>
7. T. P. Lillicrap, J. J. Hunt, A. Pritzel, N. Heess, T. Erez, Y. Tassa, D. Silver, and D. Wierstra,
“Continuous control with deep reinforcement learning,” arXiv preprint arXiv:1509.02971, 2015.
              <br/>
8. T. Haarnoja, A. Zhou, P. Abbeel, and S. Levine, “Soft actor-critic: Off-policy maximum entropy
deep reinforcement learning with a stochastic actor,” in International Conference on Machine
Learning. PMLR, 2018, pp. 1861–1870.
              <br/>
9. A. Kumar, A. Zhou, G. Tucker, and S. Levine, “Conservative q-learning for offline reinforcement
learning,” arXiv preprint arXiv:2006.04779, 2020.

              <br/>
10. A. Kumar, J. Fu, G. Tucker, and S. Levine, “Stabilizing off-policy q-learning via bootstrapping
error reduction,” arXiv preprint arXiv:1906.00949, 2019

              <br/>
11. W. Zhou, S. Bajracharya, and D. Held, “Plas: Latent action space for offline reinforcement
learning,” arXiv preprint arXiv:2011.07213, 2020.

              <br/>
12. A. Nair, M. Dalal, A. Gupta, and S. Levine, “Accelerating online reinforcement learning with
offline datasets,” arXiv preprint arXiv:2006.09359, 2020.

              <br/>
13. X. B. Peng, A. Kumar, G. Zhang, and S. Levine, “Advantage-weighted regression: Simple and
scalable off-policy reinforcement learning,” arXiv preprint arXiv:1910.00177, 2019.
              <br/>
14. A. Raffin, A. Hill, M. Ernestus, A. Gleave, A. Kanervisto, and N. Dormann, “Stable baselines3,”
https://github.com/DLR-RM/stable-baselines3, 2019.

              <br/>
15. T. Seno, “d3rlpy: An offline deep reinforcement library,” https://github.com/takuseno/d3rlpy,
2020
</p> */}

              {/* <div className="document">
              {theme === "dark-theme" ? (
                <div className="img-doc">
                  <img src={P1Night} alt="p1" />
                </div>
              ) : (
                <div className="img-doc">
                  <img src={P1Day} alt="p1" />
                </div>
              )}
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnInitialSolution;
