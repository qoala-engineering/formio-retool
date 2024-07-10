import * as React from 'react';
import { SVGProps } from 'react';

const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM3 20.25C4.816 17.112 8.114 15 12 15s7.184 2.112 9 5.25" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default ProfileIcon;
