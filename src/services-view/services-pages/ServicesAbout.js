import React from 'react';
import ServicesNavbar from '../services-components/ServicesNavbar';
import '../ServicesView.css';
import Footer from '../../components/footer/Footer';
import sa1Day from '../services-assets/sa-1.png';
import sa2Day from '../services-assets/sa-2.png';
import sa3Day from '../services-assets/sa-3.png';
import sa1Night from '../services-assets/sa-4.png';
import sa2Night from '../services-assets/sa-5.png';
import sa3Night from '../services-assets/sa-6.png';
import { useStateContext } from '../../ContextProvider';

const ServicesAbout = () => {
  const { theme } = useStateContext();

  return (
    <React.Fragment>
      <ServicesNavbar />
      <div className="services-about-page">
        <div className="container">
          <div className="services-about-wrapper">
            <div className="services-about-item">
              <div className="services-about-head">
                <h2>OUR MISSION</h2>
              </div>
              <div className="services-about-description">
                {theme === 'dark-theme' ? (
                  <div className="mission-img serice-about-item-img">
                    <img src={sa1Night} alt="zero-un" />
                  </div>
                ) : (
                  <div className="mission-img serice-about-item-img">
                    <img src={sa1Day} alt="zero-un" />
                  </div>
                )}
                <p>
                  Everything starts with the “null” hypothesis and at zero
                  theorem we offer a scientific capability grounded in economics
                  and mathematics to value and simulate a range of financial
                  assets.
                  <br />
                  <br />
                  Our mission is to provide a multidisciplinary approach which
                  encompasses AI, economics and quantitative development to
                  advance our clients ability to find and exploit consistent
                  alpha
                </p>
              </div>
            </div>
            <div className="services-about-item sa-item-ml">
              <div className="services-about-head">
                <h2>OUR SERVICES</h2>
              </div>
              <div className="services-about-description">
                {theme === 'dark-theme' ? (
                  <div className="mission-img serice-about-item-img">
                    <img src={sa2Night} alt="zero-un" />
                  </div>
                ) : (
                  <div className="mission-img serice-about-item-img">
                    <img src={sa2Day} alt="zero-un" />
                  </div>
                )}

                <p>
                  We aim to provide a highly specialised and structured services
                  including: <br />
                  <br />- Hypothesis Development
                  <br />- Statistical/Econometric Modelling
                  <br />- AI/ML Modelling
                  <br /> - Back testing and Out of Sample Simulations
                  <br /> - Algorithmic Development
                  <br /> - Execution Development
                </p>
              </div>
            </div>
            <div className="services-about-item">
              <div className="services-about-head">
                <h2>OUR TEAM</h2>
              </div>
              <div className="services-about-description">
                {theme === 'dark-theme' ? (
                  <div className="mission-img serice-about-item-img">
                    <img src={sa3Night} alt="zero-un" />
                  </div>
                ) : (
                  <div className="mission-img serice-about-item-img">
                    <img src={sa3Day} alt="zero-un" />
                  </div>
                )}

                <p>
                  We are PhDs in natural sciences, quantitative researchers and
                  trading practitioners
                  <br />
                  <br /> - We have over 10+ Years in crypto currencies and
                  blockchain markets <br />- We have over 7+ Years in Machine
                  Learning/Deep Learning <br />- We over 5+ Years developing
                  algorithmic trading systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ServicesAbout;
