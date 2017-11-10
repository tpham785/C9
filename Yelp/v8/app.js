var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds"),
    User          = require("./models/user"),
    Comment       = require("./models/comment"),
    methodOverride = require("method-override");
    
    //requiring routes
  var commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //__dirname refers to the dir the script was run in
app.use(methodOverride("_method"));
//seedDB(); //seed the database

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
   res.locals.currentUser = req.user; 
   next(); 
});

//use these three route fules
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes); //because all the routes in campgrounds start like /campgrounds, we can insert this to remove the repetition, have to go into campgrounds and remove it as well
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!")
});



