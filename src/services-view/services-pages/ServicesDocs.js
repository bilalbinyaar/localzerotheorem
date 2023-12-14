// THIS COMPONENT IS BEING USED
import React from 'react';
import ServicesNavbar from '../services-components/ServicesNavbar';
import Footer from '../../components/footer/Footer';
import Documentation from '../../pages/Documentation';

const ServicesDocs = () => {
  return (
    <React.Fragment>
      <ServicesNavbar />
      <Documentation />
      <Footer />
    </React.Fragment>
  );
};

export default ServicesDocs;
