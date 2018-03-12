var express = require('express');
var app = express();
var sse = require('./sse');

var connections = [];
var messages = [];
app.use(sse);

app.post('/message', function(req, res) {
  console.log(req.body);
  for (var i = 0; i < connections.length; i++) {
    connections[i].sseSend(req.body);
  }

  res.status(200).end();
});

app.get('/stream', function(req, res) {
  res.sseSetup();
  res.sseSend(messages);
  connections.push(res);
});

app.listen(3200, function() {
  console.log('Listening on port 3200...')
});