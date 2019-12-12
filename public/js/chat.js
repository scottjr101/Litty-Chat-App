// Make connection
let socket = io.connect('http://localhost:3000/');

let alert = ()=>{
    console.log('chat connected')
}
alert();

let message = $('#message')
let handle = $('#handle');
let $btn = $('#sendIt');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');
// Emit events

$btn.on('click', function(){
    console.log('click')
    socket.emit('chat', {
        message: message.val(),
        handle: handle.html()
    });
    console.log('this'+message.value)
    message.val("");
});
message.on('keypress',function (e) {
    if (e.which == 13) {
        socket.emit('chat', {
            message: message.val(),
            handle: handle.html()
        });
        console.log('this'+message.value)
        message.val("");
      return false;    //<---- Add this line
    }
  });

socket.on('user image', image);

function image (from, base64Image) {
    $('#output').append($('<p>').append($('<b>').text(from),
        `<img src="${base64Image}"/>`));
}

message.on('keypress', function(){
    socket.emit('typing', handle.value);
    console.log('searching') 
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    console.log('chat function works')
    // $('#chat-window, #feedback').animate({scrollTop: $('#feedback').height()}, "slow");
    $("#chat-window").stop().animate({ scrollTop: $("#chat-window")[0].scrollHeight}, 1000)
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    console.log('typing function works' + data)
    $("#chat-window").stop().animate({ scrollTop: $("#chat-window")[0].scrollHeight}, 1000)
});

socket.on('user image', image);
function image (from, base64Image) {
    $('#output').append($('<p>').append($('<b>').text(from),
        '<img src="' + base64Image + '"/>'));
}

// socket.on("image", function(info) {
//     if (info.image) {
//       var img = new Image();
//       img.src = 'data:image/jpeg;base64,' + image.buffer;
//       ctx.drawImage(img, 0, 0);
//     }
//   });
