import React, { useState, useRef } from 'react';
import cryptoRandomString from 'crypto-random-string';
import { database } from '../../firebase_config';
import Swal from 'sweetalert2';
import { ref, set } from 'firebase/database';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import './Contact.css';
function Contact() {
  const [firstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);

  const [IndustryName, setIndustryName] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleIndustryNameChange = (event) => {
    setIndustryName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleJoinList = (event) => {
    if (!firstName || !LastName || !IndustryName || !email || !message) {
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
      event.preventDefault();
    }
  };

  const windowWidth = useRef(window.innerWidth);
  return (
    <div className="contact">
      <div className="container">
        <div className="contact-form-div">
          <h1 className="contact-heading">Contact Us</h1>
          <form onSubmit={handleJoinList}>
            {windowWidth.current <= 768 ? (
              // Mobile View
              <div className="inputDiv">
                <TextField
                  id="firstName"
                  placeholder="First Name*"
                  variant="outlined"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  sx={{
                    width: 300,
                    marginTop: '1rem',
                  }}
                />
                <TextField
                  id="firstName4"
                  placeholder="Last Name*"
                  variant="outlined"
                  value={LastName}
                  onChange={handleLastNameChange}
                  sx={{
                    width: 300,
                    marginTop: '1rem',
                  }}
                />
                <TextField
                  id="firstName2"
                  placeholder="Industry*"
                  variant="outlined"
                  value={IndustryName}
                  onChange={handleIndustryNameChange}
                  sx={{
                    width: 300,
                    marginTop: '1rem',
                  }}
                />
                <TextField
                  id="firstName3"
                  placeholder="Email*"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  sx={{
                    width: 300,
                    marginTop: '1rem',
                    marginBottom: '1rem',
                  }}
                />
                <TextareaAutosize
                  placeholder="Your Message*"
                  value={message}
                  onChange={handleMessageChange}
                  sx={{
                    width: 300,
                  }}
                />
              </div>
            ) : (
              // Web View
              <div className="inputDiv">
                <TextField
                  id="firstName"
                  placeholder="First Name*"
                  variant="outlined"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  sx={{
                    width: 550,
                    marginTop: '1rem',
                  }}
                />
                <TextField
                  id="firstName4"
                  placeholder="Last Name*"
                  variant="outlined"
                  value={LastName}
                  onChange={handleLastNameChange}
                  sx={{
                    width: 550,
                    marginTop: '1rem',
                  }}
                />
                <TextField
                  id="firstName2"
                  placeholder="Industry*"
                  variant="outlined"
                  value={IndustryName}
                  onChange={handleIndustryNameChange}
                  sx={{
                    width: 550,
                    marginTop: '1rem',
                  }}
                />
                <TextField
                  id="firstName3"
                  placeholder="Email*"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  sx={{
                    width: 550,
                    marginTop: '1rem',
                    marginBottom: '1rem',
                  }}
                />
                <TextareaAutosize
                  placeholder="Your Message*"
                  value={message}
                  onChange={handleMessageChange}
                  sx={{
                    width: 550,
                  }}
                />
              </div>
            )}

            <div className="btn-div">
              <button className="btn-contact" type="submit">
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
