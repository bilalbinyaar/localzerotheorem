// THIS COMPONENT IS BEING USED
import React, { useState } from 'react';
import './RegistraionForm.css';
import soon_dark from '../../assets/soon-dark.png';
import soon_light from '../../assets/soon-light.png';
import { useStateContext } from '../../ContextProvider';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import cryptoRandomString from 'crypto-random-string';
import { database } from '../../firebase_config';
import { ref, set } from 'firebase/database';
function RegistrationForm() {
  const { theme } = useStateContext();
  const [firstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);

  const [IndustryName, setIndustryName] = useState(null);
  const [email, setEmail] = useState(null);

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
  const handleJoinList = (event) => {
    if (!firstName || !LastName || !IndustryName || !email) {
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
      set(ref(database, `api_registrations/user_${id}`), {
        id: 'user_' + id,
        status: 0,
        firstName: firstName,
        lastName: LastName,
        industry: IndustryName,
        email: email,
        current_time: timestamp,
      });
      event.preventDefault();
    }
  };
  return (
    <div className="registraion">
      <div className="container">
        <div className="registration-wrapper">
          <div className="left">
            <h1>
              Registration Interest For Early Access To Our Wholesale /
              Institutional API
            </h1>
            <h2>*For Sophisticated investors only*</h2>
            <div className="img_div">
              {theme === 'dark-theme' ? (
                <img src={soon_dark} alt="vehcain logo" className="api-img" />
              ) : (
                <img src={soon_light} alt="vehcain logo" className="api-img" />
              )}
            </div>
          </div>
          <div className="right">
            <h3 className="api-heading3">API Features Include</h3>
            <p className="api-paragraph3">
              Historical forecasts for over 500 models including all performance
              metrics strategy development infrastructure with automated back
              testing portfolio optimization & much more quant stuff
            </p>
            <h2 className="api-info">Enter Your Information</h2>
            <form onSubmit={handleJoinList}>
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
                  }}
                />
              </div>
              <div className="btn-div">
                <button className="btn-api" type="submit">
                  JOIN WAITLIST
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default RegistrationForm;
