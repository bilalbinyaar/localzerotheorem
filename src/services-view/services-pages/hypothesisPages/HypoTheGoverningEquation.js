import React from 'react';
import ServicesNavbar from '../../services-components/ServicesNavbar';
import Footer from '../../../components/footer/Footer';
import TheGoverningEquation from '../../services-components/hypothesis/TheGoverningEquation';

const HypoTheGoverningEquation = () => {
  return (
    <React.Fragment>
      <ServicesNavbar />
      <TheGoverningEquation />
      <Footer />
    </React.Fragment>
  );
};

export default HypoTheGoverningEquation;
