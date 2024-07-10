import * as React from 'react';
import { SVGProps } from 'react';

const DocumentIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.125}
      clipPath="url(#a)"
    >
      <path d="M18.75 21H5.25a.75.75 0 0 1-.75-.75V3.75A.75.75 0 0 1 5.25 3h9l5.25 5.25v12a.75.75 0 0 1-.75.75Z" />
      <path d="M14.25 3v5.25h5.25M9 12.75h6M9 15.75h6" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default DocumentIcon;
