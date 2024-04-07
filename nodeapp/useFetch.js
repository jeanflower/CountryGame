import fetch from 'node-fetch';
import inquirer from 'inquirer';

const apiServerRoot = 'https://python-project-service-2ldm6ft3ha-uc.a.run.app';

const helloResponse = await fetch(`${apiServerRoot}/hello`);
const helloResponseText = await helloResponse.text();
console.log(`response from hello is`, helloResponseText);


const questions = [
  {
    type: 'input',
    name: 'start',
    message: 'Start of path? (e.g. Uganda)',
  },
  {
    type: 'input',
    name: 'end',
    message: 'End of path? (e.g. Botswana)',
  },
];

const answers = await inquirer.prompt(questions);

const pathStart = answers.start;
const pathEnd = answers.end;

const pathUrl = `${apiServerRoot}/pathRaw?start=${pathStart}&end=${pathEnd}`
console.log('url is ', pathUrl);

const pathResponse = await fetch(pathUrl);
const pathResponseText = await pathResponse.text();
console.log(`a shortest path from ${pathStart} to ${pathEnd} is ${pathResponseText}`);

