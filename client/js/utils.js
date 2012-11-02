if(!console) var console = {};
if(!console.log) console.log = function(msg) { /* do nothing */ };

$(function() {
    // fix firefox socket.io disconnected problem
    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 27) {
            e.preventDefault();
        }
    });
});
