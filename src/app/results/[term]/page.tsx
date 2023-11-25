import Gallery from "@/components/Gallery";
import { title } from "process";
type props = {
  params: {
    term: string;
  };
};

export function generateMetadata({ params: {term} }: props) {
  return { title: `Results for ${term} ` };
}
export default function searchResults({ params: {term} }: props) {
    return <Gallery topic={term} />
  }
