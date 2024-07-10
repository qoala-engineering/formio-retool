import clsx from 'clsx';
import React, { FC } from 'react';

type VARIANT = 'light' | 'dark' | 'primary';

interface Props {
  className?: string;
  size?: number;
  variant?: VARIANT;
}

const Loader: FC<Props> = ({ className, size, variant = 'light' }) => {
  return (
    <div
      aria-label="loading"
      className={clsx(
        'inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid',
        variant === 'light' ? 'border-palette-white border-r-transparent' : '',
        variant === 'dark'
          ? 'border-palette-black-600 border-r-transparent'
          : '',
        variant === 'primary'
          ? 'border-primary-color border-r-transparent'
          : '',
        className
      )}
      style={{ height: size, width: size }}
    />
  );
};

export const FullScreenLoader: FC<Props> = (props) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader {...props} />
    </div>
  );
};

export default Loader;
