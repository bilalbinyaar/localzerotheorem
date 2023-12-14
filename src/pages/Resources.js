import React, { memo } from 'react';
import Introduction from '../components/resources/resourcestextual/Introduction';
import { Helmet } from 'react-helmet';

const Resources = () => {
  return (
    <div className="resources">
      <Helmet>
        <title>Zero Theorem | Derivations</title>
        <meta
          name="description"
          content="A comprehensive set of informational documents detailing how our economic framework is derived and proven with the help of AI and ML to provide the best crypto signals and forecastbitcoin prices."
        />
      </Helmet>
      <div className="res-textual">
        <Introduction />
      </div>
    </div>
  );
};

export default memo(Resources);
