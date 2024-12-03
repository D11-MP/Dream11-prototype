"use client";

import Image from "next/image";
import "../styles/toggleButton.css";
import { useState } from "react";
import { Slider } from "antd";
import PlayerList from "./PlayerList";
import { TeamCustomizeProps } from "./TeamCustomize";
import Tooltip from "./Tooltip";

const AdvancedProps = ({
  setPlayer,
  setCountLockIn,
  setCountLockOut,
  countLockIn,
  countLockOut,
}: TeamCustomizeProps) => {
  const [toggleOptions, setToggleOptions] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  });
  const [sliderValues, setSliderValues] = useState({
    slider1: 5,
    slider2: 5,
    slider3: 5,
    slider4: 3,
    slider5: 1,
    slider6: 2,
    slider7: 4,
  });

  const handleSliderChange = (key: string, value: number) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
    if (key === "slider1" && value + sliderValues.slider2 > 10) {
        setSliderValues((prevValues) => ({
          ...prevValues,
          slider2: 11 - value,
        }));
    } else if (key === "slider2" && value + sliderValues.slider1 > 10) {
        setSliderValues((prevValues) => ({
          ...prevValues,
          slider1: 11 - value,
        }));
    } else {
        setSliderValues((prevValues) => ({
          ...prevValues,
          [key]: value,
        }));
    }
    if (["slider3", "slider4", "slider5", "slider6"].includes(key)) {
        const total = sliderValues.slider3 + sliderValues.slider4 + sliderValues.slider5 + sliderValues.slider6;
        if (total > 11) {
            const excess = total - 11;
            setSliderValues((prevValues) => ({
                ...prevValues,
                [key]: value - excess,
            }));
        }
    }
  };

  return (
    <>
      <div className="w-[100%] flex justify-between px-4 py-8 border-b-2">
        <div className="flex gap-2">
          <p>Select Team Balance</p>
          <Tooltip
            tooltipText={
              <>
                <div className="flex gap-2">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4573 3.65994C6.66037 3.65994 3.58233 6.73798 3.58233 10.5349C3.58233 14.3319 6.66037 17.4099 10.4573 17.4099C14.2543 17.4099 17.3323 14.3319 17.3323 10.5349C17.3323 6.73798 14.2543 3.65994 10.4573 3.65994ZM2.33233 10.5349C2.33233 6.04763 5.97002 2.40994 10.4573 2.40994C14.9446 2.40994 18.5823 6.04763 18.5823 10.5349C18.5823 15.0223 14.9446 18.6599 10.4573 18.6599C5.97002 18.6599 2.33233 15.0223 2.33233 10.5349ZM10.4573 9.07444C10.8025 9.07444 11.0823 9.35426 11.0823 9.69944V13.8661C11.0823 14.2113 10.8025 14.4911 10.4573 14.4911C10.1122 14.4911 9.83233 14.2113 9.83233 13.8661V9.69944C9.83233 9.35426 10.1122 9.07444 10.4573 9.07444ZM10.4576 8.03776C10.9178 8.03776 11.2909 7.66466 11.2909 7.20443C11.2909 6.74419 10.9178 6.37109 10.4576 6.37109C9.99736 6.37109 9.62427 6.74419 9.62427 7.20443C9.62427 7.66466 9.99736 8.03776 10.4576 8.03776Z"
                      fill="#A8A8A8"
                    />
                  </svg>
                  <p className="font-semibold text-lg p-1">TEAM BALANCE</p>
                </div>

                <hr />
                <p className="p-2">
                  This section lets you set minimum and maximum limits for
                  Batsmen, Bowlers, All-Rounders, and Wicket Keepers in your
                  fantasy team. These inputs help personalize your team strategy
                  based on match conditions and your preferences.
                </p>
              </>
            }
          />
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={toggleOptions.one === 1}
            onChange={() =>
              setToggleOptions((prev) => ({
                ...prev,
                one: toggleOptions.one === 0 ? 1 : 0,
              }))
            }
          />
          <span className="slider round"></span>
        </label>
      </div>
      {toggleOptions.one === 1 && (
        <div className="w-[100%] flex flex-col justify-between px-4 border-b-2">
          <div className="w-[100%] gap-2">
            <div className="w-[100%] flex py-4 gap-2 justify-between items-center">
              <p className="w-[70%] text-gray-400">
                Minimum Players from India
              </p>
              <div className="flex gap-4">
                <Image
                  src="/india.png"
                  alt="An example image"
                  width={40}
                  height={40}
                  className="p-1"
                />
                <input
                  type="text"
                  value={sliderValues.slider1}
                  className="p-2 w-[40px] bg-[#f3f1f2] flex items-center justify-center text-center rounded-xl"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Slider
                defaultValue={4}
                max={10}
                min={1}
                value={sliderValues.slider1}
                onChange={(value) => handleSliderChange("slider1", value)} dots={true}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>1</p>
              <p>10</p>
            </div>
          </div>
          <div className="w-[100%] gap-2">
            <div className="w-[100%] flex py-4 gap-2 justify-between items-center">
              <p className="w-[70%] text-gray-400">Minimum Players from Aus</p>
              <div className="flex gap-4">
                <Image
                  src="/aus.png"
                  alt="An example image"
                  width={40}
                  height={40}
                  className="p-1"
                />
                <input
                  type="text"
                  value={sliderValues.slider2}
                  className="p-2 w-[40px] bg-[#f3f1f2] flex items-center justify-center text-center rounded-xl"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Slider
                defaultValue={6}
                max={10}
                min={1}
                value={sliderValues.slider2}
                onChange={(value) => handleSliderChange("slider2", value)} dots={true}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>1</p>
              <p>10</p>
            </div>
          </div>
        </div>
      )}
      <div className="w-[100%] flex justify-between px-4 py-8 border-b-2">
        <div className="flex gap-2">
          <p>Select Batsman to Bowler Ratio</p>
          <Tooltip
            tooltipText={
              <>
                <div className="flex gap-2">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4573 3.65994C6.66037 3.65994 3.58233 6.73798 3.58233 10.5349C3.58233 14.3319 6.66037 17.4099 10.4573 17.4099C14.2543 17.4099 17.3323 14.3319 17.3323 10.5349C17.3323 6.73798 14.2543 3.65994 10.4573 3.65994ZM2.33233 10.5349C2.33233 6.04763 5.97002 2.40994 10.4573 2.40994C14.9446 2.40994 18.5823 6.04763 18.5823 10.5349C18.5823 15.0223 14.9446 18.6599 10.4573 18.6599C5.97002 18.6599 2.33233 15.0223 2.33233 10.5349ZM10.4573 9.07444C10.8025 9.07444 11.0823 9.35426 11.0823 9.69944V13.8661C11.0823 14.2113 10.8025 14.4911 10.4573 14.4911C10.1122 14.4911 9.83233 14.2113 9.83233 13.8661V9.69944C9.83233 9.35426 10.1122 9.07444 10.4573 9.07444ZM10.4576 8.03776C10.9178 8.03776 11.2909 7.66466 11.2909 7.20443C11.2909 6.74419 10.9178 6.37109 10.4576 6.37109C9.99736 6.37109 9.62427 6.74419 9.62427 7.20443C9.62427 7.66466 9.99736 8.03776 10.4576 8.03776Z"
                      fill="#A8A8A8"
                    />
                  </svg>
                  <p className="font-semibold text-lg p-1">PLAYER TYPE</p>
                </div>

                <hr />
                <p className="p-2">
                  This section lets you set minimum and maximum limits for
                  Batsmen, Bowlers, All-Rounders, and Wicket Keepers in your
                  fantasy team. These inputs help personalize your team strategy
                  based on match conditions and your preferences.
                </p>
              </>
            }
          />
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={toggleOptions.two === 1}
            onChange={() =>
              setToggleOptions((prev) => ({
                ...prev,
                two: toggleOptions.two === 0 ? 1 : 0,
              }))
            }
          />
          <span className="slider round"></span>
        </label>
      </div>
      {toggleOptions.two === 1 && (
        <div className="w-[100%] flex flex-col justify-between px-4 border-b-2">
          <div className="w-[100%] gap-1">
            <div className="w-[100%] flex gap-2 justify-between items-center">
              <p className="w-[70%] text-gray-400">Batsmen</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={sliderValues.slider3}
                  className="p-2 w-[40px] bg-[#f3f1f2] flex items-center justify-center text-center rounded-xl"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Slider
                defaultValue={5}
                max={11}
                min={0}
                value={sliderValues.slider3}
                onChange={(value) => handleSliderChange("slider3", value)} dots={true}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
              <p>11</p>
            </div>
          </div>
          <div className="w-[100%] gap-1">
            <div className="w-[100%] flex  gap-2 justify-between items-center">
              <p className="w-[70%] text-gray-400">Bowlers</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={sliderValues.slider4}
                  className="p-2 w-[40px] bg-[#f3f1f2] flex items-center justify-center text-center rounded-xl"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Slider
                defaultValue={4}
                max={11}
                min={0}
                value={sliderValues.slider4}
                onChange={(value) => handleSliderChange("slider4", value)} dots={true}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
              <p>11</p>
            </div>
          </div>
          <div className="w-[100%] gap-2">
            <div className="w-[100%] flex gap-2 justify-between items-center">
              <p className="w-[70%] text-gray-400">Wicketkeepers</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={sliderValues.slider5}
                  className="p-2 w-[40px] bg-[#f3f1f2] flex items-center justify-center text-center rounded-xl"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Slider
                defaultValue={4}
                max={11}
                min={0}
                value={sliderValues.slider5}
                onChange={(value) => handleSliderChange("slider5", value)} dots={true}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
              <p>11</p>
            </div>
          </div>
          <div className="w-[100%] gap-2">
            <div className="w-[100%] flex  gap-2 justify-between items-center">
              <p className="w-[70%] text-gray-400">All rounders</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={sliderValues.slider6}
                  className="p-2 w-[40px] bg-[#f3f1f2] flex items-center justify-center text-center rounded-xl"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Slider
                defaultValue={4}
                max={11}
                min={0}
                value={sliderValues.slider6}
                onChange={(value) => handleSliderChange("slider6", value)} dots={true}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-2">
              <p>0</p>
              <p>11</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-[100%] flex justify-between px-4 py-8 border-b-2">
        <div className="flex gap-2">
          <p>Select Spin to Seam Balance</p>
          <Tooltip
            tooltipText={
              <>
                <div className="flex gap-2">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4573 3.65994C6.66037 3.65994 3.58233 6.73798 3.58233 10.5349C3.58233 14.3319 6.66037 17.4099 10.4573 17.4099C14.2543 17.4099 17.3323 14.3319 17.3323 10.5349C17.3323 6.73798 14.2543 3.65994 10.4573 3.65994ZM2.33233 10.5349C2.33233 6.04763 5.97002 2.40994 10.4573 2.40994C14.9446 2.40994 18.5823 6.04763 18.5823 10.5349C18.5823 15.0223 14.9446 18.6599 10.4573 18.6599C5.97002 18.6599 2.33233 15.0223 2.33233 10.5349ZM10.4573 9.07444C10.8025 9.07444 11.0823 9.35426 11.0823 9.69944V13.8661C11.0823 14.2113 10.8025 14.4911 10.4573 14.4911C10.1122 14.4911 9.83233 14.2113 9.83233 13.8661V9.69944C9.83233 9.35426 10.1122 9.07444 10.4573 9.07444ZM10.4576 8.03776C10.9178 8.03776 11.2909 7.66466 11.2909 7.20443C11.2909 6.74419 10.9178 6.37109 10.4576 6.37109C9.99736 6.37109 9.62427 6.74419 9.62427 7.20443C9.62427 7.66466 9.99736 8.03776 10.4576 8.03776Z"
                      fill="#A8A8A8"
                    />
                  </svg>
                  <p className="font-semibold text-lg p-1">SPIN/SEAM BALANCE</p>
                </div>

                <hr />
                <p className="p-2">
                  This section helps you fine-tune the balance between spin
                  bowlers and seam bowlers in your fantasy team. Adjusting these
                  ratios ensures your team is aligned with match conditions,
                  pitch behavior, and your strategy preferences.
                </p>
              </>
            }
          />
        </div>

        <label className="switch">
          <input
            type="checkbox"
            value={toggleOptions.three}
            onChange={() =>
              setToggleOptions((prev) => ({
                ...prev,
                three: toggleOptions.three === 0 ? 1 : 0,
              }))
            }
          />
          <span className="slider round"></span>
        </label>
      </div>
      {toggleOptions.three === 1 && (
        <div className="w-[100%] flex justify-between px-4 py-8">
          <div className="w-[100%] gap-2">
            <div className="w-[100%] flex  gap-2 justify-between items-center">
              <p className="w-[70%] text-gray-400">Fast bowlers</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={sliderValues.slider7}
                  className="p-2 w-[40px] bg-[#f3f1f2] flex items-center justify-center text-center rounded-xl"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Slider
                defaultValue={3}
                max={10}
                min={0}
                value={sliderValues.slider7}
                onChange={(value) => handleSliderChange("slider7", value)}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-2">
              <p>0</p>
              <p>10</p>
            </div>
          </div>
        </div>
      )}
      <div className="w-[100%] flex justify-between px-4 pt-8 pb-4 ">
        <div className="flex gap-2">
          <p>Lock in/out players</p>
          <Tooltip
            tooltipText={
              <>
                <div className="flex gap-2">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4573 3.65994C6.66037 3.65994 3.58233 6.73798 3.58233 10.5349C3.58233 14.3319 6.66037 17.4099 10.4573 17.4099C14.2543 17.4099 17.3323 14.3319 17.3323 10.5349C17.3323 6.73798 14.2543 3.65994 10.4573 3.65994ZM2.33233 10.5349C2.33233 6.04763 5.97002 2.40994 10.4573 2.40994C14.9446 2.40994 18.5823 6.04763 18.5823 10.5349C18.5823 15.0223 14.9446 18.6599 10.4573 18.6599C5.97002 18.6599 2.33233 15.0223 2.33233 10.5349ZM10.4573 9.07444C10.8025 9.07444 11.0823 9.35426 11.0823 9.69944V13.8661C11.0823 14.2113 10.8025 14.4911 10.4573 14.4911C10.1122 14.4911 9.83233 14.2113 9.83233 13.8661V9.69944C9.83233 9.35426 10.1122 9.07444 10.4573 9.07444ZM10.4576 8.03776C10.9178 8.03776 11.2909 7.66466 11.2909 7.20443C11.2909 6.74419 10.9178 6.37109 10.4576 6.37109C9.99736 6.37109 9.62427 6.74419 9.62427 7.20443C9.62427 7.66466 9.99736 8.03776 10.4576 8.03776Z"
                      fill="#A8A8A8"
                    />
                  </svg>
                  <p className="font-semibold text-lg p-1">
                    LOCK IN/OUT PLAYERS
                  </p>
                </div>

                <hr />
                <p className="p-2">
                  This section allows you to lock in or lock out up to three
                  players in your fantasy team. Locking in ensures these players
                  remain part of your team, while locking out excludes specific
                  players. These options help you customize your team strategy
                  based on player performance, preferences, and match
                  conditions.
                </p>
              </>
            }
          />
        </div>

        <label className="switch">
          <input
            type="checkbox"
            value={toggleOptions.four}
            onChange={() => {
              setToggleOptions((prev) => ({
                ...prev,
                four: toggleOptions.four === 0 ? 1 : 0,
              }));
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="mx-[-28px]">
        {toggleOptions.four === 1 && (
          <>
            <div className=" flex text-letred bg-bothead mt-2 text-xs py-2 border border-bothead rounded-lg ml-8 mr-6 px-3">
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
                  d="M10.9719 3.79298C10.7024 3.67317 10.3949 3.67317 10.1254 3.79298C10.0354 3.83303 9.89746 3.93791 9.66496 4.26616C9.43429 4.59183 9.16671 5.05274 8.78173 5.71771L4.24026 13.5621C3.85391 14.2294 3.58641 14.6927 3.41825 15.0562C3.24869 15.4227 3.22645 15.595 3.23667 15.693C3.2673 15.9868 3.42123 16.2538 3.66015 16.4275C3.73989 16.4855 3.90013 16.5526 4.30226 16.5895C4.70109 16.6261 5.23608 16.6267 6.00717 16.6267H15.0901C15.8612 16.6267 16.3962 16.6261 16.795 16.5895C17.1972 16.5526 17.3574 16.4855 17.4371 16.4275C17.6761 16.2538 17.83 15.9868 17.8606 15.693C17.8708 15.595 17.8486 15.4227 17.679 15.0562C17.5109 14.6927 17.2434 14.2294 16.857 13.5621L12.3156 5.71771C11.9306 5.05274 11.663 4.59183 11.4323 4.26616C11.1998 3.93791 11.0619 3.83303 10.9719 3.79298ZM9.61755 2.6508C10.2103 2.38723 10.887 2.38723 11.4797 2.6508C11.8839 2.83051 12.1825 3.16266 12.4524 3.54365C12.7202 3.92175 13.0161 4.43293 13.3814 5.06392L13.3815 5.06399L13.3815 5.06403L13.3973 5.09141L17.9388 12.9358L17.9547 12.9632L17.9548 12.9633C18.3214 13.5966 18.6184 14.1095 18.8135 14.5314C19.0101 14.9562 19.1498 15.3818 19.1039 15.8227C19.0365 16.469 18.6979 17.0564 18.1722 17.4385C17.8137 17.6992 17.3754 17.7915 16.9092 17.8342C16.4464 17.8767 15.8537 17.8767 15.1219 17.8767H15.0901H6.00717H5.97538C5.24358 17.8767 4.65088 17.8767 4.18806 17.8342C3.72185 17.7915 3.28357 17.6992 2.92505 17.4385C2.39944 17.0564 2.0608 16.469 1.99341 15.8227C1.94745 15.3818 2.0872 14.9562 2.28377 14.5314C2.47892 14.1095 2.7759 13.5966 3.14258 12.9632L3.15848 12.9358L7.69995 5.09141L7.71584 5.06396C8.08115 4.43295 8.3771 3.92176 8.64492 3.54365C8.91478 3.16266 9.2134 2.83051 9.61755 2.6508ZM10.5487 7.46132C10.8938 7.46132 11.1737 7.74114 11.1737 8.08632V11.4197C11.1737 11.7648 10.8938 12.0447 10.5487 12.0447C10.2035 12.0447 9.92367 11.7648 9.92367 11.4197V8.08632C9.92367 7.74114 10.2035 7.46132 10.5487 7.46132ZM10.5487 14.753C11.0089 14.753 11.382 14.3799 11.382 13.9197C11.382 13.4594 11.0089 13.0863 10.5487 13.0863C10.0885 13.0863 9.71535 13.4594 9.71535 13.9197C9.71535 14.3799 10.0885 14.753 10.5487 14.753Z"
                  fill="#E10000"
                />
              </svg>
              <div className="mt-1 ml-2">
                You can lock in or lock out upto three players at a time.
              </div>
            </div>
            <PlayerList
              setPlayer={setPlayer}
              countLockIn={countLockIn}
              countLockOut={countLockOut}
              setCountLockIn={setCountLockIn}
              setCountLockOut={setCountLockOut}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AdvancedProps;
