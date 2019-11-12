import _ from 'lodash';
import printMe from './print.js';

function component() {
  var element = document.createElement('div')
  var btn = document.createElement('button')
  
  // lodash
  element.innerHTML = _.join(['君问归期未有期', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn)

  return element;
}

document.body.appendChild(component())