"use client";
import type { Video } from "@/models/Videos";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type props = {
  video: Video;
};
export default function VideoContainer({ video }: props) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };
  const widthHeightRatio = video.height / video.width;
  const galleryHeight = Math.ceil(300 * widthHeightRatio);
  // 300 is the width that we set --> w-[300px]
  const videoSpans = Math.ceil(galleryHeight / 10) + 1;
  // 10 is the auto-rows that we set in Gallery -->  auto-rows-[10px]


  const handleHover = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleUnhover = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleUnhover}
      className="relative w-[300px] justify-self-center"
      style={{
        gridRow: `span ${videoSpans}`,
      }}
    >
      <div className=" rounded-xl overflow-hidden group transition-all">
        {isVideoLoaded ? null : (
          <Image
            width={300}
            height={galleryHeight}
            src={video.image}
            alt="Placeholder"
            quality={100}
            className="group-hover:opacity-40 transition-all "
          />
        )}
        <video
          ref={videoRef}
          preload="none"
          loop
          onLoadedData={handleVideoLoaded}
          width={300}
          height={video.height || 300}
          // controls
          style={{ display: !isVideoLoaded ? `none` : "block" }}
          className=""
        >
          <source
            src={video.video_files[0].link}
            type={video.video_files[0].file_type}
          />
          Your browser does not support the video tag.
        </video>
        {!isVideoLoaded && isPlaying && (
          <p className="w-full absolute text-white text-center top-1/2 z-20 font-bold text-3xl animate-pulse">
            ...
          </p>
        )}
      </div>
    </div>
  );
}
