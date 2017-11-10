var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


//Index - show all campgrounds
router.get("/", function(req, res){
        
        //get all campgrounds from DB and then run the[] file
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }
            else{
                //still rendering the campgrounds file
                //still calling it campgrounds
                //only difference now is the source is from the db defined in the parameter above
                res.render("campgrounds/index", {campgrounds:allCampgrounds});
            }
        });
       
});

//Create-- add a new campground to the DB
router.post("/", function(req, res){
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    //this will allow us to retrieve data from the body
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);    
        }
        else
        {
            //redirect to campgrounds ,calls the get message which will find all the campgrounds including the newly created one
            res.redirect("/campgrounds");
        }
    });
    

    //when we do a redirect, it defaults to a get request

});
//put this before campground/id , otherwise we will get the wrong page
//otherwise it will treat campground new as a show page
//seperate page for the form that sends the data to the post route
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//show page
//find campground with the provided id
//render show template with that campground
   router.get("/:id", function(req, res){
       
       //retreive the campgrounds id
        //its store in :id so we can just use
        //new mongoose method(id, call back)
        //populating the comments on that campground
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
           if(err){
               console.log(err);
           }
           else{//render show template with that campground
              console.log(foundCampground);
                //value of id stored in foundCampground and show can access it through campground
               res.render("campgrounds/show", {campground: foundCampground});
           }
        });
       //req.params.id
       //res.render("show");
   });
    
    module.exports = router;

