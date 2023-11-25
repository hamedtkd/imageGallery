import type { Photo } from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

type props = {
  photo: Photo;
};
export default function ImageContainer({ photo }: props) {

  const widthHeightRatio = photo.height / photo.width ;
  const galleryHeight = Math.ceil(300 * widthHeightRatio);
  // 300 is the width that we set --> w-[300px]
  const photoSpans = Math.ceil(galleryHeight / 10) + 1
  // 10 is the auto-rows that we set in Gallery -->  auto-rows-[10px]

    
  return (
    <div className=" w-[300px] justify-self-center"
    style={{
    gridRow :`span ${photoSpans}`
    }} >
      <Link href = {photo.url} target='_blank'
      className="place-content-center">
      <div className=" rounded-xl  overflow-hidden group">

      <Image
        // width={photo.width}
        // height={photo.height}
        width={300}
        height={galleryHeight}
        // sizes="300px"
        // sizes="(min-width: 1280px) 319px, (min-width: 1040px) 331px, (min-width: 780px) 372px, (min-width: 700px) 308px, (min-width: 540px) calc(35.71vw + 65px), calc(100vw - 16px)"
        quality={100}
        // fill={true}
        alt={photo.alt}
        src={photo.src.large}
        placeholder="blur"
        blurDataURL={photo.blurredDataUrl}
        className=" group-hover:opacity-75 transition-all"
        // className="object-cover group-hover:opacity-75 transition-all"
        />
        </div>
        </Link>
    </div>
  );
}
