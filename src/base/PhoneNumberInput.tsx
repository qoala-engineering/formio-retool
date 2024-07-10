import React, { forwardRef } from 'react';
import 'react-phone-number-input/style.css';
import Input, { InputProps } from './Input';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';

interface Props extends Omit<InputProps, 'value'> {
  value?: {
    dial_code: string;
    value: string;
  };
}

const PhoneNumberInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value, ...props }, ref) => {
    return (
      <PhoneInput
        {...props}
        value={(value?.dial_code ?? '') + (value?.value ?? '')}
        numberInputProps={{ inputMode: 'tel', type: 'text' }}
        inputComponent={Input}
        countrySelectProps={{ unicodeFlags: true }}
        international
        countryCallingCodeEditable={false}
        onChange={(value) => {
          const parsedNumber = parsePhoneNumber(value ?? '');
          if (parsedNumber) {
            onChange?.({
              target: {
                name: props.name,
                value: {
                  value: parsedNumber.nationalNumber,
                  dial_code: `+${parsedNumber.countryCallingCode}`
                }
              }
            } as any);
          } else {
            onChange?.({ target: { name: props.name, value: {} } } as any);
          }
        }}
        ref={ref as any}
        className="flex items-center justify-start gap-x-2"
      />
    );
  }
);

export default PhoneNumberInput;
