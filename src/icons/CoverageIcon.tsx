import * as React from 'react';
import { SVGProps } from 'react';

const CoverageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M10 1.875A8.125 8.125 0 1 0 18.125 10 8.133 8.133 0 0 0 10 1.875Zm3.055 10.296a3.737 3.737 0 0 0 0-4.342l2.226-2.226a6.862 6.862 0 0 1 0 8.794l-2.226-2.226ZM7.5 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm6.897-5.281L12.17 6.945a3.738 3.738 0 0 0-4.342 0L5.603 4.72a6.862 6.862 0 0 1 8.794 0Zm-9.678.884L6.945 7.83a3.737 3.737 0 0 0 0 4.342L4.72 14.397a6.862 6.862 0 0 1 0-8.794Zm.884 9.678 2.226-2.226a3.737 3.737 0 0 0 4.342 0l2.226 2.226a6.862 6.862 0 0 1-8.794 0Z"
    />
  </svg>
);

export default CoverageIcon;
