// Again we are importing the libraries we are going to use
var express = require('express');
var router = express.Router();
var request = require('request');
var operations = require('../business/operations');
var connection = require('../dao/connection');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// We are going to want to share some data between our server and UI, so we'll be sure to pass that data in an env variable.
var env = {
};
// On our router variable, we'll be able to include various methods. For our app we'll only make use of GET requests, so the method router.get will handle that interaction. This method takes a string as its first parameter and that is the url path, so for the first route we are just giving it '/', which means the default route. Next we are defining a Node Js callback function, that takes three parameters, a request (req), a response (res), and an optional next (next) parameter. Finally, in our callback function, we are just send the message "You are on the homepage".
// GET — retrieve a particular resource’s object or list all objects
router.get('/', function(req, res, next) {
  res.send('You are on the homepage');
});

// We are going to do the same thing for the remaining routes.
router.get('/login',function(req, res){
  operations.login(req,res);
  //res.send('You are on the login page');
});

//POST — create a new resource’s object
router.post('/create', urlencodedParser, function (req, res) {
  operations.createUser(req,res);  
});

//PATCH — make a partial update to a particular resource’s object
router.patch('/:id', function(req, res){

});
//PUT — completely overwrite a particular resource’s object
router.put('/:id', function(req, res){
  operations.updateUser(req,res);
});
//DELETE — remove a particular resource’s object
router.delete('/:id', function(req, res){
  operations.deleteUser(req,res);
});
// find user, render their profile page
router.get('/users/:id', function(req, res, next) {
  client.findUserById(req.params.id, function(err, user) {
    if (err) return next(err);
    console.log(user);
    res.render('/polls', { user: user });
  });
});

router.get('/logout', function(req, res){
 // res.send('You are on the logout page');
  res.redirect('/login');
});

router.get('/polls', function(req, res){
  var user = req.query.user;
   console.log("arsalan");
 console.log(user);
  res.send('You are on the polls page');
})

router.get('/user', function(req, res, next) {
  //res.send('You are on the user page');
 // console.log(parseInt(req.query.name));

  res.render('user', { env: env, user: req.user });
});

// Finally, we export this module so that we can import it in our app.js file and gain access to the routes we defined.
module.exports = router;


/*
HTTP status codes
200 — OK, The request was successful
201 — CREATED, A new resource object was successfully created
404 — NOT FOUND, The requested resource could not be found
400 —BAD REQUEST, The request was malformed or invalid
500 — INTERNAL SERVER ERROR, Unknown server error has occurred
*/