import React, { useEffect, useState } from 'react';

const DEFAULT_VALUE = '+62';

const usePhonePrefix = () => {
  const [phonePrefix, setPhonePrefix] = useState<string>('');

  useEffect(() => {
    function updatePrefix() {
      const prefix = sessionStorage.getItem('ph') || DEFAULT_VALUE;
      setPhonePrefix(prefix);
    }
    function onStorageChange(e: StorageEvent) {
      if (e.storageArea === sessionStorage) {
        updatePrefix();
      }
    }
    updatePrefix();
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  return {
    phonePrefix
  };
};

export default usePhonePrefix;
