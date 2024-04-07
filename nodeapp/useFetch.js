import fetch from 'node-fetch';

const apiServerRoot = 'https://python-project-service-2ldm6ft3ha-uc.a.run.app';

const helloResponse = await fetch(`${apiServerRoot}/hello`);
const helloResponseText = await helloResponse.text();
console.log(helloResponseText);

const pathStart = 'Uganda';
const pathEnd = 'Botswana';
const pathUrl = `${apiServerRoot}/pathRaw?start=${pathStart}&end=${pathEnd}`
console.log('url is ', pathUrl);

const pathResponse = await fetch(pathUrl);
const pathResponseText = await pathResponse.text();
console.log(pathResponseText);

