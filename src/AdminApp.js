import React, { memo, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Models from './pages/Models';
import { Routes, Route, useLocation } from 'react-router-dom';
// import LoginForm from './components/loginPrompt/LoginForm';
import { useStateContext } from './ContextProvider';
import Footer from './components/footer/Footer';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Compare from './pages/Compare';
import AlternativeBassModelforAlpha from '../src/components/resources/derivations/AlternativeBassModelforAlpha';
import AlternativeFrechetModelforAlpha from '../src/components/resources/derivations/AlternativeFrechetModelforAlpha';
import AlternativeGumbelModelforAlpha from '../src/components/resources/derivations/AlternativeGumbelModelforAlpha';
import AlternativeShiftedGompertzModelforAlpha from '../src/components/resources/derivations/AlternativeShiftedGompertzModelforAlpha';
import AlternativeWeibulModelforAlpha from '../src/components/resources/derivations/AlternativeWeibulModelforAlpha';
// import AnInitialSolution from '../src/components/resources/derivations/AnInitialSolution';
import Derivations from '../src/components/resources/derivations/Derivations';
import FurtherDerivations from '../src/components/resources/derivations/FurtherDerivations';
import InvestigatingAlpha from '../src/components/resources/derivations/InvestigatingAlpha';
import RepresentationofaNewAssetClassviaSubstitution from '../src/components/resources/derivations/RepresentationofaNewAssetClassviaSubstitution';
import SensitivityAnalysisGeneralCase from '../src/components/resources/derivations/SensitivityAnalysisGeneralCase';
import SenstitivityAnalysisMarketSpecificAlpha from '../src/components/resources/derivations/SenstitivityAnalysisMarketSpecificAlpha';
import SenstitivityAnalysisSingleAlphaCas from '../src/components/resources/derivations/SenstitivityAnalysisSingleAlphaCas';
import TheGoverningEquation from '../src/components/resources/derivations/TheGoverningEquation';
import TheUnderlyingAssumptions from '../src/components/resources/derivations/TheUnderlyingAssumptions';
import Documentation from './pages/Documentation';
import Signup from './components/Authentication/Signup';
import RegistrationForm from './components/apiRegistrationForm/RegistrationForm';
import Contact from './components/contact/Contact';
import Performance from './pages/Performance';
import RiskManagement from './pages/RiskManagement';
import BacktestRouteComponentModels from './components/backtest/BacktestRouteComponentModels';
import BacktestRouteComponentStrategies from './components/backtest/BacktestRouteComponentStrategies';
import CompareStrategies from './pages/CompareStrategies';
// import AccountDetails from './pages/AccountDetails';

function App() {
  const { loading } = useStateContext();

  // SCROLL TO TOP
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // SCROLL TO TOP
  return (
    !loading && (
      <React.Fragment>
        <div>
          <Navbar />
          <Routes basename="/zero-theorem">
            <Route path="/" element={<Home />} />
            <Route path="/theory" element={<TheUnderlyingAssumptions />} />
            <Route path="/:name" element={<Models />} />
            <Route path="/about" element={<About />} />
            <Route path="/performance" element={<Performance />} />

            <Route path="/faqs" element={<FAQ />} />
            {/* <Route path="/login" element={<LoginForm />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/api-registration" element={<RegistrationForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/all-models" element={<Home />} />
            <Route path="/compare-strategies" element={<CompareStrategies />} />
            <Route
              path="/backtest-strategies"
              element={<BacktestRouteComponentStrategies />}
            />
            <Route path="/compare-models" element={<Compare />} />
            <Route
              path="/backtest-models"
              element={<BacktestRouteComponentModels />}
            />
            <Route path="/api" element={<Documentation />} />
            <Route path="/risk-management" element={<RiskManagement />} />

            {/* RESOURCES ROUTING FOR SUB ITEMS */}
            <Route
              path="/the-underlying-assumptions"
              element={<TheUnderlyingAssumptions />}
            />
            <Route
              path="/representation-of-a-new-asset-class-via-substitution"
              element={<RepresentationofaNewAssetClassviaSubstitution />}
            />
            <Route
              path="/the-governing-equation"
              element={<TheGoverningEquation />}
            />
            <Route
              path="/investigating-alpha"
              element={<InvestigatingAlpha />}
            />
            <Route
              path="/sensitivity-analysis-general-case"
              element={<SensitivityAnalysisGeneralCase />}
            />
            <Route
              path="/senstitivity-analysis-market-specific-alpha"
              element={<SenstitivityAnalysisMarketSpecificAlpha />}
            />
            <Route
              path="/senstitivity-analysis-single-alpha-case"
              element={<SenstitivityAnalysisSingleAlphaCas />}
            />
            <Route path="/derivations-details" element={<Derivations />} />
            <Route
              path="/further-derivations"
              element={<FurtherDerivations />}
            />
            <Route
              path="/alternative-bass-model-for-alpha"
              element={<AlternativeBassModelforAlpha />}
            />
            <Route
              path="/alternative-frechet-model-for-alpha"
              element={<AlternativeFrechetModelforAlpha />}
            />
            <Route
              path="/alternative-weibul-model-for-alpha"
              element={<AlternativeWeibulModelforAlpha />}
            />
            <Route
              path="/alternative-gumbel-model-for-alpha"
              element={<AlternativeGumbelModelforAlpha />}
            />
            <Route
              path="/alternative-shifted-gompertz-model-for-alpha"
              element={<AlternativeShiftedGompertzModelforAlpha />}
            />
          </Routes>
          <Footer />
        </div>
      </React.Fragment>
    )
  );
}

export default memo(App);
