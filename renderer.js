
const $ = require('jquery')
const ipcRenderer = require('electron').ipcRenderer

function renderer () {

    $('#form-chatter').on('submit', onFormSubmit)
    $('#btn-send-message').on('click', onFormSubmit)

    ipcRenderer.on('received-message', function (event, message) {
        addToChatterBox(message)
    })

    function addToChatterBox(message) {
        let template = "<div class='chat-message'>" + message + "</div>"
        $('#tbl-chatter-box').append(template)
        _scrollUp()
        
        $('#input-chatter-box').val('')

        function _scrollUp() {
            let chatterBox = $('#tbl-chatter-box')
            chatterBox.stop().animate({
                scrollTop: chatterBox[0].scrollHeight
            }, 200);
        }
    }

    function sendToHubot(message) {
        console.log('sending message', message)
        ipcRenderer.send('send-message', message)
    }

    function onFormSubmit(event) {

        if(event.type == 'submit') {
            event.preventDefault()
        }

        let message = $('#input-chatter-box').val()
        addToChatterBox(message)
        sendToHubot(message)
    }

}

renderer()