/*Create a page that contains a horizontal strip of thumbnails 
to images, and a bottom panel which starts out empty.
When a user clicks on an thumbnail, it should download the 
full sized version, then display it on the bottom panel.*/

//REQUIRE ALL THE THINGS
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/../public'));
app.use('/', bodyParser.urlencoded({ extended: true }));

//GET REQUESTS
app.get('/', function (req, res) {
	res.render('index');
});

//some type of function to determine which picture belongs to what thumbnail
//send the src of that image along with the res.send
app.get("/getImage", function(req, res) {
	var src = 'img/xl/';
	var cat1 = src + 'cat2_xl.jpg';
	var cat2 = src + 'cat4_xl.jpg';
	var cat3 = src + 'cat7_xl.jpg';
	var cat4 = src + 'cat8_xl.jpg';

	res.send({
		src: [cat1, cat2, cat3, cat4]
	});
});

//POST REQUESTS
app.post("/like", function(req, res) {
		fs.readFile(__dirname + '/../resources/likes.json', function (err, data) {
			if (err) {
				throw err;
			}

			var parsed = JSON.parse(data);
			var cat = "cat" + req.body.nr;

			for (var i = 0; i < parsed.length; i++) {
				if (cat === parsed[i].name){
					parsed[i].amount++;
					var amount = parsed[i].amount;
				}
			} 

			var stringified = JSON.stringify(parsed);

			fs.writeFile(__dirname + '/../resources/likes.json', stringified, function (err,data) {
				if(err) {
					res.send('error: ' + err);
				} else {
					res.send({
						likes: amount
					});
				};
			});
		});
	});

//START LISTENING
var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});

