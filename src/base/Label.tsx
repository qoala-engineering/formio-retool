import { clsx } from 'clsx';
import React from 'react';

export interface LabelProps {
  className?: string;
  error?: boolean | string;
  label?: string;
  sublabel?: string;
  htmlFor?: string;
}

const Label = ({
  children,
  className = '',
  error,
  label,
  htmlFor
}: LabelProps & { children: React.ReactNode }) => {
  return (
    <div className={className}>
      {label ? (
        <label
          className={clsx(
            'block dm-sans-b-17 w-full mb-4 cursor-pointer',
            error ? 'text-red-300' : 'text-palette-dark-blue'
          )}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
};
export default Label;
