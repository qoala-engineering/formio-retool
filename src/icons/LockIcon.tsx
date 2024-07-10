import * as React from 'react';
import { SVGProps } from 'react';

const LockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <path d="M19.5 8.25h-15a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75ZM8.25 8.25v-3a3.75 3.75 0 0 1 7.5 0v3" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default LockIcon;
