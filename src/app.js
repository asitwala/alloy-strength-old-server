import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import history from 'connect-history-api-fallback'; // to work with Vue Router's 'history' mode
import mongoose from 'mongoose'; 
import User from '../src/models/user'; 
import config from '../config/db';

// Connect to the database
//mongoose.connect(config.db);

// When running locally
mongoose.connect('mongodb://localhost:27017/users');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', (callback) => {
    console.log('Connection Succeeded');
});

let app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(
        [{
            title: 'Home Page!',
            description: 'This is the home page!'
        }]
    );
});

app.post('/users', (req, res) => {
    let db = req.db;
    let firstName = req.body.firstName; 
    let email = req.body.email; 
    let newUser = new User({
        firstName: firstName,
        email: email
    });

    newUser.save(error => {
        if (error) {
            console.log(error);
        } else {
            res.send({
                success: true,
                message: 'User saved successfully!'
            })
        }
    })
});

app.get('/users', (req, res) => {
    User.find({}, 'firstName email', (error, user) => {
        if (error) {
            console.error(error);
        }
        res.send({
            users: user
        })
    }).sort({_id:-1})
})


console.log('App is listening on http://localhost:8081');

// Place this line below all the requests; otherwise server cannot get route
app.use(history());
app.listen(process.env.PORT || 8081);
