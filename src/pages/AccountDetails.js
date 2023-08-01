import React from 'react';
import AccountBalance from '../components/accountDetails/AccountBalance';
import BalanceStatsUpper from '../components/accountDetails/BalanceStatsUpper';
import BalanceStatsLower from '../components/accountDetails/BalanceStatsLower';
import BalanceStrategies from '../components/accountDetails/BalanceStrategies';

const AccountDetails = () => {
  return (
    <React.Fragment>
      <AccountBalance />
      <BalanceStatsUpper />
      <BalanceStatsLower />
      <BalanceStrategies />
    </React.Fragment>
  );
};

export default AccountDetails;
