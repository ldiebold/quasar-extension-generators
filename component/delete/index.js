const path = require('path')
const fs = require('fs')

// Create a list of quasar extension libraries
const directoryPath = path.join(__dirname, '../../../')
let extensionDirectories = []
fs.readdirSync(directoryPath).forEach(file => {
  if (file === '_templates') {
    return false
  }
  extensionDirectories.push(file)
});

// Set extensionDirectory in global scope so it's easy to use
// within promises
let extensionDirectory = null

module.exports = {
  prompt: ({ prompter, args }) =>
    prompter
      // Prompt for name of extension (directory)
      .prompt({
        type: 'select',
        name: 'directory',
        message: "Component Type: ",
        choices: extensionDirectories
      })
      .then(({ directory }) => {
        extensionDirectory = directory
        // Prompt for name of component to delete
        return prompter.prompt({
          type: 'input',
          name: 'componentName',
          message: "Name of component to be deleted: "
        })
      })
      // Perform Deletion
      .then(({ componentName }) => {
        const componentFilePath = path.join(directoryPath, `./${extensionDirectory}/ui/src/components/${componentName}.vue`)
        const componentTestFilePath = path.join(directoryPath, `./${extensionDirectory}/ui/src/components/Test${componentName}.vue`)
        const indexFilePath = path.join(directoryPath, `./${extensionDirectory}/ui/src/index.js`)
        // Delete component
        if (fs.existsSync(componentFilePath)) {
          fs.unlinkSync(componentFilePath)
        } else {
          console.error("Component doesn't exist")
        }
        // Delete Test Page
        if (fs.existsSync(componentTestFilePath)) {
          fs.unlinkSync(componentTestFilePath)
        } else {
          console.error("Component Test doesn't exist")
        }
        // Remove exports in index.js
        removeLineFromFile(indexFilePath, `import ${componentName}`)
        removeLineFromFile(indexFilePath, `${componentName},`)
      })
}

/**
 * Find and remove lines in a file
 * @param {String} indexFilePath File path
 * @param {String} searchString remove lines that match this string
 */
function removeLineFromFile (indexFilePath, searchString) {
  const fileAsString = fs.readFileSync(indexFilePath, { encoding: 'utf-8' })

  let dataArray = fileAsString.split('\n') // convert file data in an array

  for (let index = 0; index < dataArray.length; index++) {
    if (dataArray[index].includes(searchString)) { // check if a line contains the 'user1' keyword
      dataArray.splice(index, 1)
    }
  }

  // UPDATE FILE WITH NEW DATA
  const updatedData = dataArray.join('\n')
  fs.writeFileSync(indexFilePath, updatedData)
  console.log('Successfully updated the file data')
}