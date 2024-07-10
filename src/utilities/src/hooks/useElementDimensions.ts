import { useEffect, useRef, useState } from 'react';

const useElementDimensions = <T extends HTMLElement>(
  dependencies: any[] = [],
  id?: string
) => {
  const ref = useRef<T>(null);
  const [state, setState] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const element = id ? document.getElementById(id) : ref.current;
    function updateDimensions() {
      setState({
        width: element?.offsetWidth ?? 0,
        height: element?.offsetHeight ?? 0
      });
    }
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, [...dependencies]);

  return {
    ref,
    dimensions: state
  };
};

export default useElementDimensions;
