// app/api/deleteImage
import { deleteFilesGCP } from "@/storage/gcpBuckets";
import { NextResponse } from "next/server";
import { inspect } from 'util';
inspect;

export async function POST() {

  // console.log(`user = ${inspect(user)}`);

  return await deleteFilesGCP();
}
