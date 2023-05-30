import React, { useRef, memo, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Models from "./pages/Models";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginForm from "./components/loginPrompt/LoginForm";
import { useStateContext } from "./ContextProvider";
import Footer from "./components/footer/Footer";
import About from "./pages/About";
import Introduction from "./components/resources/resourcestextual/Introduction";
import FAQ from "./pages/FAQ";
import Compare from "./pages/Compare";
import AlternativeBassModelforAlpha from "../src/components/resources/derivations/AlternativeBassModelforAlpha";
import AlternativeFrechetModelforAlpha from "../src/components/resources/derivations/AlternativeFrechetModelforAlpha";
import AlternativeGumbelModelforAlpha from "../src/components/resources/derivations/AlternativeGumbelModelforAlpha";
import AlternativeShiftedGompertzModelforAlpha from "../src/components/resources/derivations/AlternativeShiftedGompertzModelforAlpha";
import AlternativeWeibulModelforAlpha from "../src/components/resources/derivations/AlternativeWeibulModelforAlpha";
import AnInitialSolution from "../src/components/resources/derivations/AnInitialSolution";
import Derivations from "../src/components/resources/derivations/Derivations";
import FurtherDerivations from "../src/components/resources/derivations/FurtherDerivations";
import InvestigatingAlpha from "../src/components/resources/derivations/InvestigatingAlpha";
import RepresentationofaNewAssetClassviaSubstitution from "../src/components/resources/derivations/RepresentationofaNewAssetClassviaSubstitution";
import SensitivityAnalysisGeneralCase from "../src/components/resources/derivations/SensitivityAnalysisGeneralCase";
import SenstitivityAnalysisMarketSpecificAlpha from "../src/components/resources/derivations/SenstitivityAnalysisMarketSpecificAlpha";
import SenstitivityAnalysisSingleAlphaCas from "../src/components/resources/derivations/SenstitivityAnalysisSingleAlphaCas";
import TheGoverningEquation from "../src/components/resources/derivations/TheGoverningEquation";
import TheUnderlyingAssumptions from "../src/components/resources/derivations/TheUnderlyingAssumptions";
import BactestRouteComponent from "./components/backtest/BactestRouteComponent";
import Documentation from "./pages/Documentation";
// import { database } from "./firebase_config";
// import { ref, onValue, set } from "firebase/database";
// import cryptoRandomString from "crypto-random-string";
import Backtest from "./pages/Backtest";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import RegistrationForm from "./components/apiRegistrationForm/RegistrationForm";
import Contact from "./components/contact/Contact";
import Performance from "./pages/Performance";
import { useSelector, useDispatch } from "react-redux";
import { set_login } from "./store";
import RiskManagement from "./pages/RiskManagement";
// import dotenv from "dotenv";
function App() {
  // const id = cryptoRandomString({ length: 10, type: "alphanumeric" });

  // const starCountRef = ref(database, "tweets");
  // set(ref(database, "backtest_queue/" + "user_" + id), {
  //   id: "user_" + id,
  //   modelName: "ZT1_0M24BTC26",
  //   start_date: "1674876799",
  //   end_date: "1677555199",
  //   take_profit: 10,
  //   stop_loss: 5,
  //   transaction_fee: 0.07,
  //   status: 0,
  //   // profile_picture: imageUrl,
  // });
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   console.log("Data firebase", data);
  //   // updateStarCount(postElement, data);
  // });
  // dotenv.config();
  // const MY_VARIABLE = useEnv("REACT_APP_SECRET_KEY");
  // console.log("Here finally secret key -->", process.env.REACT_APP_SECRET_KEY);

  const {
    userMain,
    errorMain,
    loading,
    checkLoginMain,
    authCheckLoginInvestor,
    setAuthCheckLoginInvestor,
  } = useStateContext();

  // SCROLL TO TOP
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const default_login = useSelector((state) => state.loginFlag);

  // SCROLL TO TOP

  return (
    !loading && (
      <React.Fragment>
        {checkLoginMain == true || authCheckLoginInvestor == true ? (
          authCheckLoginInvestor == true ? (
            <div>
              <Navbar />
              <Routes basename="/zero-theorem">
                <Route path="/" element={<Performance />} />
                <Route path="/theory" element={<TheUnderlyingAssumptions />} />
                <Route path="/:name" element={<Models />} />
                {/* <Route path="/all-models/:name" element={<Models />} /> */}

                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/faqs" element={<FAQ />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/signup" element={<Signup />} /> */}
                {/* <Route
                  path="/api-registration"
                  element={<RegistrationForm />}
                /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}

                <Route path="/compare" element={<Compare />} />
                <Route path="/backtest" element={<BactestRouteComponent />} />
                <Route path="/api" element={<Documentation />} />
                {/* <Route path="/performance" element={<Performance />} /> */}
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

                {/* <Route path="/reload" element={<LoginForm />} /> */}
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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/api-registration"
                  element={<RegistrationForm />}
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/all-models" element={<Home />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/backtest" element={<BactestRouteComponent />} />
                <Route path="/api" element={<Documentation />} />
                {/* <Route path="/performance" element={<Performance />} /> */}
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
                <Route path="/login" element={<LoginForm />} />
              </Routes>
              <Footer />
            </div>
          )
        ) : (
          <div>
            <LoginForm />
            <Routes basename="/zero-theorem">
              <Route path="/sitemap.xml" />
            </Routes>
          </div>
        )}
      </React.Fragment>
    )

    // !loading && (
    //   <React.Fragment>
    //     <div>
    //       <Navbar />
    //       <Routes basename="/zero-theorem">
    //         <Route path="/" element={<Home />} />
    //         <Route path="/derivations" element={<Introduction />} />
    //         <Route path="/:name" element={<Models />} />
    //         <Route path="/about" element={<About />} />
    //         <Route path="/faqs" element={<FAQ />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/signup" element={<Signup />} />
    //         <Route path="/api-registration" element={<RegistrationForm />} />
    //         <Route path="/contact" element={<Contact />} />

    //         <Route path="/compare" element={<Compare />} />
    //         <Route path="/backtest" element={<BactestRouteComponent />} />
    //         <Route path="/api" element={<Documentation />} />
    //         <Route path="/performance" element={<Performance />} />

    //         {/* RESOURCES ROUTING FOR SUB ITEMS */}
    //         <Route
    //           path="/the-underlying-assumptions"
    //           element={<TheUnderlyingAssumptions />}
    //         />
    //         <Route
    //           path="/representation-of-a-new-asset-class-via-substitution"
    //           element={<RepresentationofaNewAssetClassviaSubstitution />}
    //         />
    //         <Route
    //           path="/the-governing-equation"
    //           element={<TheGoverningEquation />}
    //         />
    //         <Route
    //           path="/investigating-alpha"
    //           element={<InvestigatingAlpha />}
    //         />
    //         <Route
    //           path="/sensitivity-analysis-general-case"
    //           element={<SensitivityAnalysisGeneralCase />}
    //         />
    //         <Route
    //           path="/senstitivity-analysis-market-specific-alpha"
    //           element={<SenstitivityAnalysisMarketSpecificAlpha />}
    //         />
    //         <Route
    //           path="/senstitivity-analysis-single-alpha-case"
    //           element={<SenstitivityAnalysisSingleAlphaCas />}
    //         />
    //         <Route path="/derivations-details" element={<Derivations />} />
    //         <Route
    //           path="/further-derivations"
    //           element={<FurtherDerivations />}
    //         />
    //         <Route
    //           path="/alternative-bass-model-for-alpha"
    //           element={<AlternativeBassModelforAlpha />}
    //         />
    //         <Route
    //           path="/alternative-frechet-model-for-alpha"
    //           element={<AlternativeFrechetModelforAlpha />}
    //         />
    //         <Route
    //           path="/alternative-weibul-model-for-alpha"
    //           element={<AlternativeWeibulModelforAlpha />}
    //         />
    //         <Route
    //           path="/alternative-gumbel-model-for-alpha"
    //           element={<AlternativeGumbelModelforAlpha />}
    //         />
    //         <Route
    //           path="/alternative-shifted-gompertz-model-for-alpha"
    //           element={<AlternativeShiftedGompertzModelforAlpha />}
    //         />
    //       </Routes>
    //       <Footer />
    //     </div>

    //     {/* <div>
    //         <LoginForm Login={Login} error={error} />
    //         <Routes basename="/zero-theorem">
    //           <Route path="/sitemap.xml" component={Sitemap} />
    //         </Routes>
    //       </div> */}
    //   </React.Fragment>
    // )
  );
}

export default memo(App);
