import React, { memo } from 'react';
import AboutComponent from '../components/about/AboutComponent';
import { useStateContext } from '../ContextProvider';
import { Helmet } from 'react-helmet';

const About = () => {
  const { loading } = useStateContext();
  return (
    !loading && (
      <React.Fragment>
        <Helmet>
          <title>Zero Theorem | About</title>
          <meta
            name="description"
            content="Our mission, manifesto, equation, and why behind the forecasting framework of bitcoin and other cryptocurrencies using our state-of-the-art economic framework."
          />
        </Helmet>
        <AboutComponent />
      </React.Fragment>
    )
  );
};

export default memo(About);
