import React, { memo } from 'react';
import FAQComponent from '../components/faq/FAQComponent';
import { Helmet } from 'react-helmet';

const FAQ = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | Frequently Asked Questions</title>
        <meta
          name="description"
          content="Here you can get answers to the most common questions regarding Zero Theorem, SOREZ, and AI models used in the framework for bitcoin price prediction."
        />
      </Helmet>
      <FAQComponent />
    </React.Fragment>
  );
};

export default memo(FAQ);
