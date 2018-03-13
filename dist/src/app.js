'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('../src/models/user');

var _user2 = _interopRequireDefault(_user);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect to the database
//mongoose.connect(config.db);

// When running locally
_mongoose2.default.connect('mongodb://localhost:27017/users'); // to work with Vue Router's 'history' mode


var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function (callback) {
    console.log('Connection Succeeded');
});

var app = (0, _express2.default)();
app.use((0, _morgan2.default)('combined'));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

app.get('/', function (req, res) {
    res.send([{
        title: 'Home Page!',
        description: 'This is the home page!'
    }]);
});

app.post('/users', function (req, res) {
    var db = req.db;
    var firstName = req.body.firstName;
    var email = req.body.email;
    var newUser = new _user2.default({
        firstName: firstName,
        email: email
    });

    newUser.save(function (error) {
        if (error) {
            console.log(error);
        } else {
            res.send({
                success: true,
                message: 'User saved successfully!'
            });
        }
    });
});

app.get('/users', function (req, res) {
    _user2.default.find({}, 'firstName email', function (error, user) {
        if (error) {
            console.error(error);
        }
        res.send({
            users: user
        });
    }).sort({ _id: -1 });
});

console.log('App is listening on http://localhost:8081');

// Place this line below all the requests; otherwise server cannot get route
app.use((0, _connectHistoryApiFallback2.default)());
app.listen(process.env.PORT || 8081);