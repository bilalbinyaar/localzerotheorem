// THIS COMPONENT IS BEING USED
import React from 'react';
import videoBackground from '../../assets/2x-bg.mp4';
import logoWhite from '../../assets/logo-white.svg';
import '../ServicesView.css';
import { useNavigate } from 'react-router-dom';

const ServicesEntrance = () => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate('/services-about');
  };
  return (
    <div>
      <div className="video-background">
        <video autoPlay muted>
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <form className="login-form main-web-entrance">
        <div className="form-inner main-web-form-inner services-enterance-textbox">
          <img
            className="investor-zt-logo-img service-enterance-logo scale-animation"
            src={logoWhite}
            alt="logo"
          />
          <h3 className="scale-animation">
            Lorem ipsum dolor sit amet consectetur. Scelerisque diam ultricies
            suscipit pharetra sagittis velit eu vestibulum eget. Cras magna
            libero at pellentesque mi. Odio egestas amet pretium tristique eu
            et. Suspendisse diam mauris consectetur elementum et.
          </h3>

          <input
            type="submit"
            value="Click to Enter"
            className="scale-animation"
            onClick={handleClick}
          />
        </div>
      </form>
    </div>
  );
};

export default ServicesEntrance;
