import React, { useEffect, useRef } from 'react';

interface Props {
  callback: () => void;
  children: React.ReactNode;
  fallback: React.ReactNode;
  root?: HTMLElement | null;
  threshold?: number;
  unobserve?: boolean;
  unobserveOnIntersection?: boolean;
}

const InfiniteScrolling: React.FC<Props> = (props) => {
  const {
    callback,
    children,
    fallback,
    root = null,
    threshold = 0.5,
    unobserve = false,
    unobserveOnIntersection = false
  } = props;
  const observableElement = useRef<HTMLDivElement>(null);
  const intersectionObserver = useRef<IntersectionObserver>();
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (observableElement.current) {
      if (unobserve) {
        intersectionObserver.current?.unobserve(observableElement.current);
      } else {
        const options: IntersectionObserverInit = {
          root,
          rootMargin: '0px',
          threshold
        };
        intersectionObserver.current = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callbackRef.current();
              if (unobserveOnIntersection && observableElement.current)
                intersectionObserver.current?.unobserve(
                  observableElement.current
                );
            }
          });
        }, options);
        intersectionObserver.current.observe(observableElement.current);
      }
    }
    return () => {
      intersectionObserver.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unobserve]);

  return (
    <>
      {children}
      {!unobserve ? (
        <div className="w-full min-h-5" ref={observableElement}>
          {fallback}
        </div>
      ) : null}
    </>
  );
};

export default InfiniteScrolling;
