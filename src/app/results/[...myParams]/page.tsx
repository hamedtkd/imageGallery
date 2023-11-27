import Gallery from "@/components/Gallery";
import { title } from "process";
type props = {
  params: {
    myParams: (string|undefined)[];
  };
};

export function generateMetadata({ params: {myParams} }: props) {
  const topic = myParams?.[0]
  const page = myParams?.[1]
  return { title: `Results for ${topic} - page ${page} ` };
}
export default function searchResults({ params: {myParams} }: props) {
  const topic = myParams?.[0]
  const page = myParams?.[1]

    return   <Gallery topic={topic}  page={page}  />
  }
