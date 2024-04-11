// app/api/upload
import { fileExistsGCP, getImageNamesGCP, uploadFileGCP } from "@/storage/gcpBuckets";
import { NextResponse } from "next/server";
import { inspect } from 'util';
inspect;

export async function POST(req: Request) {

  const fileNamesResponse = await getImageNamesGCP();

  if (fileNamesResponse.ok) {
    const fileNames = await fileNamesResponse.json();
    console.log(`the bucket has ${fileNames.length} files`);
    if (fileNames.length > 2) {
      console.log(`the bucket is full - don't upload another file`);
      return NextResponse.json({ status: 200},{statusText: "Bucket full" });
    }
  }

  // get the form data
  const data = await req.formData();

  // map through all the entries
  let duplicateFilename = false;
  const entries =  Array.from(data.entries());

  for (const entry of entries) {
    const [key, value] = entry;
    // FormDataEntryValue can either be type `Blob` or `string`

    // if its type is object then it's a Blob
    const isFile = typeof value == "object";

    if (isFile) {
      const blob = value as Blob;
      const filename = key;

      const match = entries.filter((e) => {
        const [key, value] = e;
        return key === filename;
      })
      if(match?.length > 1) {
        console.log(`require unique filename, found duplicates for ${filename}`);
        duplicateFilename = true;
        break;
      }

      const bucketExistsResponse = await fileExistsGCP(filename);
      console.log(`bucketExistsResponse[0] = ${bucketExistsResponse[0]}`);
      const existing = bucketExistsResponse[0];
      if (existing) {
        // If file already exists, let's skip it.
        // If you want a different behavior such as override, modify this part.
        console.log(`file ${filename} already exists`);
        duplicateFilename = true;
        break;
      }
    }
  }
  if (duplicateFilename) {
    console.log(`sending statusText: "Duplicate filename"`);
    return NextResponse.json({ status: 200},{statusText: "Duplicate filename" });
  }

  // map through all the entries
  for (const entry of entries) {
    const [key, value] = entry;
    // FormDataEntryValue can either be type `Blob` or `string`
    // if its type is object then it's a Blob
    const isFile = typeof value == "object";

    if (isFile) {
      const blob = value as Blob;
      const filename = key;

      await uploadFileGCP(
        blob, 
        filename,
      );
    }
  }

  // return the response after all the entries have been processed.
  return NextResponse.json({ success: true });
}
