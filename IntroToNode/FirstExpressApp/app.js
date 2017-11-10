var express = require("express");
var app = express();

//3 diff places to make a request to
// "/" +> HI there!
app.get("/", function(req, res){
    res.send("Hi There");
}); //takes url 
//req - request info ; res - response info
// "byte" => Goodbyte
// "/dog" => MEOW

//Tell express to listen for requests(start server)
app.listen(process.env.PORT)