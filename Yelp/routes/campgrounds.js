var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//if i just require the middleware directory, it will automatically require the index.js file

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
router.post("/",middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    //this will allow us to retrieve data from the body
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author:author};
    
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
router.get("/new",middleware.isLoggedIn, function(req, res){
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
   
   
   //Destroy Campground route
   router.delete("/:id", function(req, res){
       Campground.findByIdAndRemove(req.params.id, function(err){
          if(err){
              res.redirect("/campgrounds");
          } else{
              res.redirect("/campgrounds");
          }
          
       });
   });
   
   //does the currently logged in user id match the creator of this campground
  //EDIT Campground route -needs a form, then submits to update
  router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
        //we have already handled the error so we shouldn't have to worry about handling it
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit",{campground: foundCampground});
        });  
  });
  
  //Update Campground route
  
  router.put("/:id", function(req,res){
     //find and update the correct campground
    //get all 3 parameters nested in the req.body.campground object
     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
         if(err){
             res.redirect("/campgrounds");
         }else{
             res.redirect("/campgrounds/" + req.params.id);
         }
         
     });
     //redirect somewhere(show page)
  });
   
 //need middleware, user shouldn't be add a campground htey're not logged in
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

// //Check campground ownership
// function checkCampgroundOwnership(req, res, next){
//       //is user logged in at all
//       if(req.isAuthenticated()){
//             Campground.findById(req.params.id, function(err, foundCampground){
//                  if(err){
//                      res.redirect("back");
//                  }else{
//                      //does user own the campground if we find the campground
//                      //can't do foundCampground.author.id === req.user_.id
//                      //they look identical but they are not
//                      //req.user._id is a String, and foundCampground is a Mongoose object
//                      //that when printed out , we see it as a string
//                      //instead of using === or ==, use a method mongoose provides us
//                      if(foundCampground.author.id.equals(req.user._id))
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
    
    module.exports = router;

