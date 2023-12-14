// THIS COMPONENT IS BEING USED
import React from 'react';
import ServicesNavbar from '../../services-components/ServicesNavbar';
import Footer from '../../../components/footer/Footer';
import SensitivityAnalysisGeneralCase from '../../services-components/hypothesis/SensitivityAnalysisGeneralCase';

const HypoSensitivityAnalysisGeneralCase = () => {
  return (
    <React.Fragment>
      <ServicesNavbar />
      <SensitivityAnalysisGeneralCase />
      <Footer />
    </React.Fragment>
  );
};

export default HypoSensitivityAnalysisGeneralCase;
