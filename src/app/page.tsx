import Gallery from "@/components/Gallery";

export default function Home({ searchParams }: any) {
  const { page } = searchParams;

  return (
    <div>
      <Gallery page={page} />;
    </div>
  );
}
