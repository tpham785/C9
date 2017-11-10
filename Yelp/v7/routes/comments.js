var express = require("express");
var router = express.Router({mergeParams: true}); //id param isn't making it through to the comment routes; merges campground id and comments together so you can use the /campgrounds/id/comments route
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments new
////////---------------Comments routes
//will call is logged in which will call the following code( the code in the body)
router.get("/new", isLoggedIn, function(req,res){
    //find campground by id, and send it through to render
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else{
            //console.log("HELLLLO");
           //console.log(campground);
          // res.send()
          res.render("comments/new", {campground: campground});
       }
    });
});

//Comments Create
//we're not actually protecting the post route, we are just hiding the form if the user isn't logged in
//theorectically, you could still send a post request via postMan, so check for isLoggedIn
router.post("/", isLoggedIn, function(req,res){
   //lookup campground using ID
   //create new comment
   //connect new comment to campground
   //redirect to campground show page
   
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }                   
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
           });
        }
      });
    });
    
    
    //need middleware, user shouldn't be able to leave a comment if htey're not logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


 module.exports = router;