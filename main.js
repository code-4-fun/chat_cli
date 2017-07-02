
const electron = require('electron')
const App = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const Path = require('path')
const URL = require('url')

const BotClient = require('./bot-client.js')

App.on('ready', function (event) {
    initWindow()
})

function initWindow() {
    let mainWindow = new BrowserWindow({ height: 600, width: 800})
    var bot = new BotClient(mainWindow)

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('close', function(event) {
        mainWindow = null
    })

    ipcMain.on('send-message', function (event, message) {
        console.log('IPC Main send-message event => ', message);
        bot.sendMessage(event, message)
    })

    //mainWindow.webContents.openDevTools()
}