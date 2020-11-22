module.exports = [
  {
    type: 'select',
    name: 'type',
    message: "Component Type: ",
    choices: [
      'base',
      'rest',
      'model'
    ]
  },
  {
    type: 'text',
    name: 'name',
    message: "Component name: "
  }
]