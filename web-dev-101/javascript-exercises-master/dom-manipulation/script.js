// your javascript file
const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

const pontent = document.createElement('p');
pontent.style.color = 'red';
pontent.textContent = 'Hey, I\'m Red!';

const hontent = document.createElement('h3');
hontent.style.color = 'blue';
hontent.textContent = 'I\'m a blue h3!';

const dontent = document.createElement('div');
dontent.style.border = '3px solid black';
dontent.style.backgroundColor = 'pink';

const dontentInnerH1 = document.createElement('h1');
dontentInnerH1.textContent = 'I\'m in a div!';
const dontentInnerP = document.createElement('p');
dontentInnerP.textContent = 'Me too!';

dontent.appendChild(dontentInnerH1);
dontent.appendChild(dontentInnerP);

container.appendChild(content);
container.appendChild(pontent);
container.appendChild(hontent);
container.appendChild(dontent);
