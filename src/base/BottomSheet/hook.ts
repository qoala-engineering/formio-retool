import { useSpring } from '@react-spring/web';
import { Handler, rubberbandIfOutOfBounds, useDrag } from '@use-gesture/react';
import useClientHeight from '../utils';
import { useEffect, useRef } from 'react';

import { UseBottomSheetMechanicsArgs } from './types';

const twoThirdOf = (number: number) => (number * 2) / 3;

export const useBottomSheetMechanics = ({
  blocking,
  onAfterClose,
  onAfterOpen,
  onBeforeClose,
  onBeforeOpen,
  onClose,
  open
}: UseBottomSheetMechanicsArgs) => {
  const [{ opacity, y }, api] = useSpring(() => ({
    config: { friction: 25, tension: 180 },
    opacity: 0,
    y: '100%'
  }));
  const [cardRef, sheetHeight] = useClientHeight<HTMLDivElement>();
  const preventScrollRef = useRef(false);
  const closeInProgressRef = useRef(false);

  const requestCloseBottomSheet = () => {
    if (closeInProgressRef.current) {
      return;
    }
    closeInProgressRef.current = true;
    if (onClose instanceof Function) onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  const springApiSet = async ({ onRest = () => {}, ...option }: any) =>
    new Promise((resolve) => {
      api.start({
        ...option,
        onRest: (...args) => {
          resolve(args);
          onRest?.(...args);
        }
      });
    });

  const closeBottomSheet = () => {
    if (onBeforeClose instanceof Function) {
      onBeforeClose();
    }
    closeInProgressRef.current = true;
    springApiSet({
      onRest: (...args: any[]) => {
        const event = args[0];
        if (
          event?.finished &&
          !event?.cancelled &&
          onAfterClose instanceof Function
        ) {
          onAfterClose();
        }
      },
      opacity: 0,
      y: sheetHeight ? `${sheetHeight + 200}px` : '115%'
    });
  };

  useEffect(() => {
    (async () => {
      if (open) {
        if (onBeforeOpen instanceof Function) {
          onBeforeOpen();
        }
        await springApiSet({
          opacity: 1,
          y: '0px'
        });
        if (onAfterOpen instanceof Function) {
          onAfterOpen();
        }
        closeInProgressRef.current = false;
      } else {
        closeBottomSheet();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) {
      const element = cardRef.current;
      const preventScrolling = (e: Event) => {
        if (preventScrollRef.current) {
          e.preventDefault();
        }
      };

      element.addEventListener('scroll', preventScrolling);
      element.addEventListener('touchmove', preventScrolling);

      return () => {
        element.removeEventListener('scroll', preventScrolling);
        element.removeEventListener('touchmove', preventScrolling);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDrag: Handler<'drag'> = ({
    active,
    args: [{ closeOnTap = false, contentSheet = false } = {}] = [],
    cancel,
    direction: [, dy],
    movement: [, my],
    tap,
    velocity: [, vy = 0]
  }) => {
    if (closeInProgressRef.current) {
      return;
    }

    if (tap && closeOnTap) {
      requestCloseBottomSheet();
      return;
    }

    if (contentSheet) {
      const elem = cardRef.current;
      preventScrollRef.current = dy > 0 && elem.scrollTop === 0;
    }

    // it's not the correct Physics formula just a measure of user intent
    const predictedDistance = my * vy;
    if (!blocking && predictedDistance >= twoThirdOf(sheetHeight)) {
      cancel();
      requestCloseBottomSheet();
      return;
    }

    const yValue = rubberbandIfOutOfBounds(my, -1, sheetHeight + 100, 0.12);
    springApiSet({
      immediate: active,
      scaleY: active && yValue < 0 ? Math.ceil(Math.abs(yValue)) : 1,
      y: active ? `${yValue}px` : '0px'
    });
  };

  const bind = useDrag(handleDrag, {
    filterTaps: true
  });

  return {
    bind,
    cardRef,
    opacity,
    requestCloseBottomSheet,
    y
  };
};
