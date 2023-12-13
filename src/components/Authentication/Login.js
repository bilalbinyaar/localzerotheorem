import React, { useState, useEffect } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { AiFillGoogleCircle } from 'react-icons/ai';
import './Login.css';
import { Link } from 'react-router-dom';
import { auth, provider } from '../../firebase_config';
import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login({ error }) {
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
        <form className="login-form" onSubmit={submitHandler}>
          <div className="form-inner">
            {error !== '' ? <div className="error"> {error} </div> : ''}

            <div className="form-group">
              <label htmlFor="email"></label>
              <span className="iconSpace">
                <MdEmail />
              </span>
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
                name="password"
                id="password"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
              />
            </div>
            <input
              className="login-form-btn"
              type="auth"
              value="LOGIN"
              onClick={() => {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                if (!email || !password) {
                  alert('Kindly enter input details for signup');
                } else {
                  console.log(email, password);
                  signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      alert('User is successfully login :)');
                    })
                    .catch((error) => {
                      alert('Email or password is incorrect');
                    });
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
          </div>
        </form>
        <div className="register-text">
          <p>
            <Link to="/signup">New to Zero Theorem? Join now!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
