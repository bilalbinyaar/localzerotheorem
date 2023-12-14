// THIS COMPONENT IS BEING USED
import { Link } from 'react-router-dom';
import './FAQ.css';

var link = <Link to="/derivations">derivations</Link>;

export const questions = [
  {
    id: 1,
    question: 'What is Zero Theorem?',
    answer: (
      <p className="answers-api">
        Zero Theorem is an economic framework consisting of state-of-the-art
        machine learning methods used for an empirical proof on a set of
        governing equations that value digital assets. The resultant output of
        the proof is a range of forward price estimations (or forecasted
        directions) for Bitcoin and similar proof of work (PoW)
        crypto-currencies. If you like to dive deep into the math please go to
        our {link} page.{' '}
      </p>
    ),
  },

  {
    id: 2,
    question: 'What is the Zero Proof Protocol?',
    answer:
      'If a pricing theory has true descriptive power its ability to predict directional movements effectively and consistently should be unquestionable with practical consequence. The Zero Proof Protocol is an empirical method of proving pricing models via subjecting them to real life market conditions and monitoring their hypothetical trading performance. All models on Zero Theorem are utilizing a Zero Proof Protocol in order to validate their legitimacy.',
  },

  {
    id: 3,
    question:
      'What are the different k markets used for the P and R variables?',
    answer:
      'We use a range of financial metrics (predominately index futures) to represent all the different asset classes that make up the total asset universe. Here we use both individual assets and proxy instruments for currencies, equities, fixed income, real estate, commodities, and alternative cryptocurrencies.',
  },

  {
    id: 4,
    question:
      'If the governing equations can be analytically solved, why is there a need for an RL solution?',
    answer: (
      <p className="answers-api">
        The Zero Theorem equation can be analytically solved if one has a time
        dependent value that is dynamically updated for α<sub>k</sub> for k
        quantity of markets. Since the substitution phenomena is unknown, Zero
        Theorem opts to use deep reinforcement learning to forecast this
        parameter for every k market for every time interval.
      </p>
    ),
  },
];

export const questions1 = [
  {
    id: 5,
    question: 'Why are there so many models for a singular equation?',
    answer: (
      <p className="answers-api">
        There are many different machine learning methods that can be used to
        predict 𝛼<sub>k</sub> for k quantity of markets in the Zero Theorem
        governing equation. Even a single learner has multitude of hyper
        paramteres that can be altered to produce a unique solution. Hence, on
        this website, we provide the full range of potential solutions using
        state-of-the-art machine learning methods.
      </p>
    ),
  },

  {
    id: 6,
    question: 'Why is there only Bitcoin forecasts?',
    answer:
      'Zero Theorem was developed to provide a forward valuation for Bitcoin. However, the governing equations can be used for a variety of Proof of Work digital assets. In the future Zero Theorem will release forecasts for a range of alternative cryptocurrencies.',
  },

  {
    id: 7,
    question: 'What time zone is used for forecasts?',
    answer: 'UTC, however all models reference your local machine clock.',
  },

  {
    id: 8,
    question: 'How have the ZT models been back tested?',
    answer:
      'The models have been thoroughly back tested on both seen and unseen data sets. The metrics shown on the website are a combination of the back tested results and the inclusion of live data moving forward. Every day new metrics are calculated based on the live performance of the previous day.',
  },

  {
    id: 9,
    question: 'Where do I find the accuracy statistics per model?',
    answer:
      'The accuracy of any model can be viewed directly at the bottom of its individual page. There you will find the specific drawdown, win/loss metrics, and general statistics that make up the overall performance of a model.',
  },

  {
    id: 10,
    question: 'What are the ranking criteria between model forecasts?',
    answer:
      'At the moment models are ranked based on their total achieved yield. Please note that this may not be the optimal metric to rank models.',
  },
];

export const questions2 = [
  {
    id: 11,
    question: 'What does long and short mean?',
    answer:
      'In futures trading lingo, long means one is buying a positive contract (if the price increases, one makes money from the appreciation and if the price decreases one losses money from the depreciation). The opposite of long is a short, where one is buying a negative contract (if the price decreases one makes money from the depreciation and if the price increases, one loses money from the appreciation). ',
  },

  {
    id: 12,
    question: 'What time do the hypothetical trades open and close?',
    answer:
      'Positions are typically opened and closed only if the model predicts a directional change.',
  },

  {
    id: 13,
    question:
      'Why are there no risk controls (stop loss/take profit) being applied to the directional forecast of the models?',
    answer:
      'Our goal is to prove that models resulting from the Zero Theorem governing equations do produce superior foresight and performance without the need of risk control interventions. Risk controls themselves should only enhance a model’s already inherent performance to drive up yield consistency and reduce drawdown intensity and durations.',
  },

  {
    id: 14,
    question:
      'Are trading fees taken into account within the performance analysis?',
    answer:
      'No. Trading fees are not taken into account as of yet. There will be a feature in the future that will allow users to observe the impact of trading fees for all individual models.',
  },

  {
    id: 15,
    question: 'How do we use the Zero Theorem models to make money?',
    answer:
      'We do not provide financial or investment advice. Please treat the content of this entire website as an academic exercise to prove the existence of a robust pricing theory for Bitcoin.',
  },
];

export const questions3 = [
  {
    id: 16,
    question: 'Who is SOREZ?',
    answer:
      'SOREZ is a pseudonymous group of quants responsible for the Zero Theorem infrastructure, the derivation of Zero Theorem governing equation, and the development of the Zero Theorem machine learning models and solutions.',
  },

  {
    id: 17,
    question: 'What is a quant and what do they do?',
    answer:
      'The word quant is a slang for quantitative researcher/developer who uses a scientific approach (economics, mathematics, and statistics) with computer algorithms/programs to develop investment decisions, simulate asset behaviour, or determine asset risk.',
  },
];
