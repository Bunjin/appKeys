var express = require("express");
var app = express();

app.use(express.static(__dirname))

/* serves main page */
app.get("/", function(req, res) {
   res.sendFile(__dirname + '/index.html')
});

var port = 8000

server = app.listen(port, function() {
  console.log("Listening on " + port);
});
