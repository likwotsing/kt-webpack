const file = require("exports-loader?file,parse=helpers.parse!./globals.js");

console.log(file)

function component() {
  var element = document.createElement('div');

  element.innerHTML = join(['Hello', 'webpack'], ' ');

  this.alert('Hmmm, this probably is\'t a great idea...');

  return element;
}

document.body.appendChild(component());

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    console.log('We retrieved some data...');
    console.log(json);
  })
  .catch(error => console.log('Something went wrong ...', data))