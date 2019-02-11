// Modules to control application life and create native browser window
const {URL} = require('url')
const {app, BrowserWindow, protocol} = require('electron')
const fs = require('fs')
const path = require('path')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow()
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {

  protocol.registerStreamProtocol('custom', (request, callback) => {
    console.log(request.url)
    var urlp = new URL(request.url)

    if (urlp.pathname === '/index.html') {
      return callback({
        statusCode: 200,
        headers: {
          'content-type': 'text/html'
        },
        data: fs.createReadStream(path.join(__dirname, 'custom', 'index.html'))
      })
    }
    if (urlp.pathname === '/cats.jpg') {
      return callback({
        statusCode: 200,
        headers: {
          'content-type': 'image/jpeg'
        },
        data: fs.createReadStream(path.join(__dirname, 'custom', 'cats.jpg'))
      })
    }

    callback({statusCode: 404})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
