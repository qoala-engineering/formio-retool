import * as React from 'react';
import { SVGProps } from 'react';

const PassengerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M13.53 12.421c-.892-1.542-2.267-2.649-3.872-3.173a4.219 4.219 0 1 0-4.316 0c-1.605.524-2.98 1.63-3.872 3.173a.468.468 0 1 0 .811.469C3.385 10.982 5.336 9.843 7.5 9.843s4.115 1.14 5.219 3.047a.468.468 0 1 0 .812-.469ZM4.22 5.624a3.281 3.281 0 1 1 6.562 0 3.281 3.281 0 0 1-6.562 0Z"
    />
  </svg>
);

export default PassengerIcon;
