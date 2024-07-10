import clsx from 'clsx';
import React, { forwardRef, useId } from 'react';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, className = '', checked, ...rest } = props;

  const id = useId();
  return (
    <label
      className={clsx('flex items-center justify-start', className)}
      htmlFor={`switch-${id}`}
    >
      {label ? (
        <p className="poppins-m-14 text-palette-dark-blue grow shrink">
          {label}
        </p>
      ) : null}
      <div className="h-15 w-25 grow-0 p-[2px] relative shrink-0 rounded-full overflow-hidden">
        <input
          {...rest}
          className="sr-only peer"
          type="checkbox"
          checked={checked}
          id={`switch-${id}`}
        />
        <div className="w-full h-full bg-palette-light-gray-400/75 peer-checked:bg-palette-dark-blue transition-colors duration-300 absolute top-0 left-0" />
        <div className="bg-palette-white transition-transform duration-300 peer-checked:translate-x-4 h-[26px] w-[26px] relative z-[1] rounded-circle" />
      </div>
    </label>
  );
});

export default Switch;
