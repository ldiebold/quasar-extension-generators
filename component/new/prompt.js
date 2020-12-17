const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '../../../')

let choices = []

fs.readdirSync(directoryPath).forEach(file => {
  if (file === '_templates') {
    return false
  }
  choices.push(file)
});

module.exports = [
  {
    type: 'select',
    name: 'type',
    message: "Component Type: ",
    choices
  },
  {
    type: 'text',
    name: 'name',
    message: "Component name: "
  }
]