'use strict';

var express = require('express');

var app = express();

app.use(express.static('./chrome'));

app.listen(process.env.PORT || 8000);