var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
   res.render("landing"); 
});



////Authentication Routes
//show the register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req,res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            //returns allows us to shortcircuit and quickly get out on error
            return res.render("register");
        }
        //using passport local mongoose automatically raises an exception if trying to make a user with the same username
        passport.authenticate("local")(req,res,function(){
           res.redirect("/campgrounds"); 
        });
   });
});

//Login needs two routes
//Get request to show the form
//post to do the logging in
//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res){
   res.send("Login Logic happens here"); 
});

//logout route
router.get("/logout", function(req,res){
   req.logout();
   res.redirect("/campgrounds");
});

//need middleware, user shouldn't be able to leave a comment if htey're not logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

 module.exports = router;