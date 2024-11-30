"use client";

import Image from "next/image";
import "../styles/toggleButton.css";
import { useState } from "react";
import { Slider } from "antd";
import PlayerList from "./PlayerList";
import { TeamCustomizeProps } from "./TeamCustomize";

const AdvancedProps = ({setPlayer}:TeamCustomizeProps) => {
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
  };

  return (
    <>
      <div className="w-[100%] flex justify-between px-4 py-8 border-b-2">
        <p>Select Team Balance</p>
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
                min={0}
                value={sliderValues.slider1}
                onChange={(value) => handleSliderChange("slider1", value)}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
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
                min={0}
                value={sliderValues.slider2}
                onChange={(value) => handleSliderChange("slider2", value)}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
              <p>10</p>
            </div>
          </div>
        </div>
      )}
      <div className="w-[100%] flex justify-between px-4 py-8 border-b-2">
        <p>Select Batsman to Bowler Ratio</p>
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
                max={10}
                min={0}
                value={sliderValues.slider3}
                onChange={(value) => handleSliderChange("slider3", value)}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
              <p>10</p>
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
                max={10}
                min={0}
                value={sliderValues.slider4}
                onChange={(value) => handleSliderChange("slider4", value)}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
              <p>10</p>
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
                max={10}
                min={0}
                value={sliderValues.slider5}
                onChange={(value) => handleSliderChange("slider5", value)}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
              <p>10</p>
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
                max={10}
                min={0}
                value={sliderValues.slider6}
                onChange={(value) => handleSliderChange("slider6", value)}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-2">
              <p>0</p>
              <p>10</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-[100%] flex justify-between px-4 py-8 border-b-2">
        <p>Select Spin to Seam Balance</p>
        <label className="switch">
          <input
            type="checkbox"
            value={toggleOptions.three}
            onChange={() => setToggleOptions((prev) => ({ ...prev, three: 1 }))}
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
      <div className="w-[100%] flex justify-between px-4 py-8 border-t-2">
        <p>Lock in/out players</p>
        <label className="switch">
          <input
            type="checkbox"
            value={toggleOptions.four}
            onChange={() => setToggleOptions((prev) => ({ ...prev, four: 1 }))}
          />
          <span className="slider round"></span>
        </label>
      </div>
      {toggleOptions.four === 1 && <PlayerList setPlayer={setPlayer} />}
    </>
  );
};

export default AdvancedProps;
