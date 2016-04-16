#!/bin/env node
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _schema = require('./data/schema');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _database = require('./data/database');

var _database2 = _interopRequireDefault(_database);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server_port = process.env.PORT || 3000;

var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, "../src/frontend/index.html"));
});

app.use('/style', _express2.default.static(_path2.default.resolve(__dirname, '../src/style')));
app.use('/utils', _express2.default.static(_path2.default.resolve(__dirname, '../src/utils')));

app.get('/bundle.js', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, "../src/frontend/public/bundle.js"));
});

app.use('/graphql', (0, _expressGraphql2.default)({ schema: _schema.Schema, pretty: true, graphiql: true }));

app.post('/api/authenticate', function (request, response) {

    _database2.default.models.user.findOne({ where: { login: request.body.login } }).then(function (user) {

        console.log("password before hash: " + request.body.password);
        console.log("userh: " + JSON.stringify(user));
        var password = _crypto2.default.createHash("sha256").update(request.body.password).digest("base64");
        console.log("password after hash: " + password);

        if (user.password != password) {

            console.log("bouuuuhh not authenticated");
            response.json({
                success: false,
                message: 'Bad authentication'
            });
        } else {

            console.log("yeahh authenticated");

            var decoded = _jsonwebtoken2.default.sign(user.dataValues, 'secret', {
                expiresIn: 600
            });

            response.json({
                success: true,
                message: 'Enjoy your token!',
                token: decoded
            });
        }
    }).catch(function (error) {
        console.log(error);
        response.json({
            success: false,
            message: 'Unhandled error'
        });
    });
});

app.listen(server_port, function (err) {
    if (err) return console.log(err);
    console.log('Server is now running on port ' + server_port);
});