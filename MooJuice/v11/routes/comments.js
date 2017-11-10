var express = require("express");
var router = express.Router({mergeParams: true}); //id param isn't making it through to the comment routes; merges campground id and comments together so you can use the /campgrounds/id/comments route
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments new
////////---------------Comments routes
//will call is logged in which will call the following code( the code in the body)
router.get("/new", middleware.isLoggedIn, function(req,res){
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
router.post("/", middleware.isLoggedIn, function(req,res){
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
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }                   
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username= req.user.username;
                    //the only way we get here is if the user is logged in
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
           });
        }
      });
    });
    
    //Comment edit route
    router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
        //req.params.id //id is what was defined in app.js in a..puse campground id
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }        
            else{
                res.render("comments/edit", {campground_id: req.params.id, comment:foundComment});
            }
        });
        // res.render("comments/edit", {campground_id: req.params.id});
    });
    
    //comment update
    //campground/:id/comments/:comment_id
    router.put("/:comment_id",  middleware.checkCommentOwnership, function(req,res){
       Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
           if(err){
               res.redirect("back");
           }else{
               res.redirect("/campgrounds/" + req.params.id ); //all our comments routes are nested after campground id
           }
       });
    });
    
    //Comment Destroy route
    router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
       Comment.findByIdAndRemove(req.params.comment_id, function(err){
            if(err){
                res.redirect("back");
            }   
            else{
                req.flash("success", "Comment deleted");
                res.redirect("/campgrounds/" +req.params.id);
            }
       })
    });
    
    
//     //Check campground ownership
// function checkCommentOwnership(req, res, next){
//       //is user logged in at all
//       if(req.isAuthenticated()){
//             Comment.findById(req.params.comment_id, function(err, foundComment){
//                  if(err){
//                      res.redirect("back");
//                  }else{
//                      //does user own the comment if we find the campground
//                      if(foundComment.author.id.equals(req.user._id))
//                      {
//                         next();
//                         //goes onto next piece of code in edit, update or destroy
//                      }else{
//                          res.redirect("back");
//                      }
//                 }
//             });
//       }
//       else{
//           //takes a user back to where they came from
//           //also send a message that states that they are not logged in
//           res.redirect("back");
//       }
// }
    
//     //need middleware, user shouldn't be able to leave a comment if htey're not logged in
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


 module.exports = router;