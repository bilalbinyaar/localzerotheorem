import React, { useState } from 'react';
import ServicesNavbar from '../services-components/ServicesNavbar';
import Footer from '../../components/footer/Footer';
import { database } from '../../firebase_config';
import { ref, set } from 'firebase/database';
import cryptoRandomString from 'crypto-random-string';
import Swal from 'sweetalert2';

const ServicesContact = () => {
  const [IndustryName, setIndustryName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);

  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleJoinList = (event) => {
    if (!firstName || !email || !message) {
      event.preventDefault();

      Swal.fire({
        title: 'Kindly input all fields ',
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
    } else {
      setFirstName('');
      setLastName('');
      setIndustryName('');
      setEmail('');
      setMessage('');
      Swal.fire({
        title: 'Your information is successfully submitted ',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
      const id = cryptoRandomString({
        length: 10,
        type: 'alphanumeric',
      });
      var current_time = new Date();
      const timestamp = current_time.getTime();

      set(ref(database, `contact/user_${id}`), {
        id: 'user_' + id,
        status: 0,
        firstName: firstName,
        lastName: LastName,
        industry: IndustryName,
        email: email,
        message: message,
        current_time: timestamp,
      });
      event.preventDefault(); // Prevent the default form submission behavior
    }
  };
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
              <form className="services-contact-form" onSubmit={handleJoinList}>
                <h2>Get in Touch With Us</h2>
                <p>
                  Please fill out the form below to get in touch with us. We
                  will respond to your inquiry as soon as possible.
                </p>
                <div className="services-contact-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="services-contact-group">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="services-contact-group">
                  <label>Message</label>
                  <textarea
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                  />
                </div>
                <div className="btn-div">
                  <button className="btn-contact" type="submit">
                    SEND MESSAGE
                  </button>
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
