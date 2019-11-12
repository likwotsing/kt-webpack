import { cube } from './math.js';

function component() {
  var element = document.createElement('pre')
  
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equl to ' + cube(5)
  ].join('\n\n');

  return element;
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('Looks like we are in production mode!');
}

document.body.appendChild(component());