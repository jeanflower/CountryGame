async function getPath() {
  console.log('in getPath');

  const sendFakeData = true;

  let pathResponseText = '';

  if (sendFakeData) {
    pathResponseText = 'Some fake response here';
    const pathElement = document.getElementById('path');
    pathElement.textContent = pathResponseText;
    return;
  } else {
  
    // const apiServerRoot = 'http://localhost:8000';
    const apiServerRoot = 'https://python-project-service-2ldm6ft3ha-uc.a.run.app';

    const pathStart = 'Uganda';
    const pathEnd = 'Botswana';
    const pathUrl = `${apiServerRoot}/pathRaw?start=${pathStart}&end=${pathEnd}`
    console.log('url is ', pathUrl);

    const pathResponse = await fetch(pathUrl);
    pathResponseText = await pathResponse.text();
    console.log(pathResponseText);
  }

  const pathElement = document.getElementById('path');
  pathElement.textContent = pathResponseText;
}
