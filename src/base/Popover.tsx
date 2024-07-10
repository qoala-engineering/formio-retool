import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'
import * as React from 'react'
import { Placement, usePositions } from './utils'
import useElementDimensions from '../utilities/src/hooks/useElementDimensions'

interface Props {
  children: React.ReactNode
  className?: string
  hasClose?: boolean
  onBlur?: () => void
  onFocus?: () => void
  placement?: Placement
  trigger: ((open: boolean) => React.ReactNode) | React.ReactNode
  width?: number
}

export type PopoverRef = { closePopup: () => void }

const Popover = React.forwardRef<PopoverRef, Props>(
  (
    {
      children,
      className,
      hasClose,
      placement = 'bottom',
      trigger,
      width = 0,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const { ref: triggerRef, dimensions } =
      useElementDimensions<HTMLButtonElement>()
    const closeRef = React.useRef<HTMLButtonElement>(null)
    const [side, align] = usePositions(placement)

    React.useImperativeHandle(
      ref,
      () => ({
        closePopup: () => {
          setOpen((old) => !old)
        }
      }),
      []
    )

    const onOpenChange = React.useCallback((value: boolean) => {
      setOpen(value)
      rest.onBlur?.()
    }, [])

    const calculatedWidth =
      typeof width === 'number' && width > 0 ? width : dimensions.width
    return (
      <PopoverPrimitive.Root onOpenChange={onOpenChange} open={open}>
        <PopoverPrimitive.Trigger asChild className="w-full" ref={triggerRef}>
          {trigger instanceof Function ? trigger(open) : trigger}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align={align}
            className={clsx(
              'z-50 rounded-2 border border-palette-dark-blue/20 bg-palette-white-400 p-4 text-pop-black',
              hasClose ? 'pt-10' : '',
              className
            )}
            side={side}
            sideOffset={4}
            style={
              calculatedWidth !== 0 ? { width: `${calculatedWidth}px` } : {}
            }
            {...rest}
          >
            {children}
            <PopoverPrimitive.Close asChild ref={closeRef}>
              {hasClose ? (
                <button
                  aria-label="Close"
                  className="hover:bg-black-100/10 focus:bg-black-100/10 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  <svg
                    fill="none"
                    height="15"
                    viewBox="0 0 15 15"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              ) : null}
            </PopoverPrimitive.Close>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    )
  }
)
Popover.displayName = PopoverPrimitive.Popover.displayName

export default Popover
