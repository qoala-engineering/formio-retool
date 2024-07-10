import useElementDimensions from '../utilities/src/hooks/useElementDimensions'
import clsx from 'clsx'
import dayjs from 'dayjs'
import React, {
  FC,
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState
} from 'react'
import {
  DateRange,
  DayPicker,
  DayPickerRangeProps,
  DayPickerSingleProps
} from 'react-day-picker'

export type MinMaxDateSchema = {
  key: 'days' | 'hours' | 'minutes' | 'months' | 'year'
  value: number
}

const generateYearData = (minYear = 1900, maxYear = 2100) => {
  const data: number[] = []
  for (let i = minYear; i <= maxYear; i++) {
    data.push(i)
  }
  return data
}

export type CalendarProps = {
  className?: string
  defaultEndDate?: Date
  defaultStartDate?: Date
  maxDate?: MinMaxDateSchema
  minDate?: MinMaxDateSchema
} & (CalendarRangeVariantProps | CalendarSingleVariantProps)

export type CalendarSingleVariantProps = {
  mode?: 'single'
  onChange: (value?: Date) => void
  value: DayPickerSingleProps['selected']
}

type CalendarRangeVariantProps = {
  mode: 'range'
  onChange: (range?: DateRange) => void
  value: DayPickerRangeProps['selected']
}

const calculateDifferenceAndReturnDate = (arg?: MinMaxDateSchema) => {
  if (typeof arg === 'object' && typeof arg.value === 'number' && arg.key) {
    const { key, value } = arg
    const current = new Date()
    switch (key) {
      case 'year':
        current.setFullYear(current.getFullYear() + value)
        break
      case 'months':
        current.setMonth(current.getMonth() + value)
        break
      case 'days':
        current.setDate(current.getDate() + value)
        break
      case 'hours':
        current.setHours(current.getHours() + value)
        break
      case 'minutes':
        current.setMinutes(current.getMinutes() + value)
        break
    }
    return current
  }
  return undefined
}

