"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TopCarouselProps } from "@/types";

export const TopCarousel: React.FC<TopCarouselProps> = ({ images }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const autoScroller = () => {
      setCurrent((prevCurrent) => {
        const nextIndex =
          prevCurrent === images.length - 1 ? 0 : prevCurrent + 1;
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
            <div key={index} style={{ width: "50vw", height: "auto", position: "relative" }}>
                <Image alt=""
                    fill
                    style={{"objectFit": "cover"}}
                    src={image.src}
                />
            </div>
          );
        })}
      </div>
    </div>
  );
};
