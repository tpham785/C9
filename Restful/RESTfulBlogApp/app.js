var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride= require("method-override"),
    expressSanitizer = require("express-sanitizer");
//APP CONFIG
//mongoose.connect("mongodb://local/restful_blog_app");
mongoose.connect("mongodb://localhost/blog_app", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public")); //allows us to use our custom style sheet
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //required to go after bodyParser
app.use(methodOverride("_method")); //will treat anything with this coming from the form as a put request

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}//will still have to manually type in the date
});

var Blog = mongoose.model("Blog", blogSchema);
// title 
// image
// body
// create

// Blog.create({
//   title: "Test Blog" ,
//   image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?dpr=1&auto=format&fit=crop&w=767&h=1155&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
//   body: "HELLO this is a blog post"
// });
//RESTFUL ROUTES
app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
      if(err){
          console.log("ERROR!");
      } 
      else
      {
        res.render("index", {blogs: blogs});    
      }
   });
});

//NEW Route
app.get("/blogs/new", function(req, res){
   res.render("new"); 
});
//Create Route

app.post("/blogs", function(req,res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            //then, redirect to the index
            res.redirect("/blogs");
        }
    });
       
});

//show route
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } 
       else{
           res.render("show",{blog:foundBlog});
       }
    });
});


//edit route
//it's like a combination of new and show
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("blogs");
       } 
       else{
           res.render("edit", {blog: foundBlog});
       }
    });
})

//update route
//find the existing blog, then update
app.put("/blogs/:id", function(req, res){
    //takes id, newData, callback
    req.body.blog.body = req.sanitize(req.body.blog.body); //sanitize both times when you update and when you create
   Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }       
        else{
            res.redirect("/blogs/:id" + req.params.id);
        }
   });
});


//Delete Route

app.delete("/blogs/:id", function(req,res){
    //destroy blog
    //redirect blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVER IS RUNNING"); 
});

