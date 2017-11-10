var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment");
});

app.get("/speak/pig", function(req, res){
    res.send("pig");
});

app.get("/speak/cow", function(req, res){
    res.send("cow");
});

app.get("/repeat/:word/:times", function(req, res){
    
    var word = req.params.word;
    var times = Number(req.params.times);
    var full = "";
    
    for(i = 0; i < times; i++)
    {
        full += word + "\n";
    }
    res.render(full);
    
});

app.get("*", function(req, res){
    res.send("Sorry page not found");
});

app.listen( process.env.PORT, process.env.IP, function(){
   console.log("The server has started");
});