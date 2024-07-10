import { GenericItemType } from './types';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import React from 'react';
import Label from '../Label';
import Popover, { PopoverRef } from '../Popover';
import Item from './Item';
import { SelectProps, SingleSelectHandler } from './types';
import ChevronRight from '../../icons/ChevronRight';
import deepEqual from 'deep-equal';

const Select = <T,>(props: SelectProps<T>) => {
  const {
    accessorKey = {
      label: 'label',
      value: 'value'
    },
    className = '',
    disabled = false,
    error = false,
    label,
    maxHeight = 0,
    name = '',
    onChange,
    options,
    placeholder = '',
    popoverClassName = '',
    renderItem,
    sublabel,
    width = 0,
    value,
    searchable = false
  } = props;

  const [search, setSearch] = useState('');
  const popoverRef = useRef<PopoverRef>(null);
  const getValue = (item: null | T) =>
    typeof item === 'object'
      ? (item as GenericItemType)?.[accessorKey.value as string]
      : item;

  const getLabel = (item: null | T) =>
    String(
      typeof item === 'object'
        ? (item as GenericItemType)?.[accessorKey.label as string]
        : item
    );

  const getLabelFromValue = (item: null | T) => {
    if (!item) return null;
    const option = options?.find((e) => deepEqual(getValue(e), item));
    if (option) {
      return getLabel(option);
    }
    return getLabel(item);
  };

  const render =
    renderItem ??
    function (item: T) {
      return <>{getLabel(item)}</>;
    };

  const onItemClick = (item: T) => {
    const currentItemValue = getValue(item);
    (onChange as SingleSelectHandler<T>)({
      target: {
        current: item,
        name,
        value: currentItemValue === getValue(value) ? null : currentItemValue
      }
    });
    popoverRef.current?.closePopup();
  };

  const filteredOptions = options?.filter((e) =>
    getLabel(e).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Label
        className={clsx(disabled ? 'pointer-events-none' : '', className)}
        error={error}
        label={label}
        sublabel={sublabel}
      >
        <Popover
          className={clsx(
            'max-w-screen-md bg-palette-white-400 border border-solid border-palette-dark-blue/20 rounded-4',
            popoverClassName
          )}
          ref={popoverRef}
          width={width}
          onBlur={() => setSearch('')}
          trigger={(open) => (
            <div
              className={clsx(
                'flex items-center justify-start gap-x-2 bg-palette-white-400 border border-solid overflow-hidden px-4 transition-colors h-30 group rounded-4 w-full max-w-full border-palette-dark-blue/20',
                open ? '!border-palette-black-600' : '',
                error ? '!border-red-300' : '',
                disabled ? 'opacity-30' : ''
              )}
            >
              {!open || !searchable ? (
                <>
                  {value ? (
                    <p className="dm-sans-m-15 text-palette-black grow">
                      {getLabelFromValue(value)}
                    </p>
                  ) : (
                    <p className="dm-sans-14 text-palette-black/60 grow">
                      {placeholder}
                    </p>
                  )}
                </>
              ) : null}
              {open && searchable ? (
                <input
                  type="text"
                  className="bg-transparent dm-sans-m-15 text-palette-black placeholder:dm-sans-14 placeholder:text-palette-black/60 grow disabled:bg-transparent focus:outline-none focus-visible:outline-none focus-within:outline-none"
                  placeholder="type to search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                />
              ) : null}
              <ChevronRight
                className={clsx(
                  'w-4 transition-transform duration-300',
                  open ? 'rotate-90' : '-rotate-90'
                )}
              />
            </div>
          )}
        >
          <div
            className="w-full overflow-auto scrollbar-hide"
            style={maxHeight !== 0 ? { maxHeight: `${maxHeight}px` } : {}}
          >
            {filteredOptions?.map((item) => (
              <Item
                key={getLabel(item)}
                onClick={(e) => {
                  e.stopPropagation();
                  onItemClick(item);
                }}
                selected={deepEqual(getValue(item), getValue(value))}
                tabIndex={0}
              >
                {render(item)}
              </Item>
            ))}
          </div>
        </Popover>
      </Label>
    </>
  );
};

export default Select;
