import clsx from 'clsx';
import React, { forwardRef } from 'react';
import Loader from './Loader';

export type BUTTON_VARIANTS =
  | 'primary'
  | 'light'
  | 'default'
  | 'link'
  | 'grayed';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  outlined?: boolean;
  variant?: BUTTON_VARIANTS;
  loading?: boolean;
  loaderSize?: number;
  size?: 'sm' | 'md' | 'lg';
  flushStyling?: boolean;
}

const getVariantStyling = (variant: BUTTON_VARIANTS, outlined: boolean) => {
  switch (variant) {
    case 'primary':
      return outlined
        ? 'border border-solid border-primary-color text-primary-color bg-transparent'
        : 'bg-primary-color text-palette-white';
    case 'light':
      return outlined
        ? 'border border-solid border-palette-white text-palette-white bg-transparent'
        : 'bg-palette-white text-palette-dark-blue-400';
    case 'link':
      return 'text-palette-info';
    case 'grayed':
      return outlined
        ? 'border border-solid border-palette-light-gray-400/30 text-palette-black-600 bg-transparent'
        : 'bg-palette-light-gray-400/30 text-palette-black-600';
    default:
      return outlined
        ? 'border border-solid border-black text-palette-black-600 bg-transparent'
        : 'bg-palette-black-600 text-palette-white-600';
  }
};

const Button = forwardRef<HTMLButtonElement, Props>(
  function Button(props, ref) {
    const {
      className,
      outlined = false,
      variant = 'default',
      children,
      loading = false,
      loaderSize = 20,
      size = 'md',
      flushStyling = false,
      ...restProps
    } = props;

    return (
      <button
        {...restProps}
        className={clsx(
          'flex items-center justify-center transition-opacity duration-300 ease-out disabled:opacity-30 disabled:pointer-events-none',
          size === 'lg' && variant !== 'link' ? 'h-25 px-6 poppins-sb-16' : '',
          size === 'md' && variant !== 'link' ? 'h-16 px-4 dm-sans-b-14' : '',
          size === 'sm' && variant !== 'link'
            ? 'h-14 px-[12px] poppins-m-10 '
            : '',
          variant === 'link'
            ? 'dm-sans-b-13 text-primary-color'
            : 'rounded-26 px-7',
          loading ? 'pointer-events-none' : '',
          !flushStyling ? getVariantStyling(variant, outlined) : '',
          className
        )}
        ref={ref}
      >
        {loading ? <Loader size={loaderSize} /> : children}
      </button>
    );
  }
);

export default Button;
