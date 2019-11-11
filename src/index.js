import _ from 'lodash';

function component() {
  var element = document.createElement('div')
  
  // lodash
  element.innerHTML = _.join(['君问归期未有期', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component())