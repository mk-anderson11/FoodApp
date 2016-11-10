var express = require('express');
var router = express.Router();

// Mongoose database goes here
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB');

var commentSchema = mongoose.Schema({
  Name: String,
  Comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected');
});

/* GET home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
}); */

router.post('/comment', function(req, res, next) {
  console.log("Post comment route");
  console.log(req.body);
  var newComment = new Comment(req.body);
  console.log(newComment);
  newComment.save(function(err, post) {
    if(err) return console.error(err);
    console.log(post);
    res.status(200).send();
  });
});

// Get Route
router.get('/comment', function(req, res, next) {
  console.log("In the GET route");
  Comment.find(function(err,commentList) {
    if(err) return console.error(err);
    else
    {
      console.log(commentList);
      res.json(commentList)
    }
  })
});

module.exports = router;
