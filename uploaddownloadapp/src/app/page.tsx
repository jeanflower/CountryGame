'use client'
import ImageUploader from "@/components/ImageUploader";
import 'bootstrap/dist/css/bootstrap.css'

export default function Home() {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) {
    console.log(`Error, undefined NEXT_PUBLIC_BASEURL`);
    return <>Error, undefined NEXT_PUBLIC_BASEURL</>;
  }

  return (
    <main>
      <ImageUploader 
        baseUrl={baseUrl} 
      />
    </main>
  );
}
