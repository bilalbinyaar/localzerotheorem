// THIS COMPONENT IS BEING USED
import React, { useState, useEffect } from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { CgPassword } from 'react-icons/cg';
import { MdEmail } from 'react-icons/md';
import './Login.css';
import { Link } from 'react-router-dom';
import { auth, provider } from '../../firebase_config';
import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup({ Login, error }) {
  const [details, setDetails] = useState({ name: '', email: '', password: '' });

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {})
      .catch((error) => {
        console.log('Error occured');
      });
  }, []);
  return (
    <div className="login">
      <div className="container">
        <form className="login-form sign-up-form" onSubmit={submitHandler}>
          <div className="form-inner">
            {error !== '' ? <div className="error"> {error} </div> : ''}
            <div className="form-group">
              <label htmlFor="email"></label>
              <span className="iconSpace">
                <MdEmail />
              </span>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                id="email"
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                value={details.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <span className="iconSpace">
                <RiLockPasswordFill />
              </span>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                id="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <span className="iconSpace">
                <CgPassword />
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                name="repassword"
                id="repassword"
              />
            </div>
            <input
              className="login-form-btn"
              type="auth"
              value="SIGN UP"
              onClick={() => {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const repassword = document.getElementById('repassword').value;

                if (!email || !password || !repassword) {
                  alert('Kindly enter input details for signup');
                } else {
                  if (password === repassword) {
                    console.log(email, password, repassword);
                    createUserWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {})
                      .catch((error) => {
                        alert(
                          'Unable to create account user might be already exists'
                        );
                        // ..
                      });
                  } else {
                    alert('Passwords are not matched');
                  }
                }
              }}
            />

            <div className="or-div">
              <span className="hr-div">
                <hr />
              </span>
              <span>
                <p>or</p>
              </span>
              <span className="hr-div">
                <hr />
              </span>
            </div>

            <div className="google-login-div">
              <button
                className="google-login-btn"
                onClick={() => {
                  signInWithRedirect(auth, provider);
                }}
              >
                <AiFillGoogleCircle className="google-login-icon" />
                Sign in with Google
              </button>
            </div>

            <p className="register-text">
              Already on Zero Theorem? <Link to="/login">Sign in!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
