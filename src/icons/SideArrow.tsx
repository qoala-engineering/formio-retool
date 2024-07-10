import * as React from 'react';
import { SVGProps } from 'react';

const SideArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  const { fill, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <path
        fill={fill || '#000'}
        d="M23.299 2.201a1.5 1.5 0 0 0-1.5-1.5h-13.5a1.5 1.5 0 1 0 0 3h12v12a1.5 1.5 0 0 0 3 0v-13.5ZM3.061 23.061 22.86 3.26l-2.122-2.12L.94 20.938l2.122 2.122Z"
      />
    </svg>
  );
};

export default SideArrowIcon;
