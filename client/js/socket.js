function socket() {
    this.io = io.connect();

    this.io.on('hello', function(data) {
        console.log(data);
    });
}
