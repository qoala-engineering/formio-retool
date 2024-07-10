import { ComponentType } from 'react';

const retry = <T extends any>(
  fn: () => Promise<{ default: ComponentType<T> }>,
  retriesLeft = 10,
  interval = 1000
): Promise<{ default: ComponentType<T> }> => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject if retry limit exceeded
            reject(error);
          }
          // retry
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

export default retry;
