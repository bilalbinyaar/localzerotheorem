// THIS COMPONENT IS BEING USED
import React from 'react';
import './ModelDetails.css';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ModelDetailsLeft from './ModelDetailsLeft';
import ModelDetailsCenter from './ModelDetailsCenter';
import ModelDetailsRight from './ModelDetailsRight';

const ModelDetails = (props) => {
  return (
    <div id="navigate-here" className="model-details">
      <div className="container">
        {props.Flag !== 'True' ? (
          <div className="bread-crumb">
            <Link to="/">
              <p className="bread-crumb-forecasts">Forecasts</p>
            </Link>
            <AiOutlineRight className="bread-crumb-icon" />
            <p className="bread-crumb-model">{props.model_name}</p>
          </div>
        ) : null}

        <div className="model-details-main">
          <ModelDetailsLeft model_name={props.model_name} Flag={props.Flag} />
          <ModelDetailsCenter model_name={props.model_name} />
          <ModelDetailsRight model_name={props.model_name} />
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
