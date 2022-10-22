import React from 'react';
import ScaletorLogotype from '../Logotype';

const Unsupported = () => (
  <div className="unsupported">
    <ScaletorLogotype className="unsupported__logotype" />
    <p className="unsupported__message">
      Unsupported resolution, so small...
    </p>
  </div>
);

export default Unsupported;
