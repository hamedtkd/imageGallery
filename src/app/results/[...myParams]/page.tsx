import Gallery from "@/components/Gallery";
import { title } from "process";
type props = {
  params: {
    myParams: (string | undefined)[];
  };
  searchParams: any;
};

export function generateMetadata({ params: { myParams } }: props) {
  const topic = myParams?.[0] ?? "curated";
  const page = myParams?.[1] ?? "1";
  return { title: `Results for ${topic} - page ${page} ` };
}
export default function searchResults({
  params: { myParams },
  searchParams,
}: props) {
  const topic = myParams?.[0];
  const { page } = searchParams;
  return <Gallery topic={topic} page={page} />;
}
