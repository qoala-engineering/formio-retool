import * as React from 'react';
import { SVGProps } from 'react';

const HelpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 11.5v.5a2 2 0 0 1-2 2H7.5M13 7h-2a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h2V7Zm0 0A6 6 0 0 0 1 7m0 0v3.5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1Z"
    />
  </svg>
);

export default HelpIcon;
