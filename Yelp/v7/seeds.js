var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {   name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?dpr=1&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets c"
    },
    {   name: "Big Giant",
        image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?dpr=1&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets c"
    },
    {   name: "Yellow Peak",
        image: "https://images.unsplash.com/photo-1499363536502-87642509e31b?dpr=1&auto=format&fit=crop&w=767&h=1150&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets c"
    }
    ];

function seedDB(){
    Campground.remove({}, function(err){
        
        if(err){
            console.log(err);
        }
        console.log("remove campgrounds!");
        //wait until we remove everything then add everything in
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("added a campground");
                    //create a comment on each campground
                    Comment.create(
                        {   text: "This place is great, but I wish there was Internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                        
                        //remmove all campgrounds, create 3 from seed data, once we create a need seed data, we'll create the same comment for each of them
                        //associate comment with the campground and then savve the campground and print out comment created
                }
            });
        });
    });
    //add a few campgrounds
    

   
    
}

module.exports = seedDB;