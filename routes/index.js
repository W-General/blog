var database = require('./database');
var datenow = new Date();
//var crypto = require('crypto');

database.init();

function index(req, res){
	res.render('index.html');
};

function partials(req, res){
	var name = req.params.name;
	console.log(req.session);
	if (req.session.username) {
		res.render('partials/'+name+'.html');	
		console.log("has session");
	} else {
		res.render('partials/guest/'+name+'.html');	
		console.log("no session");
	}
};

function getPosts(req, res){
	database.findAll('posts', function(error, posts){
		res.json({posts:posts});
	});
};

function addPost(req, res){
		var post = req.body;
		post.date = datenow.toString();
		database.addPost(post, function(error, results) {
			res.json(post);
		});
};

function getPost(req, res){
	var title = req.params.title;
	database.getPost(title, function(error, result) {
		//console.log(result);
		res.json({post: result});
	});
};

function editPost(req, res){
	var title = req.params.title;
	var post = req.body;
	database.editPost(title, post, function(error, result) {
		res.json(true);
	});
};

function deletePost(req, res){
	var title = req.params.title;
	database.deletePost(title, function(error, result) {
		res.json(true);
	});
}

function addUser(req, res){
	var user = req.body;
	database.addUser(user.username, user.password, function(error, result) {
		res.json(user);
	});

}

function login(req, res){
	var user = req.body;
	console.log('user:' + user.username + '\n');
	console.log('pass:' + user.password + '\n');
	database.getUser(user.username, function(error, result){
		if(result.password === user.password) {
			req.session.username = result.username;
			req.session.password = result.password;
			console.log('verified');
		}
		res.json(true);
	});
}

function logout(req, res){
	req.session = null;
	res.render('index.html');
}


function reset(req, res){
	database.reset();
	res.render('index.html');
}

exports.index = index;
exports.partials = partials;
exports.getPosts = getPosts;
exports.addPost = addPost;
exports.getPost = getPost;
exports.editPost = editPost;
exports.deletePost = deletePost;

exports.addUser = addUser;
exports.login = login;
exports.logout = logout;
exports.reset = reset;