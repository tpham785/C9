//if we have multiple var declarations in a row, we can just separate them by commas
//replace hard coded array with the database
var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds"),
    User          = require("./models/user"),
    Comment       = require("./models/comment");
    
    //requiring routes
  var commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");
    
    //Comment    = require("./models/comment");
//don't have a database in mongodb so we create one dynamically
//mongoose.connect("mongodb://localhost/yelp_camp");
//run this function every time

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //__dirname refers to the dir the script was run in
seedDB();


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//comes with the plugin
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//provide this so that we pass in currentUser for authentication on every route
app.use(function(req,res,next){
    //what's in locals.currentUser is what's available inside of the template
   res.locals.currentUser = req.user; 
   next(); //have to move on to the next code because this is middleware (route handler)
});

// Campground.create( {name: "Granite Hill", 
//                     image: "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
//                     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
        
//                     }, function(err, campground){
//                         if(err){
//                             console.log(err);
//                         }
//                         else{
//                             console.log("Newly Created Campground:");
//                             console.log(campground);
//                         }
//                     });




// app.get("/", function(req, res){
//   res.render("landing"); 
// });

// //Index - show all campgrounds
// app.get("/campgrounds", function(req, res){
        
//         //get all campgrounds from DB and then run the[] file
//         Campground.find({}, function(err, allCampgrounds){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 //still rendering the campgrounds file
//                 //still calling it campgrounds
//                 //only difference now is the source is from the db defined in the parameter above
//                 res.render("campgrounds/index", {campgrounds:allCampgrounds});
//             }
//         });
       
// });

// //Create-- add a new campground to the DB
// app.post("/campgrounds", function(req, res){
//     //get data from form and add to campgrounds array
//     //redirect back to campgrounds page
//     //this will allow us to retrieve data from the body
//     var name = req.body.name;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var newCampground = {name: name, image: image, description: desc};
    
//     //Create a new campground and save to DB
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err){
//             console.log(err);    
//         }
//         else
//         {
//             //redirect to campgrounds ,calls the get message which will find all the campgrounds including the newly created one
//             res.redirect("/campgrounds");
//         }
//     });
    

//     //when we do a redirect, it defaults to a get request

// });
// //put this before campground/id , otherwise we will get the wrong page
// //otherwise it will treat campground new as a show page
// //seperate page for the form that sends the data to the post route
// app.get("/campgrounds/new", function(req, res){
//     res.render("campgrounds/new");
// });

// //show page
// //find campground with the provided id
// //render show template with that campground
//   app.get("/campgrounds/:id", function(req, res){
       
//       //retreive the campgrounds id
//         //its store in :id so we can just use
//         //new mongoose method(id, call back)
//         //populating the comments on that campground
//         Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//           if(err){
//               console.log(err);
//           }
//           else{//render show template with that campground
//               console.log(foundCampground);
//                 //value of id stored in foundCampground and show can access it through campground
//               res.render("campgrounds/show", {campground: foundCampground});
//           }
//         });
//       //req.params.id
//       //res.render("show");
//   });
    
// ////////---------------Comments routes
// //will call is logged in which will call the following code( the code in the body)
// app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
//     //find campground by id, and send it through to render
//     Campground.findById(req.params.id, function(err, campground){
//       if(err){
//           console.log(err);
//       } else{
//             //console.log("HELLLLO");
//           //console.log(campground);
//           // res.send()
//           res.render("comments/new", {campground: campground});
//       }
//     });
// });

// //we're not actually protecting the post route, we are just hiding the form if the user isn't logged in
// //theorectically, you could still send a post request via postMan, so check for isLoggedIn
// app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
//   //lookup campground using ID
//   //create new comment
//   //connect new comment to campground
//   //redirect to campground show page
   
//   Campground.findById(req.params.id, function(err, campground){
//       if(err){
//           console.log(err);
//           res.redirect("/campgrounds");
//       }else{
//           Comment.create(req.body.comment, function(err, comment){
//                 if(err){
//                     console.log(err);
//                 }                   
//                 else{
//                     campground.comments.push(comment);
//                     campground.save();
//                     res.redirect("/campgrounds/" + campground._id);
//                 }
//           });
//         }
//       });
//     });

// app.get("/campgrounds/:id/comments/new", function(req, res){
//     // find campground by id
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//              res.render("comments/new", {campground: campground});
//         }
//     })
// });


// ////Authentication Routes
// //show the register form
// app.get("/register", function(req, res){
//     res.render("register");
// });

// //handle sign up logic
// app.post("/register", function(req,res){
//   var newUser = new User({username: req.body.username});
//   User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             //returns allows us to shortcircuit and quickly get out on error
//             return res.render("register");
//         }
//         //using passport local mongoose automatically raises an exception if trying to make a user with the same username
//         passport.authenticate("local")(req,res,function(){
//           res.redirect("/campgrounds"); 
//         });
//   });
// });

// //Login needs two routes
// //Get request to show the form
// //post to do the logging in
// //show login form
// app.get("/login", function(req, res){
//   res.render("login"); 
// });

// //handling login logic
// //use passport middleware
// //app. post made
// //when req is made, passport.authenticate runs first--acts as a second argument
// //then callback is made
// //authenticate is setup in User.authenticate
// //this is the same passport.authenticate call that we are using
// //in the register route. The diff is that in the register route, we are
// //doing diff things before running the register route
// //for register, we are registering and if that works, then we log the user in with authenticate
// //with login, we presume they user is already created, then we call authenticate in order to log them in
// app.post("/login", passport.authenticate("local",
// {
//     successRedirect: "/campgrounds",
//     failureRedirect: "/login"
// }),function(req,res){
//   res.send("Login Logic happens here"); 
// });

// //logout route
// app.get("/logout", function(req,res){
//   req.logout();
//   res.redirect("/campgrounds");
// });

// //need middleware, user shouldn't be able to leave a comment if htey're not logged in
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

//use these three route fules
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes); //because all the routes in campgrounds start like /campgrounds, we can insert this to remove the repetition, have to go into campgrounds and remove it as well
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!")
});



