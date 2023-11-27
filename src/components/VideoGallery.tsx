import { fetchVideos } from "@/lib/fetchVideos";
import React from "react";
import VideoContainer from "./VideoContainer";

async function VideoGallery() {
  const url = "https://api.pexels.com/videos/popular";
  const data = await fetchVideos(url);
 
  return (
    <section className="px-1 my-3 grid gap-x-1 grid-cols-gallery auto-rows-[10px]">
      {data?.videos.map((video, index) => (
       <VideoContainer video={video} key={video.id} />
        
      ))}
    </section>
  );
}

export default VideoGallery;
