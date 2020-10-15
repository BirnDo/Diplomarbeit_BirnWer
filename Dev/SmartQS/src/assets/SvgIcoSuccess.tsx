import * as React from "react";

function SvgIcoSuccess(props) {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="48" cy="48" r="48" fill="#0BAB09" />
      <g clip-path="url(#clip0)">
        <path
          d="M17 53.0418L38.9164 75.0001L81 32.9581L74.9582 26.9998L38.9164 62.9998L22.9581 47.0416L17 53.0418Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="64"
            height="64"
            fill="white"
            transform="translate(17 19)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgIcoSuccess;
