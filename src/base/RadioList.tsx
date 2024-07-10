import clsx from 'clsx'
import React, { FC, Fragment, forwardRef, useId } from 'react'
import TickIcon from '../icons/TIckIcon'
import { GenericItemType } from './Select/types'
import Label, { LabelProps } from './Label'

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref' | 'value'>,
    LabelProps {
  options: Array<{
    label: string
    value: any
    disabled?: boolean
    sub_label?: string
  }>
  value?:
    | string
    | number
    | { label: string; value: any; disabled?: boolean; sub_label?: string }
}

const RadioList: FC<Props> = (props) => {
  const {
    label,
    options,
    className = '',
    name,
    onChange,
    value,
    error,
    ...rest
  } = props

  const getValue = (item: any) =>
    typeof item === 'object' ? (item as GenericItemType)?.value : item

  const getLabel = (item: any) =>
    String(typeof item === 'object' ? (item as GenericItemType)?.label : item)

  const id = useId()
  return (
    <Label label={label}>
      <div className={clsx('w-full grid grid-cols-1 gap-y-5', className)}>
        {options.map((item, idx) => (
          <Fragment key={`radio-${id}-${idx}`}>
            <div className="w-full">
              <label
                className={clsx(
                  'flex items-center justify-start',
                  item.disabled ? 'pointer-events-none opacity-50' : '',
                  className
                )}
                htmlFor={`radio-${id}-${idx}`}
              >
                {getLabel(item) ? (
                  <p className="poppins-m-14 text-palette-dark-blue grow shrink whitespace-pre">
                    {getLabel(item)}
                  </p>
                ) : null}
                <div className="h-12 w-12 grow-0 relative shrink-0 rounded-full overflow-hidden">
                  <input
                    className="sr-only peer"
                    type="radio"
                    checked={getValue(item) === getValue(value)}
                    id={`radio-${id}-${idx}`}
                    name={name}
                    onChange={onChange}
                    value={getValue(item)}
                  />
                  <div
                    className={clsx(
                      'w-full h-full border border-solid rounded-full',
                      error ? 'border-red-300' : 'border-palette-black-600'
                    )}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-palette-light-blue flex items-center justify-center opacity-0 peer-checked:opacity-100">
                    <TickIcon />
                  </div>
                </div>
              </label>
              {item.sub_label ? (
                <p
                  className={clsx(
                    'dm-sans-15 mt-2 max-w-[28ch]',
                    item.disabled
                      ? 'text-palette-error'
                      : 'text-palette-black-600/50'
                  )}
                >
                  {item.sub_label}
                </p>
              ) : null}
            </div>
            <div className="w-full h-[1px] bg-palette-black-600/20" />
          </Fragment>
        ))}
      </div>
    </Label>
  )
}

export default RadioList
