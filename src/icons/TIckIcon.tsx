import * as React from 'react';
import { SVGProps } from 'react';

const TickIcon = ({ stroke, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={9}
    fill="none"
    viewBox="0 0 12 9"
    {...props}
  >
    <path
      stroke={stroke || '#000'}
      strokeLinecap="square"
      strokeWidth={2}
      d="M2 4.83 4.422 7 10 2"
    />
  </svg>
);

export default TickIcon;
