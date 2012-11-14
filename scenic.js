var Scenic = require('./server/scenic-server'),
    path = require('path'),
    fs = require('fs');

function initialize(processes) {
    var process_index = 0;
    var iterator = function() {
        return function() {
            var func = processes[process_index];
            if(!func) return;
            process_index += 1;
            func(iterator());
        };
    };
    iterator()();
}

initialize([
    function make_uploads_dir(next) {
        fs.mkdir(path.join(__dirname, 'uploads'), function(err) {
            next();
        });
    },
    function run() {
        var scenic_app = new Scenic();
        scenic_app.run();
    }
]);
