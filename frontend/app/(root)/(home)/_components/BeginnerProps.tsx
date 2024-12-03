import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BeginnerProps({ country, setCountry, toggle, setToggle }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const teams = [
    { name: "India", img: "/india.png" },
    { name: "Australia", img: "/aus.png" },
  ];

  const handleToggle = () => {
    if (!toggle) {
      setCountry(null);
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelection = (teamName) => {
    setCountry(teamName);
    setToggle(false);
    setIsOpen(false);
  };
  return (
    <div className="flex-col w-full space-y-4">
      <div className="flex justify-between">
        <p>Select AI-Recommended Team</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={toggle === true}
            onChange={handleToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <p className="text-center">OR</p>
      <div
        onClick={() => setToggle(false)}
        className="flex justify-between items-center pb-4"
      >
        <p className="text-lg font-medium">Predict Winning Team</p>
        <div className="relative w-40 h-10" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-full text-sm font-medium text-left border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {country ? (
              <div className="flex items-center gap-2 px-4">
                <Image
                  src={
                    teams.find((team) => team.name === country)?.img ||
                    "/default.png"
                  }
                  alt={`${country} Flag`}
                  width={30}
                  height={30}
                />
                <span>{country}</span>
              </div>
            ) : (
              <div className="flex justify-around items-center">
                {" "}
                <p>Select a team</p>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.44086 8.75678C6.73375 8.46389 7.20863 8.46389 7.50152 8.75678L12.9712 14.2264L18.4409 8.75678C18.7338 8.46389 19.2086 8.46389 19.5015 8.75678C19.7944 9.04967 19.7944 9.52455 19.5015 9.81744L13.5015 15.8174C13.2086 16.1103 12.7338 16.1103 12.4409 15.8174L6.44086 9.81744C6.14797 9.52455 6.14797 9.04967 6.44086 8.75678Z"
                    fill="#9D9D9D"
                  />
                </svg>
              </div>
            )}
          </button>

          {isOpen && (
            <ul
              className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg"
              role="menu"
            >
              {teams.map((team) => (
                <li
                  key={team.name}
                  onClick={() => handleSelection(team.name)}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  role="menuitem"
                >
                  <Image
                    src={team.img}
                    alt={`${team.name} Flag`}
                    width={30}
                    height={30}
                  />
                  <span>{team.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}