const Calendar: FC<CalendarProps> = (props) => {
  const {
    defaultEndDate = '2100-12-30T18:30:00.000Z',
    defaultStartDate = '1900-01-31T18:30:00.000Z',
    maxDate,
    minDate,
    ...restProps
  } = props
  const modifiedProps = {
    ...restProps,
    className: clsx('inline-block', props.className),
    mode: props.mode ?? 'single',
    onSelect: props.onChange,
    selected: props.value,
    showOutsideDays: true,
    weekStartsOn: 1
  } as React.ComponentProps<typeof DayPicker>

  const id = useId()
  const uniqueCalendarId = `day-picker-${id}`
  const [showYears, setShowYears] = useState(false)

  const [defaultMonthDate, setDefaultMonthDate] = useState<Date | undefined>(
    props.mode === 'range' ? props.value?.from : props.value
  )
  const calculatedMinDate = calculateDifferenceAndReturnDate(minDate)
  const calculatedMaxDate = calculateDifferenceAndReturnDate(maxDate)
  const calculatedDefaultStartDate = new Date(defaultStartDate)
  const calculatedDefaultEndDate = new Date(defaultEndDate)

  const { dimensions } = useElementDimensions(
    [uniqueCalendarId, defaultMonthDate],
    uniqueCalendarId
  )

  const YEARS_DATA = useMemo(() => {
    return generateYearData(
      calculatedMinDate?.getFullYear(),
      calculatedMaxDate?.getUTCFullYear()
    )
  }, [calculatedMinDate, calculatedMaxDate])

  const onYearSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { target } = e
    const year = (target as HTMLElement).dataset['year']
    if (year && !isNaN(parseInt(year))) {
      let newDefaultDate = defaultMonthDate
      newDefaultDate?.setFullYear(parseInt(year))
      if (
        calculatedMinDate instanceof Date &&
        dayjs(newDefaultDate).isBefore(calculatedMinDate)
      ) {
        newDefaultDate = calculatedMinDate
      }
      if (
        calculatedMaxDate instanceof Date &&
        dayjs(newDefaultDate).isAfter(calculatedMaxDate)
      ) {
        newDefaultDate = calculatedMaxDate
      }
      setDefaultMonthDate(newDefaultDate)
      setShowYears((old) => !old)
    }
  }

  useEffect(() => {
    const date = props.mode === 'range' ? props.value?.from : props.value
    if (date instanceof Date) {
      setDefaultMonthDate(date)
    } else {
      setDefaultMonthDate(new Date())
    }
  }, [props.value])

  useEffect(() => {
    function toggleYears(e: MouseEvent) {
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()

      setShowYears((old) => !old)
    }
    if (showYears) {
      const year = `year-${defaultMonthDate?.getFullYear()}`
      document.getElementById(year)?.scrollIntoView()
    } else {
      const element = document.querySelector('.year-picker-btn') as HTMLElement
      element?.addEventListener('click', toggleYears)
      return () => element?.removeEventListener('click', toggleYears)
    }
  }, [showYears, defaultMonthDate])

  return (
    <>
      {showYears ? (
        <div
          style={{ ...dimensions }}
          className="grid grid-cols-4 gap-2 overflow-auto scrollbar-hide w-full h-full"
          onClick={onYearSelect}
        >
          {YEARS_DATA.map((year) => (
            <div
              className={clsx(
                'p-2 flex items-center justify-center',
                year === defaultMonthDate?.getFullYear()
                  ? 'bg-primary-color rounded-full poppins-sb-16 text-palette-white'
                  : 'bg-transparent poppins-14 text-palette-black-600 '
              )}
              id={`year-${year}`}
              data-year={year}
              key={year}
            >
              {year}
            </div>
          ))}
        </div>
      ) : (
        <DayPicker
          {...modifiedProps}
          id={uniqueCalendarId}
          classNames={{
            caption: 'flex items-center justify-center p-2 relative',
            caption_label:
              'poppins-sb-16 text-palette-black-600 year-picker-btn',
            cell: clsx(['p-0 relative']),
            day: clsx([
              'flex h-20 w-20 items-center justify-center p-0 rounded-full text-palette-black-500 poppins-14 [&:not(.day-today)]:focus:bg-primary-color/20 [&:not(.day-today)]:hover:bg-primary-color/20',
              modifiedProps.mode !== 'range' ? 'rounded-full' : ''
            ]),
            day_disabled: 'opacity-10',
            day_hidden: 'invisible',
            day_outside: 'opacity-20',
            day_range_end:
              'day-range-end [&.day-range-end]:rounded-r-full [&.day-range-end]:bg-primary-color [&.day-range-end]:text-palette-white focus:!bg-primary-color hover:!bg-primary-color',
            day_range_middle:
              'day-range-middle [&.day-range-middle]:bg-primary-color [&.day-range-middle]:text-palette-white focus:!bg-primary-color/30 hover:!bg-primary-color/30',
            day_range_start:
              'day-range-start [&.day-range-start]:rounded-l-full [&.day-range-start]:bg-primary-color [&.day-range-start]:text-palette-white focus:!bg-primary-color hover:!bg-primary-color',
            day_selected: clsx(
              modifiedProps.mode === 'single' &&
                'day-selected [&.day-selected]:bg-primary-color [&.day-selected]:text-palette-white focus:!bg-primary-color hover:!bg-primary-color'
            ),
            day_today:
              'day-today bg-primary-color/10 focus:bg-primary-color/20 hover:bg-primary-color/20',
            head_cell:
              'flex w-20 h-20 items-center justify-center text-palette-black-600/40 poppins-m-15',
            head_row: 'flex justify-around mb-0.5 mt-3 w-full',
            months:
              'flex flex-col sm:flex-row space-y-6 sm:space-x-6 sm:space-y-0',
            nav: 'flex items-center',
            nav_button:
              'flex h-9 items-center justify-center p-2 w-9 [&>svg]:h-8 [&>svg]:shrink-0 [&>svg]:w-8',
            nav_button_next: 'absolute right-0',
            nav_button_previous: 'absolute left-0',
            root: 'w-full',
            row: 'flex justify-around my-1 w-full',
            table: 'border-collapse w-full',
            ...modifiedProps.classNames
          }}
          disabled={[
            { from: calculatedDefaultStartDate, to: calculatedMinDate },
            { from: calculatedMaxDate, to: calculatedDefaultEndDate }
          ]}
          defaultMonth={defaultMonthDate}
        />
      )}
    </>
  )
}

Calendar.displayName = 'Calendar'
export default Calendar
export type { DateRange }
