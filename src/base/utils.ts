import { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';

type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;

const Side = ['top', 'right', 'bottom', 'left'] as const;
const Align = ['start', 'end', 'center'] as const;

export type Placement = `${ElementType<typeof Side>}${
  | ''
  | `-${ElementType<typeof Align>}`}`;

export const usePositions = (placement: Placement = 'top-center') => {
  const [side, align] = placement.split('-') as [
    ElementType<typeof Side>,
    ElementType<typeof Align>
  ];

  if (
    Side.indexOf(side) === -1 ||
    (Align.indexOf(align) === -1 && align?.length)
  ) {
    throw new Error(`Invalid placement: ${placement}`);
  }

  return [side, align ?? 'center'] as const;
};

export enum DATE_TYPE_MODE {
  iso = 'iso',
  utc = 'utc',
  timestamp = 'timestamp'
}

export type DATE_TYPE_MODE_KEY = keyof typeof DATE_TYPE_MODE;

export const returnParsedDateByMode = (
  value: Date | string | number | undefined,
  mode: DATE_TYPE_MODE_KEY = 'iso'
) => {
  if (value === undefined) return undefined;
  const parsedDate = new Date(value);
  switch (mode) {
    case 'iso':
      return parsedDate.toISOString();
    case 'utc':
      return parsedDate.toUTCString();
    case 'timestamp':
      return parsedDate.valueOf();
  }
};

const useClientHeight = <A extends HTMLElement>(): [
  MutableRefObject<A>,
  number
] => {
  const ref = useRef<A>() as MutableRefObject<A>;
  const [clientHeight, setClientHeight] = useState(0);

  useLayoutEffect(() => {
    setClientHeight(ref.current?.clientHeight ?? 0);

    function handleResize() {
      setClientHeight(ref.current?.clientHeight ?? 0);
    }

    window.addEventListener('resize', handleResize);
    ref.current?.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ref.current?.removeEventListener('resize', handleResize);
    };
  }, []);

  return [ref, clientHeight];
};

export default useClientHeight;
