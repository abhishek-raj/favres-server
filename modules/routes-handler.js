var mongoose = require('./db-connect');
var qs = require('querystring');
var restaurantsModule = require('./restaurants');
var addressModule = require('./address');
var handler = function (request, response)
{
	var urlPath = (require('url').parse(request.url)).pathname;
	if(urlPath == '/')
	{
		console.log(urlPath);
	  	response.writeHead(200, {'Content-Type': 'text/plain'});
	  	response.end('Hello World\n');
	}
	else if(urlPath == '/getgeocode')
	{
		console.log(request.url);
		var body = '';
		request.on('data', function (data) {
	        body += data;
	        if (body.length > 1e5) { 
	            request.connection.destroy();
	        }
	   	});
	   	request.on('end', function () {
	       	post = body;
			response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
			var	results = [];
			console.log(post);
			addressModule.getAddress(post, function(data) {
			results = data;
			response.end('{"results": '+JSON.stringify(results)+'}');
			});
		});
	}
	else if(urlPath == '/restaurants')
	{
			var body = '';
			request.on('data', function (data) {
	            body += data;
	            if (body.length > 1e5) { 
	                request.connection.destroy();
	            }
        	});
        	request.on('end', function () {
            	var post = body;
   				response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
   				var	results = [];
   				restaurantsModule.getRestaurants(post, function(data) {
   					results = data;
		  			response.end('{"results": '+JSON.stringify(results)+'}');
   				});
   					
			});
	}
	else if(urlPath == '/addusers')
	{
		console.log(request.url);
		var body = '';
			request.on('data', function (data) {
	            body += data;
	            if (body.length > 1e5) { 
	                request.connection.destroy();
	            }
        	});
        	request.on('end', function () {
        		try{
            	var post = JSON.parse(body);
            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
   				var adduser = require('./adduser');
   				adduser.addUser(post, function(message){
   					response.end('{"message": "'+message+'"}');
   				});
	            }
	            catch(e){
	            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
	            	response.end('{"message": "Invalid JSON Object."}');
	            }
			});
	}
	else if(urlPath == '/userauth')
	{
		console.log(request.url);
		var body = '';
			request.on('data', function (data) {
	            body += data;
	            if (body.length > 1e5) { 
	                request.connection.destroy();
	            }
        	});
        	request.on('end', function () {
        		try{
            	var post = JSON.parse(body);
            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
   				var userAuth = require('./gettoken');
   				userAuth.getAuth(post, function(message, user){
   					response.end('{"message": "'+message+'", "user": '+JSON.stringify(user)+'}');
   				});
	           }
	            catch(e){
	            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
	            	response.end('{"message": "Invalid JSON Object."}');
	            }
			});
	}
	else if(urlPath == '/favourites')
	{
		console.log(request.url);
		var body = '';
			request.on('data', function (data) {
	            body += data;
	            if (body.length > 1e5) { 
	                request.connection.destroy();
	            }
        	});
        	request.on('end', function () {
        		try{
            	var post = JSON.parse(body);
            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
   				var getFav = require('./getfav');
   				getFav.getfav(post, function(message, favs){
   					response.end('{"message": "'+message+'", "favs": '+JSON.stringify(favs)+'}');
   				});
	           }
	            catch(e){
	            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
	            	response.end('{"message": "Invalid JSON Object."}');
	            }
			});
	}
	else if(urlPath == '/favourites/post')
	{
		console.log(request.url);
		var body = '';
			request.on('data', function (data) {
	            body += data;
	            if (body.length > 1e5) { 
	                request.connection.destroy();
	            }
        	});
        	request.on('end', function () {
        		try{
            	var post = JSON.parse(body);
            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
   				var addfav = require('./addfav');
   				addfav.addFav(post, function(message){
   					response.end('{"message": "'+message+'"}');
   				});
	            }
	            catch(e){
	            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
	            	response.end('{"message": "Invalid JSON Object."}');
	            }
			});
	}
	else if(urlPath == '/favourites/post/delete')
	{
		console.log(request.url);
		var body = '';
			request.on('data', function (data) {
	            body += data;
	            if (body.length > 1e5) { 
	                request.connection.destroy();
	            }
        	});
        	request.on('end', function () {
        		try{
            	var post = JSON.parse(body);
            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
   				var removefav = require('./removefav');
   				removefav.removeFav(post, function(message){
   					response.end('{"message": "'+message+'"}');
   				});
	            }
	            catch(e){
	            	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
	            	response.end('{"message": "Invalid JSON Object."}');
	            }
			});
	}
	else
	{
		console.log(urlPath);
	  	response.writeHead(404, {'Content-Type': 'text/plain'});
	  	response.end('Page not found');
	}
};

exports.handler = handler;