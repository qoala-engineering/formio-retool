import { animated } from '@react-spring/web';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useBottomSheetMechanics } from './hook';
import { BottomSheetProps } from './types';
import { Portal } from 'react-portal';

const Sheet: FC<BottomSheetProps> = (props) => {
  const {
    blocking = false,
    children,
    onAfterClose,
    onAfterOpen,
    onBeforeClose,
    onBeforeOpen,
    onClose,
    open = false,
    scrollable = false,
    type = 'normal'
  } = props;

  const { bind, cardRef, opacity, y } = useBottomSheetMechanics({
    blocking,
    onAfterClose,
    onAfterOpen,
    onBeforeClose,
    onBeforeOpen,
    onClose,
    open
  });

  return (
    <Portal node={document.getElementById('bottomsheet-portal')!}>
      <div className="w-screen h-screen fixed top-0 z-50">
        <animated.div
          className={clsx(
            'fixed z-2 bg-palette-white overflow-hidden',
            type === 'normal'
              ? 'w-full left-0 bottom-0 max-h-[80vh] rounded-t-9 border border-solid border-pop-white-200 border-b-0 pb-safe-0'
              : 'w-[calc(100%_-_30px)] left-3 bottom-safe-6 pwa:bottom-safe-0 max-h-[75%] rounded-15'
          )}
          style={
            {
              y
            } as never
          }
        >
          <animated.div
            className={clsx(
              'w-full max-h-[80vh]',
              !scrollable ? 'overflow-hidden' : 'overflow-auto scrollbar-hide'
            )}
            ref={cardRef}
            {...(!scrollable ? bind({ contentSheet: true }) : {})}
          >
            {children}
          </animated.div>
        </animated.div>
        <animated.div
          className="w-full h-full top-0 left-0 bg-palette-black/75 touch-none absolute z-1"
          style={{ opacity }}
          {...bind({ closeOnTap: !blocking })}
        ></animated.div>
      </div>
    </Portal>
  );
};

export default Sheet;
