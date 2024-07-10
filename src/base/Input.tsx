import clsx from 'clsx';
import React, { forwardRef } from 'react';
import Label, { LabelProps } from './Label';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

type FormInput = InputProps & LabelProps;

export const Input = forwardRef<HTMLInputElement, FormInput>((props, ref) => {
  const {
    className = '',
    error,
    prefixIcon,
    suffixIcon,
    label,
    sublabel,
    ...rest
  } = props;

  return (
    <Label
      label={label}
      sublabel={sublabel}
      error={error}
      htmlFor={rest.id}
      className={clsx(rest.disabled ? 'pointer-events-none' : '', className)}
    >
      <div
        className={clsx(
          'flex items-center justify-start bg-palette-white-400 border border-solid border-palette-dark-blue/20 overflow-hidden px-4 focus:border-palette-black-600 focus-within:border-palette-black-600 transition-colors h-30 group rounded-4 w-full max-w-full',
          error ? '!border-red-300' : '',
          rest.disabled ? 'opacity-30' : ''
        )}
      >
        {prefixIcon ? (
          <div className={clsx('self-stretch flex items-center mr-2')}>
            {prefixIcon}
          </div>
        ) : null}
        <input
          {...rest}
          className={clsx(
            'bg-transparent poppins-m-15 text-palette-black placeholder:poppins-14 placeholder:text-palette-black/60 grow disabled:bg-transparent w-full max-w-full',
            'group-focus:!outline-none group-focus-visible:!outline-none'
          )}
          ref={ref}
        />
        {suffixIcon ? (
          <div className={clsx('self-stretch flex items-center ml-2')}>
            {suffixIcon}
          </div>
        ) : null}
      </div>
    </Label>
  );
});

Input.displayName = 'Input';

export default Input;
