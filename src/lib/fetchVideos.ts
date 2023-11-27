import { VideoSchemaWithVideo, type VideoResults } from "@/models/Videos";
import env from "./env";
 
 export async function fetchVideos (url:string) : Promise<VideoResults | undefined> {
    try {
        const res = await fetch(url, {
          headers: {
            Authorization: env.PEXELS_API_KEY,
          },
        });
        if (!res.ok) throw new Error("Fetch Images error!\n");
        const videoResults: VideoResults = await res.json();
        // pars data with zod
        const parsedData = VideoSchemaWithVideo.parse(videoResults);

        if (parsedData.total_results === 0) return undefined;
        return parsedData;
      } catch (e) {
        if ( e instanceof Error)  console.log(e.stack);
      }
 }
