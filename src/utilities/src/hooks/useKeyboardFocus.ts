import React, { useEffect, useRef } from 'react';

interface Arguments {
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyPress?: () => void;
}

const useKeyboardFocus = <T extends HTMLElement>({
  onFocus,
  onBlur,
  onKeyPress
}: Arguments = {}) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleFocus() {
      console.log('focus', ref.current);
      onFocus?.();
    }
    function handleBlur() {
      console.log('blur', ref.current);
      onBlur?.();
    }
    ref.current?.addEventListener('focus', handleFocus);
    ref.current?.addEventListener('blur', handleBlur);
    return () => {
      ref.current?.removeEventListener('focus', handleFocus);
      ref.current?.removeEventListener('blur', handleBlur);
    };
  }, []);

  return { ref };
};

export default useKeyboardFocus;
