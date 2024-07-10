import * as React from 'react';
import { SVGProps } from 'react';

const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0  13 13"
    fill="none"
    {...props}
  >
    <path
      stroke="#50B4E9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.742}
      d="M3.882 12.375H1.12a.494.494 0 0 1-.495-.495V9.118c0-.131.052-.257.145-.35l7.623-7.623a.495.495 0 0 1 .7 0l2.762 2.76a.495.495 0 0 1 0 .7L4.232 12.23a.495.495 0 0 1-.35.145Z"
    />
  </svg>
);

export default PencilIcon;
