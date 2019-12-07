// Make connection
let socket = io.connect('http://localhost:3000');

let iomessage = $('#message'),
    iohandle = $('#handle'),
    iobtn = $('#send'),
    iooutput = $('#output'),
    feedback = $('#feedback');
// Emit events
iobtn.click(function(){
    socket.emit('chat', {
        iomessage: iomessage.value,
        iohandle: iohandle.value
    });
    iomessage.value = "";
});

iomessage.on('keypress', function(){
    socket.emit('typing', iohandle.value);
    console.log('searching')
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    iooutput.innerHTML += '<p><strong>' + data.iohandle + ': </strong>' + data.iomessage + '</p>';
    console.log('chat function workes')
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    console.log('typing function works')
});