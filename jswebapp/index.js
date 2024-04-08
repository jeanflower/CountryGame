async function getPath() {
  console.log('in getPath');

  const startElement = document.getElementById('start');
  const endElement = document.getElementById('end');

  const pathStart = startElement.value;
  const pathEnd = endElement.value;

  const sendFakeData = true;

  let pathResponseText = '';

  if (sendFakeData) {
    pathResponseText = `Some fake path from ${pathStart} to ${pathEnd}`;
    const pathElement = document.getElementById('path');
    pathElement.textContent = pathResponseText;
    return;
  } else {
  
    // const apiServerRoot = 'http://localhost:8000';
    const apiServerRoot = 'https://python-project-service-2ldm6ft3ha-uc.a.run.app';

    const pathUrl = `${apiServerRoot}/pathRaw?start=${pathStart}&end=${pathEnd}`
    console.log('url is ', pathUrl);

    const pathResponse = await fetch(pathUrl);
    pathResponseText = await pathResponse.text();
    console.log(pathResponseText);
  }

  const pathElement = document.getElementById('path');
  pathElement.textContent = pathResponseText;
}
