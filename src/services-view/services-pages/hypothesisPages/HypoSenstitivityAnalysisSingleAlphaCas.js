// THIS COMPONENT IS BEING USED
import React from 'react';
import ServicesNavbar from '../../services-components/ServicesNavbar';
import Footer from '../../../components/footer/Footer';
import SenstitivityAnalysisSingleAlphaCas from '../../services-components/hypothesis/SenstitivityAnalysisSingleAlphaCas';

const HypoSenstitivityAnalysisSingleAlphaCas = () => {
  return (
    <React.Fragment>
      <ServicesNavbar />
      <SenstitivityAnalysisSingleAlphaCas />
      <Footer />
    </React.Fragment>
  );
};

export default HypoSenstitivityAnalysisSingleAlphaCas;
