import { useState, useEffect } from 'react';
import featureFlags from '../config/featureFlags.json';

const useFeatureFlag = (flagName) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if the flag exists and set its value
    if (flagName in featureFlags) {
      setIsEnabled(featureFlags[flagName]);
    } else {
      console.warn(`Feature flag "${flagName}" not found`);
    }
  }, [flagName]);

  return isEnabled;
};

export default useFeatureFlag;
