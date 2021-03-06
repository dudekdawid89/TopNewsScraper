var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = process.env.PORT || 3000;
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.get("/scrape", function (req, res) {
  axios.get("https://www.nbcchicago.com/news/local/").then(function (response) {
    var $ = cheerio.load(response.data);

    $(".story_details").each(function (i, element) {
      var result = {};
      result.title = $(this)
        .children("p.summary")
        .children("a")
        .attr("title");
      result.link = $(this)
        .children("p.summary")
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children("p.summary")
        .children("a")
        .text();
      result.image = $(this)
        .children("span")
        .children("a")
        .children("img")
        .attr("src");
      console.log(result)
      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
    res.redirect("/")
  });
});

app.get("/", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      res.render("index", { article: dbArticle });
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/articles/:id", function (req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/articles/:id", function (req, res) {
  db.Note.create(req.body)
    .then(function (dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push :{note: dbNote._id }}, { new: true });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.put("/articles/:id", function (req, res) {
  db.Article
    .findOneAndUpdate({ _id: req.params.id }, { saved: true })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get("/saved", function (req, res) {
  db.Article.find({ saved: true })
  .populate("note")
    .then(function (dbArticle) {
      console.log(dbArticle)
      res.render("saved", { 
        
      article: dbArticle});
    })

    .catch(function (err) {
      res.json(err);
    });
    
});

app.put("/delete/:id", function (req, res) {
  db.Article
    .findOneAndUpdate({ _id: req.params.id }, { saved: false })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));

});



app.delete("/deleteNote/:noteid/:articleid",function(req,res){
  console.log("received-----------------------------------------------------------------------")
  articleId=req.params.articleid
  noteId=req.params.noteid
   db.Note.remove({_id:noteId}).then(function(data){
       db.Article.findOne({ _id: articleId })
        // console.log(data)
       .populate("note")
       .then(function(dbArticle) {
        
         res.json(dbArticle);
       })
   })
})


app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});


