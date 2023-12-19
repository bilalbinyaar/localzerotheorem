import React, { useState } from 'react';
import './FAQ.css';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const Accordion = ({ question, answer }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="question-heading" onClick={() => setShow(!show)}>
        <h3>{question}</h3>
        <div className="icons">
          {' '}
          {show ? (
            <AiFillCaretUp className="plus-icon" />
          ) : (
            <AiFillCaretDown className="plus-icon" />
          )}{' '}
        </div>
      </div>
      {show && <p className="answers">{answer}</p>}
    </div>
  );
};

export default Accordion;
