import _ from 'lodash';

function component() {
  let element = document.createElement('div')
  
  // lodash
  element.innerHTML = _.join(['Hello', 'webpack', 'ok'], '-')
  return element;
}

document.body.appendChild(component())