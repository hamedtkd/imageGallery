"use client";

import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import Image from "next/image";
import ImageContainer from "./ImageContainer";
// import addBlurredDateUrls from "@/lib/getBase64";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

type Props = {
  topic?: string | undefined;
  page?: string | undefined;
};

export default  function InfinityScroll({ topic = "curated", page }: Props) {
    console.log("object")
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const url = !topic?`https://api.pexels.com/v1/curated`:`https://api.pexels.com/v1/search?query=${topic}`;
//   let url;
//   if (topic === "curated" && page) {
//     // browsing beyond home
//     url = `https://api.pexels.com/v1/curated?page=${page}`;
//   } else if (topic === "curated") {
//     // home
//     url = `https://api.pexels.com/v1/curated`;
//   } else if (!page) {
//     // first page of search result
//     url = `https://api.pexels.com/v1/search?query=${topic}`;
//   } else {
//     // search result beyond first page
//     url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`;

const [data, setData] = useState<any>();

useEffect(() => {
    const fetchData =async ()=>{
        const images: ImagesResults | undefined = await fetchImages(url);
        setData(images)
    }
    fetchData()
    
}, []);
  

  if (!data || data.per_page === 0)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;

  const photosWithBlur = data;


  // calculate pagination

  return (
    <>
      <section className="px-1 my-3 grid gap-x-1 grid-cols-gallery auto-rows-[10px]">
        {photosWithBlur.map((photo:any, index:any) => (
          <React.Fragment key={photo.id}>
            {index === photosWithBlur.length ? (
              <ImageContainer photo={photo} />
            ) : (
              <div ref={ref}>
 
              <ImageContainer  photo={photo} />
              </div>
            )}
          </React.Fragment>
        ))}
      </section>
      {/* Add footer */}
    </>
  );
}

// type Props = {
//   topic?: string | undefined;
//   page?: string | undefined;
// };

// export default function Gallery({ topic = "curated" }: Props) {
//   const [page, setPage] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [photosWithBlur, setPhotosWithBlur] = useState<ImagesResults[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const url =
//         topic === "curated"
//           ? `https://api.pexels.com/v1/curated?page=${page}`
//           : `https://api.pexels.com/v1/search?query=${topic}&page=${page}`;
//       const newImages: ImagesResults | undefined = await fetchImages(url);

//       console.log(newImages)
//       if (newImages && newImages.photos.length > 0) {
//         const blurredDataUrl = await addBlurredDateUrls(newImages);
//         return { blurredDataUrl };
//       }

//         // setPhotosWithBlur((prevImages) => [
//         //   ...prevImages,
//         //   ...blurredDataUrl,
//         // ]);
//         setPage((prevPage) => prevPage + 1);

//       setLoading(false);
//     };

//     fetchData();
//   }, [page, topic]);

//   const handleScroll = () => {
//     const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
//     if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
//       // Load more images when scrolling near the bottom
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     // Attach the scroll event listener when the component mounts
//     window.addEventListener("scroll", handleScroll);

//     // Detach the scroll event listener when the component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <section className="px-1 my-3 grid gap-x-1 grid-cols-gallery auto-rows-[10px]">
//         {/* {photosWithBlur&& photosWithBlur.map((photo) => (
//           <ImageContainer key={photo.photos.id} photo={photo?.photos } />
//         ))} */}
//       </section>
//       {/* Add footer */}
//     </>
//   );
// }
