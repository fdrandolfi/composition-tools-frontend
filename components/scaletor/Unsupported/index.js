import React from 'react';

const Unsupported = () => (
  <div className="unsupported">
    <img
      className="unsupported__logotype"
      src="/images/scaletor/general/logotype.svg"
      alt="logotype"
    />
    <p className="unsupported__message">
      Unsupported resolution, so small...
    </p>
  </div>
);

export default Unsupported;
