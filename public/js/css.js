let $colorScheme = $('.color-schema')






let orange = () => {
    $('body').css('background-color', '#d84315')
    $('.nav-wrapper').css('background-color', '#ff5722')
    $('#chat-window').css('background-color', '#ff6e40')
    $('#chat-window').css('color', '#37474f')
    $('#big-window').css('background-color', '#bf360c')
    $('.page-footer').css('background-color', '#bf360c')
}

let dark = () => {
    // console.log('working')
    $('body').css('background-color', '#767473')
    $('.nav-wrapper').css('background-color', '#252525')
    $('#chat-window').css('background-color', '#585757')
    $('#chat-window').css('color', '#cacaca')
    $('#big-window').css('background-color', '#393939')
    $('.page-footer').css('background-color', '#37474f')
}
let light = () => {
    // console.log('working')
    $('body').css('background-color', '#d4e1e4')
    $('.nav-wrapper').css('background-color', '#65b8c7')
    $('#chat-window').css('background-color', '#d4f4ff')
    $('#chat-window').css('color', '#314148')
    $('#big-window').css('background-color', '#88abbd')
    $('.page-footer').css('background-color', '#0d47a1')
}



// $("body").click(dark)
$('.color-buttons').on('click', function () {
    let color = $(this).attr('data-color')
    console.log(color)
    switch (color) {
        case "orange":
            orange()
            break;
        case "dark":
            dark()
            break;
        case "light":
            light()
            break;
    }
})

// switch(color){
//     case "default":
//         original()
//         break;
//     case "dark":
//         dark()
//         break;
//     case "light":
//         light()
//         break;
// }