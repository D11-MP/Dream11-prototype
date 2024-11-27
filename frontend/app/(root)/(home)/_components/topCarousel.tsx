"use client";

import { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface Props {
  images: StaticImageData[]; //is subject to change to string.
}

export const TopCarousel: React.FC<Props> = ({ images }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const autoScroller = () => {
      setCurrent((prevCurrent) => {
        const nextIndex =
          prevCurrent === images.length - 1 ? 0 : prevCurrent + 1;
        console.log(nextIndex);
        return nextIndex;
      });
    };

    const scrollInterval = setInterval(() => {
      if (!isHover) autoScroller();
    }, 2000);

    return () => {
      clearInterval(scrollInterval);
    };
  }, [isHover]);

  return (
    <div
      className="home-top-carousel-wrapper overflow-hidden"
      style={{ width: "50vw", height: "163px", borderRadius: "10px" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="home-top-carousel flex"
        style={{
          transform: `translateX(-${current * 50}vw)`,
          transition: "0.5s",
          width: "max-content",
          height: "100%",
        }}
      >
        {images.map((image, index) => {
          return (
            // <div key={index} style={{ width: "50vw", height: "auto", position: "relative" }}>
                <Image alt=""
                key={index}
                    // layout="fill"
                    // objectFit="cover"
                    src={image.src}
                    width={500}
                    height={200}
                />
            // </div>
          );
        })}
      </div>
    </div>
  );
};
