var controlChatSend = 0;
$(document).keypress(function(e) {
   
    if(e.which == 13 && controlChatSend == 0){
        $('#textInput').click()
        $('#textInput').select();
        controlChatSend = 1;
    } else if( e.which == 13 && controlChatSend == 1) {
        $('#enviar').click();
        $('#textInput').blur();
        controlChatSend = 0;
    }
});