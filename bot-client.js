
const WebSocketClient = require('websocket').client

class BotClient {

    constructor(mainWindow) {
        this.mainWindow = mainWindow
        this.client = new WebSocketClient()
        this.initClient()

        this.client.connect('ws://localhost:8080/', 'echo-protocol')
    }

    sendMessage(event, message) {
        this.connection.sendUTF(message)
    }

    initClient() {
        this.client.on('connectFailed', function (error) {
            console.log('Connect Error: ' + error.toString());
        })

        var scope = this;
        this.client.on('connect', function (connection) {
            console.log('Connection with server established')
            scope.connection = connection

            connection.on('error', function(error) {
                console.log("Connection Error: " + error.toString())
            })

            connection.on('close', function(error) {
                console.log("Connection with the server closed")
            })
            
            connection.on('message', function (message) {
                if(message.type === 'utf8') {
                    console.log("Received: '" + message.utf8Data + "'")
                    scope.mainWindow.webContents.send('received-message', message.utf8Data)
                }
            })
        })
    }
}

module.exports = BotClient