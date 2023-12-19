import React from 'react';
import ServicesNavbar from '../../services-components/ServicesNavbar';
import Footer from '../../../components/footer/Footer';
import AnInitialSolution from '../../services-components/hypothesis/AnInitialSolution';

const HypoAnInitialSolution = () => {
  return (
    <React.Fragment>
      <ServicesNavbar />
      <AnInitialSolution />
      <Footer />
    </React.Fragment>
  );
};

export default HypoAnInitialSolution;
