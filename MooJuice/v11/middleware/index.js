var Campground = require("../models/campground");
var Comment = require("../models/comment");

//all the middleware goes here
var middlewareObj ={};

    middlewareObj.checkCampgroundOwnership = function(req, res, next){
          //is user logged in at all
          if(req.isAuthenticated()){
                Campground.findById(req.params.id, function(err, foundCampground){
                     if(err){
                         req.flash("error", "Campground not found");
                         res.redirect("back");
                     }else{
                         //does user own the campground if we find the campground
                         //can't do foundCampground.author.id === req.user_.id
                         //they look identical but they are not
                         //req.user._id is a String, and foundCampground is a Mongoose object
                         //that when printed out , we see it as a string
                         //instead of using === or ==, use a method mongoose provides us
                         if(foundCampground.author.id.equals(req.user._id))
                         {
                            next();
                            //goes onto next piece of code in edit, update or destroy
                         }else{
                             req.flash("error", "You don't have permission to do that");
                             res.redirect("back");
                         }
                    }
                });
          }
          else{
              //takes a user back to where they came from
              //also send a message that states that they are not logged in
              req.flash("error","You need to be logged in to do that");
              res.redirect("back");
          }
    }
    
    middlewareObj.checkCommentOwnership = function(req, res, next){
           //is user logged in at all
          if(req.isAuthenticated()){
                Comment.findById(req.params.comment_id, function(err, foundComment){
                     if(err){
                         res.redirect("back");
                     }else{
                         //does user own the comment if we find the campground
                         if(foundComment.author.id.equals(req.user._id))
                         {
                            next();
                            //goes onto next piece of code in edit, update or destroy
                         }else{
                             req.flash("error", "You don't have permission to do that");
                             res.redirect("back");
                         }
                    }
                });
          }
          else{
              //takes a user back to where they came from
              //also send a message that states that they are not logged in
              req.flash("error", "You need to be logged in to do that");
              res.redirect("back");
          }
    }
    
    middlewareObj.isLoggedIn = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        //this flash won't be displayed until the next page is displayed, do it before the redirect
        //in the flash, do this, for the next request(redirect)and also handle it in the login page
        //adds this message under the key error. this is what is later referred to in the routes/index.js
        req.flash("error","You need to be logged in to do that.");
        res.redirect("/login");
    }
    
    module.exports = middlewareObj;