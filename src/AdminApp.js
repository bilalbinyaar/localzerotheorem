import React, { memo, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Models from './pages/Models';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoginForm from './components/loginPrompt/LoginForm';
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
import AnInitialSolution from '../src/components/resources/derivations/AnInitialSolution';
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
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import RegistrationForm from './components/apiRegistrationForm/RegistrationForm';
import Contact from './components/contact/Contact';
import Performance from './pages/Performance';
import RiskManagement from './pages/RiskManagement';
import BacktestRouteComponentModels from './components/backtest/BacktestRouteComponentModels';
import BacktestRouteComponentStrategies from './components/backtest/BacktestRouteComponentStrategies';
import CompareStrategies from './pages/CompareStrategies';
import AccountDetails from './pages/AccountDetails';
import ServicesEntrance from './services-view/services-pages/ServicesEntrance';
import ServicesAbout from './services-view/services-pages/ServicesAbout';
import ServicesHypothesis from './services-view/services-pages/ServicesHypothesis';
import HypoRepresentationofaNewAssetClassviaSubstitution from './services-view/services-pages/hypothesisPages/HypoRepresentationofaNewAssetClassviaSubstitution';
import HypoTheGoverningEquation from './services-view/services-pages/hypothesisPages/HypoTheGoverningEquation';
import HypoInvestigatingAlpha from './services-view/services-pages/hypothesisPages/HypoInvestigatingAlpha';
import HypoSensitivityAnalysisGeneralCase from './services-view/services-pages/hypothesisPages/HypoSensitivityAnalysisGeneralCase';
import HypoSenstitivityAnalysisMarketSpecificAlpha from './services-view/services-pages/hypothesisPages/HypoSenstitivityAnalysisMarketSpecificAlpha';
import HypoSenstitivityAnalysisSingleAlphaCas from './services-view/services-pages/hypothesisPages/HypoSenstitivityAnalysisSingleAlphaCas';
import HypoAnInitialSolution from './services-view/services-pages/hypothesisPages/HypoAnInitialSolution';
import BTCExample from './services-view/services-pages/BTCExample';
import ServicesDocs from './services-view/services-pages/ServicesDocs';
import ServicesBacktest from './services-view/services-pages/ServicesBacktest';
import ServicesCompare from './services-view/services-pages/ServicesCompare';
import ServicesContact from './services-view/services-pages/ServicesContact';

function App() {
    const { loading, checkLoginMain, authCheckLoginInvestor, authCheckLoginAdmin } = useStateContext();

    // SCROLL TO TOP
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // SCROLL TO TOP
    return (
        !loading && (
            <React.Fragment>
                {authCheckLoginAdmin === true || authCheckLoginInvestor === 'True' ? (
                    authCheckLoginInvestor === 'True' ? (
                        <div>
                            <Navbar />
                            <Routes basename="/zero-theorem">
                                <Route path="/" element={<Performance />} />
                                <Route path="/theory" element={<TheUnderlyingAssumptions />} />
                                <Route path="/:name" element={<Models />} />
                                <Route path="/account-details" element={<AccountDetails />} />
                                <Route path="/login" element={<LoginForm />} />

                                <Route
                                    path="/compare-strategies"
                                    element={<CompareStrategies />}
                                />
                                <Route
                                    path="/backtest-strategies"
                                    element={<BacktestRouteComponentStrategies />}
                                />
                                <Route path="/compare-models" element={<Compare />} />
                                <Route
                                    path="/backtest-models"
                                    element={<BacktestRouteComponentStrategies />}
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

                                <Route
                                    path="/an-initial-solution"
                                    element={<AnInitialSolution />}
                                />
                            </Routes>
                            <Footer />
                        </div>
                    ) : (
                        <div>
                            <Navbar />
                            <Routes basename="/zero-theorem">
                                <Route path="/" element={<Performance />} />
                                <Route path="/theory" element={<TheUnderlyingAssumptions />} />
                                <Route path="/:name" element={<Models />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/faqs" element={<FAQ />} />
                                <Route path="/login" element={<LoginForm />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route
                                    path="/api-registration"
                                    element={<RegistrationForm />}
                                />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/all-models" element={<Home />} />
                                <Route
                                    path="/compare-strategies"
                                    element={<CompareStrategies />}
                                />
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
                    )
                ) : (
                    <div>

                        <Routes basename="/zero-theorem">
                            <Route path="/sitemap.xml" />
                            <Route path="/login" element={<LoginForm />} />
                        </Routes>
                    </div>
                )}
            </React.Fragment>
            // <React.Fragment>
            //     {checkLoginMain === true || authCheckLoginInvestor === 'True' ? (
            //         authCheckLoginInvestor === 'True' ? (
            //             <div>
            //                 <Navbar />
            //                 <Routes basename="/zero-theorem">
            //                     <Route path="/" element={<Performance />} />
            //                     <Route path="/theory" element={<TheUnderlyingAssumptions />} />
            //                     <Route path="/:name" element={<Models />} />
            //                     <Route path="/account-details" element={<AccountDetails />} />

            //                     <Route
            //                         path="/compare-strategies"
            //                         element={<CompareStrategies />}
            //                     />
            //                     <Route
            //                         path="/backtest-strategies"
            //                         element={<BacktestRouteComponentStrategies />}
            //                     />
            //                     <Route path="/compare-models" element={<Compare />} />
            //                     <Route
            //                         path="/backtest-models"
            //                         element={<BacktestRouteComponentStrategies />}
            //                     />
            //                     <Route path="/api" element={<Documentation />} />
            //                     <Route path="/risk-management" element={<RiskManagement />} />

            //                     {/* RESOURCES ROUTING FOR SUB ITEMS */}
            //                     <Route
            //                         path="/the-underlying-assumptions"
            //                         element={<TheUnderlyingAssumptions />}
            //                     />
            //                     <Route
            //                         path="/representation-of-a-new-asset-class-via-substitution"
            //                         element={<RepresentationofaNewAssetClassviaSubstitution />}
            //                     />
            //                     <Route
            //                         path="/the-governing-equation"
            //                         element={<TheGoverningEquation />}
            //                     />
            //                     <Route
            //                         path="/investigating-alpha"
            //                         element={<InvestigatingAlpha />}
            //                     />
            //                     <Route
            //                         path="/sensitivity-analysis-general-case"
            //                         element={<SensitivityAnalysisGeneralCase />}
            //                     />
            //                     <Route
            //                         path="/senstitivity-analysis-market-specific-alpha"
            //                         element={<SenstitivityAnalysisMarketSpecificAlpha />}
            //                     />
            //                     <Route
            //                         path="/senstitivity-analysis-single-alpha-case"
            //                         element={<SenstitivityAnalysisSingleAlphaCas />}
            //                     />
            //                     <Route path="/derivations-details" element={<Derivations />} />
            //                     <Route
            //                         path="/further-derivations"
            //                         element={<FurtherDerivations />}
            //                     />
            //                     <Route
            //                         path="/alternative-bass-model-for-alpha"
            //                         element={<AlternativeBassModelforAlpha />}
            //                     />
            //                     <Route
            //                         path="/alternative-frechet-model-for-alpha"
            //                         element={<AlternativeFrechetModelforAlpha />}
            //                     />
            //                     <Route
            //                         path="/alternative-weibul-model-for-alpha"
            //                         element={<AlternativeWeibulModelforAlpha />}
            //                     />
            //                     <Route
            //                         path="/alternative-gumbel-model-for-alpha"
            //                         element={<AlternativeGumbelModelforAlpha />}
            //                     />
            //                     <Route
            //                         path="/alternative-shifted-gompertz-model-for-alpha"
            //                         element={<AlternativeShiftedGompertzModelforAlpha />}
            //                     />

            //                     <Route
            //                         path="/an-initial-solution"
            //                         element={<AnInitialSolution />}
            //                     />
            //                 </Routes>
            //                 <Footer />
            //             </div>
            //         ) : (
            //             <div>
            //                 <Navbar />
            //                 <Routes basename="/zero-theorem">
            //                     <Route path="/" element={<Performance />} />
            //                     <Route path="/theory" element={<TheUnderlyingAssumptions />} />
            //                     <Route path="/:name" element={<Models />} />
            //                     <Route path="/about" element={<About />} />
            //                     <Route path="/faqs" element={<FAQ />} />
            //                     <Route path="/login" element={<Login />} />
            //                     <Route path="/signup" element={<Signup />} />
            //                     <Route
            //                         path="/api-registration"
            //                         element={<RegistrationForm />}
            //                     />
            //                     <Route path="/contact" element={<Contact />} />
            //                     <Route path="/all-models" element={<Home />} />
            //                     <Route
            //                         path="/compare-strategies"
            //                         element={<CompareStrategies />}
            //                     />
            //                     <Route
            //                         path="/backtest-strategies"
            //                         element={<BacktestRouteComponentStrategies />}
            //                     />
            //                     <Route path="/compare-models" element={<Compare />} />
            //                     <Route
            //                         path="/backtest-models"
            //                         element={<BacktestRouteComponentModels />}
            //                     />
            //                     <Route path="/api" element={<Documentation />} />
            //                     <Route path="/risk-management" element={<RiskManagement />} />

            //                     {/* RESOURCES ROUTING FOR SUB ITEMS */}
            //                     <Route
            //                         path="/the-underlying-assumptions"
            //                         element={<TheUnderlyingAssumptions />}
            //                     />
            //                     <Route
            //                         path="/representation-of-a-new-asset-class-via-substitution"
            //                         element={<RepresentationofaNewAssetClassviaSubstitution />}
            //                     />
            //                     <Route
            //                         path="/the-governing-equation"
            //                         element={<TheGoverningEquation />}
            //                     />
            //                     <Route
            //                         path="/investigating-alpha"
            //                         element={<InvestigatingAlpha />}
            //                     />
            //                     <Route
            //                         path="/sensitivity-analysis-general-case"
            //                         element={<SensitivityAnalysisGeneralCase />}
            //                     />
            //                     <Route
            //                         path="/senstitivity-analysis-market-specific-alpha"
            //                         element={<SenstitivityAnalysisMarketSpecificAlpha />}
            //                     />
            //                     <Route
            //                         path="/senstitivity-analysis-single-alpha-case"
            //                         element={<SenstitivityAnalysisSingleAlphaCas />}
            //                     />
            //                     <Route path="/derivations-details" element={<Derivations />} />
            //                     <Route
            //                         path="/further-derivations"
            //                         element={<FurtherDerivations />}
            //                     />
            //                     <Route
            //                         path="/alternative-bass-model-for-alpha"
            //                         element={<AlternativeBassModelforAlpha />}
            //                     />
            //                     <Route
            //                         path="/alternative-frechet-model-for-alpha"
            //                         element={<AlternativeFrechetModelforAlpha />}
            //                     />
            //                     <Route
            //                         path="/alternative-weibul-model-for-alpha"
            //                         element={<AlternativeWeibulModelforAlpha />}
            //                     />
            //                     <Route
            //                         path="/alternative-gumbel-model-for-alpha"
            //                         element={<AlternativeGumbelModelforAlpha />}
            //                     />
            //                     <Route
            //                         path="/alternative-shifted-gompertz-model-for-alpha"
            //                         element={<AlternativeShiftedGompertzModelforAlpha />}
            //                     />
            //                     <Route path="/login" element={<LoginForm />} />
            //                 </Routes>
            //                 <Footer />
            //             </div>
            //         )
            //     ) : (
            //         <div>
            //             <Routes basename="/zero-theorem">
            //                 <Route path="/" element={<ServicesEntrance />} />
            //                 <Route path="/services-about" element={<ServicesAbout />} />
            //                 <Route path="/hypothesis" element={<ServicesHypothesis />} />
            //                 <Route
            //                     path="/hypothesis-of-representation-of-a-new-asset-class-via-substitution"
            //                     element={<HypoRepresentationofaNewAssetClassviaSubstitution />}
            //                 />
            //                 <Route
            //                     path="/hypothesis-of-the-governing-equation"
            //                     element={<HypoTheGoverningEquation />}
            //                 />
            //                 <Route
            //                     path="/hypothesis-of-investigating-alpha"
            //                     element={<HypoInvestigatingAlpha />}
            //                 />
            //                 <Route
            //                     path="/hypothesis-of-sensitivity-analysis-general-case"
            //                     element={<HypoSensitivityAnalysisGeneralCase />}
            //                 />
            //                 <Route
            //                     path="/hypothesis-of-senstitivity-analysis-market-specific-alpha"
            //                     element={<HypoSenstitivityAnalysisMarketSpecificAlpha />}
            //                 />
            //                 <Route
            //                     path="/hypothesis-of-senstitivity-analysis-single-alpha-case"
            //                     element={<HypoSenstitivityAnalysisSingleAlphaCas />}
            //                 />
            //                 <Route
            //                     path="/hypothesis-of-an-initial-solution"
            //                     element={<HypoAnInitialSolution />}
            //                 />
            //                 <Route path="/ZT1-SM8H-1" element={<BTCExample />} />
            //                 <Route path="/backtest-strategies" element={<ServicesBacktest />} />
            //                 <Route path="/compare-strategies" element={<ServicesCompare />} />
            //                 <Route path="/documentations" element={<ServicesDocs />} />
            //                 <Route path="/contact-us" element={<ServicesContact />} />
            //                 <Route path="/login" element={<LoginForm />} />
            //             </Routes>
            //         </div>
            //     )}

            // </React.Fragment>
        )
    );
}

export default memo(App);
