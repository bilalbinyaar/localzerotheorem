import React from 'react';
import ServicesNavbar from '../services-components/ServicesNavbar';
import Footer from '../../components/footer/Footer';

const ServicesContact = () => {
  return (
    <React.Fragment>
      <ServicesNavbar />
      <div className="services-contact">
        <div className="container">
          <div className="services-contact-wrapper">
            <div className="services-contact-info">
              <h2>ZERO THEOREM PTY LTD</h2>
              <br />
              <p>
                ABN: XXX XX XXX
                <br />
                ACN: XXX XX XXX 24 Rogers
                <br />
                <br />
                Avenue, Brighton East, 3187 Melbourne, Australia
                <br />
                Email: info@zerotheorem.com
              </p>
            </div>
            <div className="services-contact-form-div">
              <form className="services-contact-form">
                <h2>Get in Touch With Us</h2>
                <p>
                  Please fill out the form below to get in touch with us. We
                  will respond to your inquiry as soon as possible.
                </p>
                <div className="services-contact-group">
                  <label>Name</label>
                  <input type="text" />
                </div>
                <div className="services-contact-group">
                  <label>Email</label>
                  <input type="text" />
                </div>
                <div className="services-contact-group">
                  <label>Message</label>
                  <textarea type="text" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ServicesContact;
