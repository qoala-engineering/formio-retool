import React, { FC, useEffect, useState } from "react";

import type { BottomSheetProps } from "./types";

import Sheet from "./Sheet";

const BottomSheet: FC<BottomSheetProps> = ({
  onAfterClose,
  open,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);

  const handleAfterClose = () => {
    onAfterClose?.();
    setMounted(false);
  };

  useEffect(() => {
    if (open) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [open]);

  return mounted ? (
    <Sheet {...props} onAfterClose={handleAfterClose} open={open} />
  ) : null;
};

export type { BottomSheetProps };
export default BottomSheet;
