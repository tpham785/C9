var mongoose = require("mongoose");


//how to associate these comments
var commentSchema = mongoose.Schema({
    
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
    //saves us from storing unnecessary data , wouldn't be efficent to take an author id and doing a lookup to find the username
    //instead we store the data inside of the comments. only possible with a nonrelational database
});

module.exports = mongoose.model("Comment", commentSchema);