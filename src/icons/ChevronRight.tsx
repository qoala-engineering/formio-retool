import * as React from 'react';
import { SVGProps } from 'react';

const ChevronRight = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={22}
    viewBox="0 0 12 22"
    fill="none"
    {...props}
  >
    <path
      fill={fill || '#000000'}
      d="M11.413 19.712a.94.94 0 0 1-1.327 1.326L.711 11.663a.937.937 0 0 1 0-1.326L10.086.962a.938.938 0 1 1 1.327 1.326L2.7 11l8.713 8.712Z"
    />
  </svg>
);

export default ChevronRight;
