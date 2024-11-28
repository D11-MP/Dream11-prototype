import Image from "next/image";
import "../styles/toggleButton.css";
import { useState } from "react";

const AdvancedProps = () => {
  const [toggleOptions, setToggleOptions] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  });

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
        <div className="w-[100%] flex justify-between px-4 border-b-2">
          <div className="w-[100%] gap-2">
            <div className="w-[100%] flex py-4 gap-2 justify-between items-center">
              <p className="w-[70%]">Minimum Players from India</p>
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
                  className="p-2 w-[40px] bg-[#f3f1f2] flex items-center justify-center text-center rounded-xl"
                  value={0}
                />
              </div>
            </div>
            <div>
              <input
                type="range"
                className="track w-[100%] h-[10px]"
                min={0}
                max={11}
              />
            </div>
            <div className="w-[100%] flex justify-between pb-4">
              <p>0</p>
              <p>8</p>
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
        <div className="w-[100%] flex justify-between px-4 py-8 "></div>
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
        <div className="w-[100%] flex justify-between px-4 py-8"></div>
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
        {toggleOptions.four === 1 && (
          <div className="w-[100%] flex justify-between px-4 py-8 border-t-2"></div>
        )}
      </div>
    </>
  );
};

export default AdvancedProps;
