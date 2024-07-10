export interface UseBottomSheetMechanicsArgs {
  blocking?: boolean;
  onAfterClose?: () => void;
  onAfterOpen?: () => void;
  onBeforeClose?: () => void;
  onBeforeOpen?: () => void;
  onClose: () => void;
  open: boolean;
}

export interface BottomSheetProps extends UseBottomSheetMechanicsArgs {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  sheetStyle?: {
    bgColor?: string;
    shadowColor?: string;
  };
  style?: React.CSSProperties;
  type?: 'floating' | 'normal';
}
