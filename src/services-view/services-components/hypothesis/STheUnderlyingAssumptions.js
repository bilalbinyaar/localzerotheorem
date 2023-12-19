import React from 'react';
import '../../../components/resources/ResourcesTextual.css';
import ServicesSideBar from '../ServicesSideBar';

const TheUnderlyingAssumptions = () => {
  return (
    <div className="container resources-container">
      <div className="resources">
        <div className="res-sidebar">
          <ServicesSideBar />
        </div>
        <div className="res-textual">
          <div className="res-textual-section">
            <div className="container">
              <h1 className="res-det-heading">The Underlying Assumptions</h1>
              <p className="for-mt-primary">
                The Zero Theorem is derived from three major assumptions.
              </p>
              <p className="for-mt-secondary">
                <strong>Assumption 1:</strong> Value (purchasing power) cannot
                be created or destroyed and is finite in substance. Hence the
                entire financial eco-system is predicated ZERO-sum game
                dynamics. A1 Example: For one asset to increase in market
                capitalisation there needs to be another asset (or multiple
                assets) that equivalently decrease in market capitalisation.
                <br />
                <br />
                <strong>Assumption 2:</strong> In short time horizons, the
                aggregate change of value for all assets within the financial
                ecosystem must equate to ZERO in order to maintain finite
                substance condition in assumption 1. Changes in the value of
                Bitcoin, can only be occurring via some form of substitution
                phenomenon. Therefore substitution itself must be bi-directional
                in nature representing the rate of value absorption/dispersion
                from alternative asset within its own class as well as assets
                outside of its class.
                <br />
                <br />
                <strong>Assumption 3:</strong> Substitution is driven by
                Markowitz portfolio optimisations from which multiple rational
                economic agents are competing to maximise individual investor
                utility whilst minimising their individual portfolio risk as
                close to ZERO as physically possible. Assumption 3 suggests
                economic agents tend to embrace Bitcoin as a superior store of
                value (especially considering larger time horizons) which can
                combat inflation and provide a unique hedge against systemic
                risk in the traditional financial system and/or traditional
                currencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheUnderlyingAssumptions;
