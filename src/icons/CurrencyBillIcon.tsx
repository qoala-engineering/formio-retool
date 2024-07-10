import * as React from 'react';
import { SVGProps } from 'react';

const CurrencyBillIcon = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M22.5 6h-21v12h21V6Z" />
      <path d="M22.5 9.75A4.58 4.58 0 0 1 18.75 6M18.75 18a4.58 4.58 0 0 1 3.75-3.75M1.5 14.25A4.58 4.58 0 0 1 5.25 18M5.25 6A4.58 4.58 0 0 1 1.5 9.75" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default CurrencyBillIcon;
