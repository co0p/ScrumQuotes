var express = require('express');

var app = express();
var port = 5432;

var quotes = require('./quotes.json');

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('Quotes server serving ', quotes.length, ' quotes');
});

app.get('/quotes', function(req, res) {
  res.json(quotes);
});

app.get('/quotes/:id', function(req, res) {
  var id = (req.params.id === 'random') ? Math.floor(Math.random() * quotes.length) : req.params.id;
  console.log('id', id);

  if(quotes.length <= id || id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }
  var q = quotes[id];
  res.json(q);
});

app.get('/quotes/random', function(req, res) {

});

app.listen(process.env.PORT || port);
console.log('listening on port', process.env.PORT || port);