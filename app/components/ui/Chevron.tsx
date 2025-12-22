import React from "react";

interface IProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const Chevron: React.FC<IProps> = ({ color = "#000", ...rest }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <rect width="24" height="24" fill="none"></rect>{" "}
        <path
          d="M17 9.5L12 14.5L7 9.5"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default Chevron;
