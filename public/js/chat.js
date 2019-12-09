// Make connection
let socket = io.connect('http://localhost:3000/');

let alert = ()=>{
    console.log('chat connected')
}
alert();

let iomessage = $('#message')
let iohandle = $('#handle');
let $iobtn = $('#sendIt');
let iooutput = $('#output');
let feedback = $('#feedback');
// Emit events

let emitChat = ()=>{
    console.log('click')
    socket.emit('chat', {
        message: iomessage.value,
        handle: iohandle.value
    });
    iomessage.value = "";
}
$iobtn.on('click', emitChat);
$('#send').on('click', alert);

iomessage.on('keypress', function(){
    socket.emit('typing', iohandle.value);
    console.log('searching')
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    iooutput.innerHTML += '<p><strong>' + data.iohandle + ': </strong>' + data.iomessage + '</p>';
    console.log('chat function works')
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    console.log('typing function works')
});

