import * as React from 'react';
import { SVGProps } from 'react';

const GoldenStarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="#FFCA60"
      d="m8 0 2.387 5.613L16 8l-5.613 2.387L8 16l-2.387-5.613L0 8l5.613-2.387L8 0Z"
    />
  </svg>
);

export default GoldenStarIcon;
