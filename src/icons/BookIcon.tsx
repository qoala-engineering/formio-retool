import * as React from 'react';
import { SVGProps } from 'react';

const BookIcon = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M12 8.25a3 3 0 0 1 3-3h6.75v13.5H15a3 3 0 0 0-3 3M2.25 18.75H9a3 3 0 0 1 3 3V8.25a3 3 0 0 0-3-3H2.25v13.5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default BookIcon;
