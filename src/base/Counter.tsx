import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface Props {
  label?: string;
  sublabel?: string;
  min?: number;
  max?: number;
  className?: string;
  name?: string;
  onChange: ({
    target: { name, value }
  }: {
    target: { name?: string; value: number };
  }) => void;
  value?: number;
}

const Counter = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className = '',
    label = '',
    sublabel = '',
    value = 0,
    onChange,
    min,
    max,
    name
  } = props;

  const handleChange = (inc = true) => {
    let newValue = value;
    if (inc) {
      newValue =
        typeof max === 'number'
          ? newValue < max
            ? newValue + 1
            : newValue
          : newValue + 1;
    } else {
      newValue =
        typeof min === 'number'
          ? newValue > min
            ? newValue - 1
            : newValue
          : newValue - 1;
    }
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div className={clsx('flex items-center justify-start', className)}>
      {label ? (
        <div className="grow">
          <p className="poppins-m-17 text-palette-dark-blue">{label}</p>
          {sublabel ? (
            <p className="poppins-12 text-palette-dark-blue/50 mt-[2px]">
              {sublabel}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="flex items-center justify-start gap-x-3 select-none">
        <div
          className="rounded-circle border border-solid border-palette-light-gray-400/75 poppins-m-26 h-17 w-17 flex items-center justify-center"
          onClick={() => handleChange(false)}
        >
          -
        </div>
        <p className="poppins-m-17 text-palette-dark-blue w-10 text-center">
          {value}
        </p>
        <div
          className="rounded-circle border border-solid border-palette-light-gray-400/75 poppins-m-26 h-17 w-17 flex items-center justify-center"
          onClick={() => handleChange()}
        >
          +
        </div>
      </div>
    </div>
  );
});

export default Counter;
