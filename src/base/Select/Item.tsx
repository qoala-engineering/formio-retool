import clsx from 'clsx';
import React, { forwardRef, memo } from 'react';
import TickIcon from '../../icons/TIckIcon';

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
}

const Item = forwardRef<HTMLDivElement, Props>(function Item(
  { children, className = '', selected = false, ...props },
  ref
) {
  return (
    <div
      className={clsx(
        'w-full flex justify-start items-center py-2 text-palette-black-600 dm-sans-14 hover:bg-palette-black-600/10 cursor-pointer',
        'focus-visible:![box-shadow:none] focus-visible:!outline-none focus-within:!outline-none ',
        className
      )}
      {...props}
      ref={ref}
    >
      <div className="grow">{children}</div>
      {selected ? (
        <TickIcon className="[&>path]:stroke-palette-black-600" />
      ) : null}
    </div>
  );
});

export const ItemSkeletal: React.FC = () => {
  return (
    <div className="w-full flex flex-col flex-nowrap px-3 my-2">
      {Array.from({ length: 2 }).map((_e, i) => (
        <div
          className="h-10 animate-pulse bg-black-100/10 rounded-sm"
          key={i}
        />
      ))}
    </div>
  );
};

export default memo(Item);
