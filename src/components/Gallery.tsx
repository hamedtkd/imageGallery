import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import Image from "next/image";
import ImageContainer from "./ImageContainer";
import addBlurredDateUrls from "@/lib/getBase64";

type Props = {
  topic?: string;
};

export default async function Gallery({ topic }: Props) {
  const url = !topic?`https://api.pexels.com/v1/curated`:`https://api.pexels.com/v1/search?query=${topic}`;

  const images: ImagesResults | undefined = await fetchImages(url);
  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;

  const photosWithBlur = await addBlurredDateUrls(images);

  return (
    <section className="px-1 my-3 grid gap-x-1 grid-cols-gallery auto-rows-[10px]">
      {photosWithBlur.map((photo) => (
        <ImageContainer key={photo.id} photo={photo} />
      ))}
    </section>
  );
}
