import React from 'react';
import ServicesNavbar from '../services-components/ServicesNavbar';
import '../ServicesView.css';
import Footer from '../../components/footer/Footer';
import STheUnderlyingAssumptions from '../services-components/hypothesis/STheUnderlyingAssumptions';

const ServicesHypothesis = () => {
  return (
    <React.Fragment>
      <ServicesNavbar />
      <STheUnderlyingAssumptions />
      <Footer />
    </React.Fragment>
  );
};

export default ServicesHypothesis;
