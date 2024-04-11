import { getImageNamesGCP } from "@/storage/gcpBuckets";

export async function POST() {
  return getImageNamesGCP();
}

