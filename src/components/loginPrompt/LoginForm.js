import React, { useState, Redirect } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useStateContext } from "../../ContextProvider";
import {
  AiOutlineMail,
  AiOutlineClose,
  AiFillGoogleCircle,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";

// import videoBackground from '../../assets/investor-bg.mp4';
import videoBackground from "../../assets/2x-bg.mp4";
import logoWhite from "../../assets/logo-white.svg";
import { set_login } from "../../store";
// import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    adminUserMain,
    checkLoginMain,
    setCheckLoginMain,
    authCheckLogin,
    setAuthCheckLogin,
    authCheckLoginInvestor,
    setAuthCheckLoginInvestor,
  } = useStateContext();
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");

  // const submitHandlerMain =

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleInvestorLogin = () => {
    <Redirect to="/" />

    dispatch(set_login());
  };

  const contents = [
    // REGISTER INTEREST POPUP CONTENT
    <div className="popup-inner">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="name" placeholder="Name" name="name" id="name" />
      </div>
      <div className="form-group no-margin-bottom">
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Email" name="email" id="email" />
      </div>
      <div className="checkbox-div">
        <input type="checkbox" id="tandc" name="tandc" value="" />
        {/* <label for="tandc"> I agree the Term and Conditions</label> */}
      </div>
      <input
        className="login-form-btn"
        type="auth"
        value="Sign Up"
      // onClick={() => {
      //   console.log("Submit button is clicked");
      //   const email = document.getElementById("email").value;
      //   const password = document.getElementById("password").value;
      //   if (!email || !password) {
      //     console.log();
      //     // alert("Kindly enter input details for signup");
      //     Swal.fire({
      //       title: "Kindly enter input details",
      //       icon: "error",
      //       timer: 2000,
      //       timerProgressBar: true,
      //       toast: true,
      //       position: "top-right",
      //       showConfirmButton: false,
      //     });
      //   } else if (isChecked == false) {
      //     Swal.fire({
      //       title: "Kindly agree to our term and conditions",
      //       icon: "error",
      //       timer: 2000,
      //       timerProgressBar: true,
      //       toast: true,
      //       position: "top-right",
      //       showConfirmButton: false,
      //     });
      //   } else {
      //     console.log(email, password);
      //     createUserWithEmailAndPassword(auth, email, password)
      //       .then((userCredential) => {
      //         // Signed in
      //         const user = userCredential.user;
      //         Swal.fire({
      //           title: "User account is created successfully",
      //           icon: "success",
      //           timer: 2000,
      //           timerProgressBar: true,
      //           toast: true,
      //           position: "top-right",
      //           showConfirmButton: false,
      //         });
      //         handleClosePopup();
      //         setAuthCheckLogin(true);
      //         // setAuthCheck(true);
      //         // alert("User account is created successfully");
      //         // ...
      //       })
      //       .catch((error) => {
      //         const errorCode = error.code;
      //         const errorMessage = error.message;
      //         Swal.fire({
      //           title: "Unable to create account with your credentials",
      //           icon: "error",
      //           timer: 2000,
      //           timerProgressBar: true,
      //           toast: true,
      //           position: "top-right",
      //           showConfirmButton: false,
      //         });
      //         // alert("Unable to create account with your credentials");
      //       });
      //   }
      // }}
      />
      <div className="or-div">
        <span>
          <p>OR</p>
        </span>
      </div>

      <div className="google-login-div">
        <button className="google-login-btn">
          <AiFillGoogleCircle className="google-login-icon" />
          Continue with Google
        </button>
      </div>

      <div className="register-text">
        <p>
          Already have an account?
          <strong className="color-yellow">Log In</strong>
        </p>
      </div>
    </div>,
  ];

  return (
    <div>
      <div className="video-background">
        <video autoPlay muted>
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <form className="login-form main-web-login">
        <div className="investor-zt-logo">
          <img className="investor-zt-logo-img" src={logoWhite} alt="logo" />
        </div>
        <div className="form-inner main-web-form-inner">
          {/* {(error !== '') ? ( <div className='error'> {error} </div> ) : ''} */}
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
                adminUserMain.passwordMain == input &&
                adminUserMain.userMain == email
              ) {

                setCheckLoginMain(true);
                navigate("/")

              } else if (
                adminUserMain.investorPassword == input &&
                adminUserMain.investorMain == email
              ) {
                setAuthCheckLoginInvestor("True");
                handleInvestorLogin();
                navigate("/")

              } else if (
                adminUserMain.investorPassword == input &&
                adminUserMain.investorSecondary == email

              ) {
                setAuthCheckLoginInvestor("True");
                handleInvestorLogin();
                navigate("/")


              } else {
                event.stopPropagation();
                //  alert("Kindly input valid login credentials")
                Swal.fire({
                  title: "Invalid access credentials",
                  icon: "error",
                  timer: 3000,
                  timerProgressBar: true,
                  toast: true,
                  position: "top-right",
                  showConfirmButton: false,
                });
              }
            }}
          />

          {/* <button className='reg-interest' onClick={handleShowPopup}>Register your interest</button>

                {showPopup && (
                    <div className="popup">
                    <div className="popup__content">
                        <div className="login">
                        <div className="containers">
                            <form className="login-form">
                            <button
                                className="popup__close"
                                onClick={handleClosePopup}
                            >
                                <AiOutlineClose />
                            </button>
                            <div className="form-inner">
                                <div className="form-headings">
                                <h2>
                                    Register
                                </h2>
                                </div>
                                <div>{contents}</div>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                )} */}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
