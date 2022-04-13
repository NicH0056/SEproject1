var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const rawTweets = require('./favs.json');
var parsedTweets = []
for (let i = 0; i < rawTweets.length; i++) {
    var temp = {
        "created_at": rawTweets[i].created_at,
        "screen_name": rawTweets[i].user.screen_name,
        "id_str": rawTweets[i].id_str,
        "text": rawTweets[i].text

    };
    parsedTweets[i] = temp;
 }


var products = [
{
	id: 1,
	name: 'poop'
},
{
	id: 2,
	name: 'pee'
}
];

var currentId = 2;
var PORT = 3000;
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/parsedTweets', function(req, res){
	res.send({ parsedTweets: parsedTweets });
});


app.post('/parsedTweets', function(req, res){
	var productName = req.body.name;
	currentId++;

	products.push({
		id: currentId,
		name: productName
	});
	res.send('Successfully created product!');
});

app.put('/parsedTweets/:screen_name', function(req, res) {
	var id = req.params.screen_name;
	var newText = req.body.text;

	var found = false;

	parsedTweets.forEach(function(tweet, index) {
		if (!found && tweet.screen_name === id) {
			tweet.text = newText
		}
	});
	res.send('Successfully updated product');
});

app.delete('/parsedTweets/:screen_name', function(req, res) {
	var id = req.params.screen_name;

	var found = false;

	parsedTweets.forEach(function(tweet, index) {
		if(!found && tweet.screen_name === id) {
			parsedTweets.splice(index, 1);
		}
	});
	res.send('successfully deleted product');
});
app.listen(PORT, function(){
	console.log('server is listening on ' + PORT);
});