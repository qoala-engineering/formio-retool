import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { FC, useEffect, useState } from 'react';

import Calendar, { DateRange, MinMaxDateSchema } from './Calendar';
import Label, { LabelProps } from './Label';
import Button from './Button';
import { DATE_TYPE_MODE_KEY, returnParsedDateByMode } from './utils';

dayjs.extend(utc);

export type DateRangeValue = {
  from?: string | number;
  to?: string | number;
};

export type DateRangeOnChange = (e: {
  target: { name?: string; value: DateRangeValue };
}) => void;

export type DatePickerProps = LabelProps & {
  className?: string;
  defaultSelected?: {
    from?: Date | string | number;
    to?: Date | string | number;
  };
  enableTimePicker?: boolean;
  format?: string;
  maxDate?: MinMaxDateSchema;
  minDate?: MinMaxDateSchema;
  defaultOpen?: boolean;
  value?: DateRangeValue;
  onChange?: DateRangeOnChange;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  mode?: DATE_TYPE_MODE_KEY;
};

const DATE_PLACEHOLDER = 'dd/mm/yyyy';
const DATE_FORMAT = 'DD/MM/YYYY';

export const DateRangePicker: FC<DatePickerProps> = (props) => {
  const {
    defaultSelected,
    error,
    format = '',
    label,
    placeholder,
    sublabel,
    onChange,
    defaultOpen = false,
    name = '',
    value,
    disabled = false,
    className = '',
    mode = 'iso',
    ...restProps
  } = props;
  const [open, setOpen] = useState(defaultOpen);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const onDateChange = (range?: DateRange) => {
    const from = returnParsedDateByMode(range?.from, mode);
    const to = returnParsedDateByMode(range?.to, mode);
    onChange?.({
      target: {
        name,
        value:
          range !== undefined
            ? {
                from,
                to
              }
            : undefined
      }
    } as any);
    setOpen(false);
  };

  useEffect(() => {
    if (value !== undefined) {
      const { from, to } = value;
      setSelectedRange({
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined
      });
    } else {
      setSelectedRange(undefined);
    }
  }, [value]);

  useEffect(() => {
    let from, to;
    if (defaultSelected?.from) {
      from = returnParsedDateByMode(defaultSelected.from, mode);
    }
    if (defaultSelected?.to) {
      to = returnParsedDateByMode(defaultSelected.to, mode);
    }
    if (defaultSelected) {
      onChange?.({ target: { name: name, value: { from, to } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {value?.from ? (
              <p className="poppins-m-15 text-palette-black">
                {dayjs(new Date(value.from as string)).format(_dateFormat)}
              </p>
            ) : (
              <p className="poppins-14 text-palette-black/60">{_placeholder}</p>
            )}
            <p className="poppins-14 text-palette-black/60 mx-1">to</p>
            {value?.to ? (
              <p className="poppins-m-15 text-palette-black">
                {dayjs(new Date(value.to as string)).format(_dateFormat)}
              </p>
            ) : (
              <p className="poppins-14 text-palette-black/60">{_placeholder}</p>
            )}
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed w-screen max-w-screen-md h-screen left-1/2 top-0 -translate-x-1/2 z-5 bg-palette-black/50" />
          <Dialog.Content className="fixed z-51 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-palette-white p-4 rounded-4 overflow-hidden">
            <Calendar
              onChange={(range) => setSelectedRange(range)}
              value={selectedRange}
              mode="range"
              {...restProps}
            />
            <div className="flex items-center justify-between gap-x-2 mt-2 pt-4 border-t border-solid border-palette-light-gray">
              <div className="w-50 h-20 rounded-8 border border-solid border-palette-black-600/90 relative flex items-center justify-center">
                <div className="poppins-10 text-palette-black/600/60 bg-palette-white w-min absolute px-1 top-0 left-2 -translate-y-1/2">
                  From
                </div>
                {selectedRange?.from instanceof Date ? (
                  <p className="poppins-14 text-palette-black">
                    {dayjs(selectedRange.from).format(_dateFormat)}
                  </p>
                ) : (
                  <p className="poppins-11 text-palette-black/60">
                    {_placeholder}
                  </p>
                )}
              </div>
              <div className="w-50 h-20 rounded-8 border border-solid border-palette-black-600/90 relative flex items-center justify-center">
                <div className="poppins-10 text-palette-black/600/60 bg-palette-white w-min absolute px-1 top-0 left-2 -translate-y-1/2">
                  To
                </div>
                {selectedRange?.to instanceof Date ? (
                  <p className="poppins-14 text-palette-black">
                    {dayjs(selectedRange.to).format(_dateFormat)}
                  </p>
                ) : (
                  <p className="poppins-11 text-palette-black/60">
                    {_placeholder}
                  </p>
                )}
              </div>
              <Button
                size="md"
                className="!h-20 !rounded-8"
                variant="primary"
                onClick={() => onDateChange(selectedRange)}
              >
                Apply
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Label>
  );
};

export default DateRangePicker;
