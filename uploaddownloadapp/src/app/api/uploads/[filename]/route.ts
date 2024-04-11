// app/api/uploads/[filename]/route.ts
import { getFileDataGCP } from "@/storage/gcpBuckets";
import { NextResponse } from "next/server";

type Params = {
  params: { filename: string };
};

export async function GET(req: Request, { params }: Params) {
  const filename = params.filename as string;
  // Validate the filename
  if (!filename) {
    return NextResponse.json({ status: 400}, {statusText: "Bad Request" });
  }

  // Return a streamed response
  return await getFileDataGCP(filename);;
}
