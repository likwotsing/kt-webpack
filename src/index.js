import _ from 'lodash';

function component() {
  var element = document.createElement('pre')
  
  element.innerHTML = _.join(['Hello', 'webpack!'], ' ')

  return element;
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('Looks like we are in production mode!');
}

document.body.appendChild(component());