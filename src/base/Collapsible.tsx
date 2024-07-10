import clsx from 'clsx'
import React, { FC, forwardRef, useState } from 'react'
// import ChevronRight from '../icons/ChevronRight';

export interface CollapsibleProps {
  className?: string
  defaultOpen?: boolean
  title: React.ReactNode
  children?: React.ReactNode
  id?: string
}

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (props, ref) => {
    const { className = '', defaultOpen, title, children, id } = props

    const [toggle, setToggle] = useState(defaultOpen)

    return (
      <div className={clsx('w-full', className)} ref={ref}>
        <div
          className="min-h-6 w-full flex items-center justify-start gap-x-2"
          onClick={() => setToggle((old) => !old)}
        >
          {title ? (
            <div className="text-palette-black-600 grow">{title}</div>
          ) : null}
          {/* <ChevronRight
            className={clsx(
              'w-3 transition-transform duration-500',
              toggle ? 'rotate-90' : '-rotate-90'
            )}
          /> */}
        </div>
        <div
          className={clsx(
            'transition-[max-height] duration-500 w-full overflow-hidden h-auto',
            toggle ? 'ease-in' : 'ease-out'
          )}
          style={{ maxHeight: toggle ? '100vh' : '0px' }}
          id={id}
        >
          {children}
        </div>
      </div>
    )
  }
)

export default Collapsible
