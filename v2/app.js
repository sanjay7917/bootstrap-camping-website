var express     = require("express");
    app         = express();
    bodyParser  = require("body-parser");
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Magnoliya",
//     image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
//     description: "Home of most powerfull Wizards."
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Newly Created Campground.");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//     { name: "Magnolia", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144495f7c671a7e4b3_340.jpg" },
//     { name:  "Levithon", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104490f0c67eafedbcbe_340.jpg" },
//     { name: "Magnolia", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144495f7c671a7e4b3_340.jpg" },
//     { name: "Alvarz", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104490f0c67eafedbcbe_340.jpg" },
//     { name:  "Levithon", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104490f0c67eafedbcbe_340.jpg" },
//     { name: "Magnolia", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144495f7c671a7e4b3_340.jpg" },
//     { name:  "Levithon", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104490f0c67eafedbcbe_340.jpg" },
//     { name: "Alvarz", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104490f0c67eafedbcbe_340.jpg" }
// ]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    console.log("Server Has Started !!");
});