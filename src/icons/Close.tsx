import * as React from 'react';
import { SVGProps } from 'react';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#fff"
      d="M15.446 14.615a.584.584 0 0 1-.41 1.014.587.587 0 0 1-.418-.186L8 8.827l-6.618 6.616a.586.586 0 0 1-.828-.828l6.616-6.617L.555 1.38a.586.586 0 0 1 .828-.828l6.618 6.616L14.618.552a.586.586 0 0 1 .828.828L8.83 7.998l6.616 6.617Z"
    />
  </svg>
);

export default CloseIcon;
