import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import Calendar, { MinMaxDateSchema } from './Calendar';
import Label, { LabelProps } from './Label';
import Button from './Button';
import { DATE_TYPE_MODE_KEY, returnParsedDateByMode } from './utils';

dayjs.extend(utc);

export type DatePickerOnChange = (e: {
  target: { name?: string; value?: string | number };
}) => void;

export type DatePickerProps = LabelProps & {
  className?: string;
  defaultTodaySelected?: boolean;
  enableTimePicker?: boolean;
  format?: string;
  maxDate?: MinMaxDateSchema;
  minDate?: MinMaxDateSchema;
  defaultOpen?: boolean;
  onChange?: DatePickerOnChange;
  name?: string;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  parentClassName?: string;
  mode?: DATE_TYPE_MODE_KEY;
};

const DATE_PLACEHOLDER = 'dd/mm/yyyy';
const DATE_FORMAT = 'DD/MM/YYYY';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const {
      className = '',
      value,
      defaultTodaySelected = false,
      error,
      format = '',
      label,
      placeholder,
      sublabel,
      onChange,
      defaultOpen = false,
      disabled = false,
      mode = 'iso',
      ...restProps
    } = props;
    const [open, setOpen] = useState(defaultOpen);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      undefined
    );

    const onDateChange = (value: Date | undefined = undefined) => {
      const parsedValue = returnParsedDateByMode(value, mode);
      onChange?.({
        target: {
          name: props.name,
          value: parsedValue
        }
      } as any);
      setOpen(false);
    };

    useEffect(() => {
      setSelectedDate(value ? new Date(value) : undefined);
    }, [value]);

    useEffect(() => {
      if (defaultTodaySelected) {
        const today = returnParsedDateByMode(new Date(), mode);
        onChange?.({
          target: {
            name: props.name,
            value: today
          }
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _selected = props.value;
    const _placeholder =
      typeof placeholder === 'string' && placeholder
        ? placeholder
        : DATE_PLACEHOLDER;
    const _dateFormat = format ? format : DATE_FORMAT;

    return (
      <Label
        className={clsx(disabled ? 'pointer-events-none' : '', className)}
        error={error}
        label={label}
        sublabel={sublabel}
      >
        <Dialog.Root onOpenChange={setOpen} open={open}>
          <Dialog.Trigger className="w-full">
            <div
              className={clsx(
                'flex items-center justify-start bg-palette-white-400 border border-solid overflow-hidden px-4 transition-colors h-30 group rounded-4 w-full max-w-full border-palette-dark-blue/20',
                open ? '!border-palette-black-600' : '',
                error ? '!border-red-300' : '',
                disabled ? 'opacity-30' : ''
              )}
            >
              {_selected ? (
                <p className="poppins-m-15 text-palette-black">
                  {dayjs(new Date(_selected as string)).format(_dateFormat)}
                </p>
              ) : (
                <p className="poppins-14 text-palette-black/60">
                  {_placeholder}
                </p>
              )}
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed w-screen max-w-screen-md h-screen left-1/2 top-0 -translate-x-1/2 z-5 bg-palette-black/50" />
            <Dialog.Content className="fixed z-51 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-palette-white p-4 rounded-4 overflow-hidden h-[500px] flex flex-col items-stretch justify-start">
              <div className="w-full grow">
                <Calendar
                  onChange={(value) => setSelectedDate(value)}
                  value={selectedDate}
                  {...restProps}
                />
              </div>
              <div className="flex items-center justify-between gap-x-2 mt-6">
                <Button
                  size="lg"
                  variant="primary"
                  outlined
                  onClick={() => onDateChange()}
                >
                  Clear
                </Button>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => onDateChange(selectedDate)}
                >
                  Apply
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Label>
    );
  }
);

DatePicker.displayName = 'DatePicker';
export default DatePicker;
