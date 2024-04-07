async function getData(pathStart, pathEnd) {

  const apiServerRoot = 'https://python-project-service-2ldm6ft3ha-uc.a.run.app';

  const pathUrl = `${apiServerRoot}/pathRaw?start=${pathStart}&end=${pathEnd}`
  console.log('url is ', pathUrl);

  const pathResponse = await fetch(pathUrl);
  if (!pathResponse.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return pathResponse.json()
}


export async function GET(request) {
  console.log('received GET api call');

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  console.log(start);
  console.log(end);

  return Response.json(await getData(start, end))
}