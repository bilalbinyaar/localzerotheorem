import React, { useState } from 'react';
import './FAQ.css';
import { questions, questions1, questions2, questions3 } from './api';
import Accordion from './Accordion';

const FAQComponent = () => {
  const [data] = useState(questions);
  const [data1] = useState(questions1);
  const [data2] = useState(questions2);
  const [data3] = useState(questions3);

  return (
    <div className="faq">
      <div className="container">
        <h1 className="faq-head">Frequently Asked Questions</h1>

        <h2 className="faq-sub-head">General</h2>
        {data.map((curElement) => {
          const { id } = curElement;
          return <Accordion key={id} {...curElement} />;
        })}

        <h2 className="faq-sub-head">Models</h2>
        {data1.map((curElement) => {
          const { id } = curElement;
          return <Accordion key={id} {...curElement} />;
        })}

        <h2 className="faq-sub-head">Performance</h2>
        {data2.map((curElement) => {
          const { id } = curElement;
          return <Accordion key={id} {...curElement} />;
        })}

        <h2 className="faq-sub-head">About</h2>
        {data3.map((curElement) => {
          const { id } = curElement;
          return <Accordion key={id} {...curElement} />;
        })}
      </div>
    </div>
  );
};

export default FAQComponent;
