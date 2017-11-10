var mongoose = require("mongoose");

//schema set up
var campgroundSchema = new mongoose.Schema({
   name: String,
   image:String,
   description:String,
   comments: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
   }]
});

//return Campground model
module.exports = mongoose.model("Campground", campgroundSchema);
