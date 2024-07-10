import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const dayjsInstance = dayjs;

export const getCurrentDateInfo = (
  date: Date | number | string | undefined = undefined
) => {
  if (date === undefined || date === null) return null;
  const today = dayjs(date);
  return {
    clockType: today.format('A'),
    day: {
      long: today.format('dddd'),
      numeric: today.format('DD'),
      short: today.format('ddd')
    },
    hour: {
      12: today.format('hh'),
      24: today.format('HH')
    },
    minutes: today.format('mm'),
    month: {
      long: today.format('MMM'),
      numeric: today.format('MM'),
      short: today.format('MMM')
    },
    seconds: today.format('ss'),
    year: {
      long: today.format('YYYY'),
      short: today.format('YY')
    }
  };
};
