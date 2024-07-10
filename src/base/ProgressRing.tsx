import clsx from 'clsx'
import React, { FC, useRef } from 'react'
import useMounted from '../utilities/src/hooks/useMounted'

type VARIANTS = 'primary' | 'default'

interface Props {
  progress?: number
  variant?: VARIANTS
  className?: string
  subtext?: string
  size?: number
}

const getVariantStyling = (variant: VARIANTS) => {
  switch (variant) {
    case 'primary':
      return 'stroke-primary-color'
    default:
      return 'stroke-black'
  }
}

const ProgressRing: FC<Props> = ({
  progress = 0,
  variant = 'primary',
  className = '',
  subtext = 'DONE'
}) => {
  const ringRef = useRef<HTMLDivElement>(null)
  const mounted = useMounted()

  const strokeDasharray = 2 * 3.14 * 45
  const calculatedProgress =
    strokeDasharray - (strokeDasharray * progress) / 100
  return (
    <div
      className={clsx(
        'rounded-circle h-30 w-30 bg-transparent p-[2.5px] box-border',
        'flex items-center justify-center relative',
        className
      )}
      ref={ringRef}
    >
      <div className="rounded-circle bg-transparent w-full h-full border border-solid border-palette-dark-blue/20 z-1 flex flex-col items-center justify-center">
        <p className="text-black poppins-m-13 !leading-none">{progress}%</p>
        {subtext ? (
          <p className="text-palette-black/70 poppins-m-10 !leading-none">
            {subtext}
          </p>
        ) : null}
      </div>
      <div className="absolute z-2 w-full h-full top-0 left-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            className={clsx(
              'fill-none transition-[stroke-dashoffset] duration-1000 ease-out',
              getVariantStyling(variant)
            )}
            style={{
              strokeDasharray,
              strokeWidth: '10px',
              strokeDashoffset: mounted ? calculatedProgress : strokeDasharray
            }}
          />
        </svg>
      </div>
    </div>
  )
}

export default ProgressRing
