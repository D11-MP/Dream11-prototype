import { useState } from "react";

const TooltipSvg = ({ tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4573 3.65994C6.66037 3.65994 3.58233 6.73798 3.58233 10.5349C3.58233 14.3319 6.66037 17.4099 10.4573 17.4099C14.2543 17.4099 17.3323 14.3319 17.3323 10.5349C17.3323 6.73798 14.2543 3.65994 10.4573 3.65994ZM2.33233 10.5349C2.33233 6.04763 5.97002 2.40994 10.4573 2.40994C14.9446 2.40994 18.5823 6.04763 18.5823 10.5349C18.5823 15.0223 14.9446 18.6599 10.4573 18.6599C5.97002 18.6599 2.33233 15.0223 2.33233 10.5349ZM10.4573 9.07444C10.8025 9.07444 11.0823 9.35426 11.0823 9.69944V13.8661C11.0823 14.2113 10.8025 14.4911 10.4573 14.4911C10.1122 14.4911 9.83233 14.2113 9.83233 13.8661V9.69944C9.83233 9.35426 10.1122 9.07444 10.4573 9.07444ZM10.4576 8.03776C10.9178 8.03776 11.2909 7.66466 11.2909 7.20443C11.2909 6.74419 10.9178 6.37109 10.4576 6.37109C9.99736 6.37109 9.62427 6.74419 9.62427 7.20443C9.62427 7.66466 9.99736 8.03776 10.4576 8.03776Z"
          fill="#A8A8A8"
        />
      </svg>

      {showTooltip && (
        <div className="absolute bg-white text-sm text-gray-800 rounded-lg shadow-xl p-4 w-112 -top-12 left-10 z-20">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default TooltipSvg;
