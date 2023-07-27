import React from 'react';

const AccountBalance = () => {
  return (
    <div className="balance-details">
      <div className="container">
        <div className="top-div">
          <h1>Account Detail</h1>
        </div>
        <div className="balance-details-wrapper">
          <div className="balance-details-content">
            <h3>Total BTC Balance</h3>
            <h2>
              210.348572 <strong>BTC</strong>
            </h2>
          </div>
          <div className="balance-details-content">
            <h3>Total USD Balance</h3>
            <h2>
              210.348572 <strong>USD</strong>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
