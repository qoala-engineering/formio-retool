import type { LabelProps } from '../Label';

type KeyType<T> = T extends boolean | number | string ? string : keyof T;

export type AccessorKeyType<T> = {
  label: KeyType<T>;
  value: KeyType<T>;
};

export interface GenericItemType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type RenderItemFunctionType<T> = (item: T) => React.ReactNode;

export type SingleChangeEvent<T> = {
  target: {
    current: T;
    name: string;
    value: null | T;
  };
};

export type FetchMoreItemsFunction<T> = (
  page: number,
  search?: string
) => Promise<{ data: T[]; next: boolean }>;

export type SingleSelectHandler<T> = (e: SingleChangeEvent<T>) => void;

type DynamicOptionProps<T> =
  | {
      fetchMoreItems: FetchMoreItemsFunction<T>;
      options?: undefined;
    }
  | {
      fetchMoreItems?: undefined;
      options: T[];
    };

export type SelectProps<T> = {
  accessorKey?: AccessorKeyType<T>;
  className?: string;
  disabled?: boolean;
  maxHeight?: number;
  width?: number;
  name?: string;
  onChange: SingleSelectHandler<T>;
  parentClassName?: string;
  placeholder?: string;
  popoverClassName?: string;
  renderItem?: (item: T) => React.ReactNode;
  searchable?: boolean;
  value: null | T;
} & DynamicOptionProps<T> &
  LabelProps;
