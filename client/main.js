var socket =io.connect('https://fastwebservice.herokuapp.com/',{'forceNew':true});

socket.on('messages',function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message,index){
        return (`
            <div class="message">
                <h6><strong>${message.nickname}</strong> dice:</h66>
                <textarea id="textA" _ngcontent-c2="" class="form-control">${message.text}</textarea>
            </div>
        `);

    }).join(' ');
    var div_msgs=document.getElementById('messages');
    div_msgs.innerHTML=html;
    div_msgs.scrollTop=div_msgs.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display ='none';
    socket.emit('add-message',message);
    return false;
}