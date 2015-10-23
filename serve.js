'use strict';

var express = require('express');

var app = express();
var rq = require('request-promise');

// app.use(require('cors')());
app.use(express.static('./chrome'));

app.use('/proxy/', function(req, res, next) {
    var headers = req.headers;

    headers['Accept-Encoding'] = 'identity';

    rq({
        uri: req.query.url,
        headers: headers,
        method: req.method,
        resolveWithFullResponse: true
    })
    .then(function(data) {
        res.headers = data.headers;
        res.status(data.statusCode);
        res.send(data.body);
    })
    .catch(function(err) {
        res.status(500).send({ error: err})
    });
});
app.listen(process.env.PORT || 8000);