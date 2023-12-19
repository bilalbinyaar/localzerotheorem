import React from 'react';
import ServicesNavbar from '../../services-components/ServicesNavbar';
import Footer from '../../../components/footer/Footer';
import SenstitivityAnalysisMarketSpecificAlpha from '../../services-components/hypothesis/SenstitivityAnalysisMarketSpecificAlpha';

const HypoSenstitivityAnalysisMarketSpecificAlpha = () => {
  return (
    <React.Fragment>
      <ServicesNavbar />
      <SenstitivityAnalysisMarketSpecificAlpha />
      <Footer />
    </React.Fragment>
  );
};

export default HypoSenstitivityAnalysisMarketSpecificAlpha;
