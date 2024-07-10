import clsx from 'clsx'
import React, { FC, useId } from 'react'
import TickIcon from '../icons/TIckIcon'
import { GenericItemType } from './Select/types'
import { LabelProps } from './Label'

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref' | 'value'>,
    LabelProps {
  options: Array<string | number | { label: string; value: any }>
  value?: string | number | { label: string; value: any }
}

const RadioGroup: FC<Props> = (props) => {
  const { label, error, options, className = '', name, onChange, value } = props

  const getValue = (item: any) =>
    typeof item === 'object' ? (item as GenericItemType)?.value : item

  const getLabel = (item: any) =>
    String(typeof item === 'object' ? (item as GenericItemType)?.label : item)

  const id = useId()
  return (
    <div
      className={clsx(
        'w-full flex gap-x-2 items-center justify-between flex-wrap',
        className
      )}
    >
      {label ? (
        <p className="dm-sans-14 text-palette-black-600/60">{label}</p>
      ) : null}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        {options.map((item, idx) => (
          <label
            className={clsx(
              'flex items-center justify-start gap-x-1',
              className
            )}
            htmlFor={`radio-${id}-${idx}`}
            key={`radio-${id}-${idx}`}
          >
            <div className="h-12 w-12 grow-0 relative shrink-0 rounded-full overflow-hidden">
              <input
                className="sr-only peer"
                type="radio"
                checked={getValue(value) === getValue(item)}
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
            {getLabel(item) ? (
              <p className="dm-sans-m-14 text-palette-dark-blue grow shrink whitespace-pre">
                {getLabel(item)}
              </p>
            ) : null}
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup
