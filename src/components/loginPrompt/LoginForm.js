// THIS COMPONENT IS BEING USED
import React, { useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useStateContext } from '../../ContextProvider';
import { AiOutlineMail } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import logoWhite from '../../assets/logo-white.svg';
import { set_login, set_login_admin } from '../../store';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    adminUserMain,
    setCheckLoginMain,
    setAuthCheckLoginInvestor,
    setAuthCheckLoginAdmin,
  } = useStateContext();
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');

  const handleInvestorLogin = () => {
    dispatch(set_login());
  };
  const handleAminLogin = () => {
    dispatch(set_login_admin());
  };

  return (
    <div>
      <form className="login-form main-web-login">
        <div className="investor-zt-logo">
          <img className="investor-zt-logo-img" src={logoWhite} alt="logo" />
        </div>
        <div className="form-inner main-web-form-inner">
          <h2>Private Member Login</h2>
          <h3>Please enter your access credentials</h3>

          <div className="form-group main-web-form-group">
            <label htmlFor="email"></label>
            <span className="iconSpace">
              <AiOutlineMail />
            </span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-group main-web-form-group only-mb">
            <label htmlFor="password"></label>
            <span className="iconSpace">
              <RiLockPasswordFill />
            </span>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>

          <input
            type="submit"
            value="Login"
            onClick={(event) => {
              event.preventDefault();
              if (
                adminUserMain.passwordMain === input &&
                adminUserMain.userMain === email
              ) {
                setCheckLoginMain(true);
                setAuthCheckLoginAdmin(true);
                handleAminLogin();
                navigate('/');
              } else if (
                adminUserMain.investorPassword === input &&
                adminUserMain.investorMain === email
              ) {
                setAuthCheckLoginInvestor('True');
                handleInvestorLogin();
                navigate('/');
              } else if (
                adminUserMain.investorPassword === input &&
                adminUserMain.investorSecondary === email
              ) {
                setAuthCheckLoginInvestor('True');
                handleInvestorLogin();
                navigate('/');
              } else {
                event.stopPropagation();
                Swal.fire({
                  title: 'Invalid access credentials',
                  icon: 'error',
                  timer: 3000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                });
              }
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
