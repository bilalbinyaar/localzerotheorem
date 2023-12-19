import React from 'react';
import AccountBalance from '../components/accountDetails/AccountBalance';
import BalanceStatsUpper from '../components/accountDetails/BalanceStatsUpper';
import BalanceStatsLower from '../components/accountDetails/BalanceStatsLower';
import GroupedBarChart from '../components/accountDetails/GroupedBarChart';
const AccountDetails = () => {
  return (
    <React.Fragment>
      <AccountBalance />
      <BalanceStatsUpper />
      <BalanceStatsLower />
      <GroupedBarChart />
    </React.Fragment>
  );
};

export default AccountDetails;
