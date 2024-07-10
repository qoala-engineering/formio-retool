import clsx from 'clsx'
import React, { forwardRef, useId } from 'react'
import TickIcon from '../icons/TIckIcon'

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, className = '', checked, ...rest } = props

  const id = useId()
  return (
    <label
      className={clsx('flex items-center justify-start', className)}
      htmlFor={`checkbox-${id}`}
    >
      {label ? (
        <p className="poppins-m-14 text-palette-dark-blue grow shrink whitespace-pre">
          {label}
        </p>
      ) : null}
      <div className="h-12 w-12 grow-0 relative shrink-0 rounded-full overflow-hidden">
        <input
          {...rest}
          className="sr-only peer"
          type="checkbox"
          checked={checked}
          id={`checkbox-${id}`}
          ref={ref}
        />
        <div className="w-full h-full border border-solid border-palette-black-600 rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-palette-light-blue flex items-center justify-center opacity-0 peer-checked:opacity-100">
          <TickIcon />
        </div>
      </div>
    </label>
  )
})

export default Checkbox
