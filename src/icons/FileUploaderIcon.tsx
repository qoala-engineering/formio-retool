import * as React from 'react';
import { SVGProps } from 'react';

const FileUploaderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={21}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M16.727 6.18 11.257.71a.586.586 0 0 0-.413-.17H1.469A1.367 1.367 0 0 0 .102 1.905v17.188a1.367 1.367 0 0 0 1.367 1.367H15.53a1.367 1.367 0 0 0 1.367-1.367v-12.5a.586.586 0 0 0-.171-.414ZM11.43 2.54l3.468 3.468H11.43V2.539Zm4.101 16.75H1.47a.195.195 0 0 1-.196-.196V1.906a.195.195 0 0 1 .196-.195h8.789v4.883a.586.586 0 0 0 .586.586h4.883v11.914a.196.196 0 0 1-.196.195Zm-4.273-7.642a.587.587 0 1 1-.828.829l-1.344-1.343v4.835a.586.586 0 0 1-1.172 0v-4.835L6.57 12.477a.586.586 0 0 1-.828-.829l2.344-2.343a.586.586 0 0 1 .828 0l2.344 2.343Z"
    />
  </svg>
);

export default FileUploaderIcon;