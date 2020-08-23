const express  = require('express');
const app = express();
const cors  = require('cors');
const mongo = require('mongoose');
const path = require('path');
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,'/test/public')));
app.use(express.static(path.join(__dirname,'/videos')));
mongo.connect('mongodb://127.0.0.1:27017/videodb');
const connection = mongo.connection;
connection.once('open',()=>{
    console.log("mongo connection success");
});
app.use('/admin',require('./routes/admin'));
app.use('/user',require('./routes/user'));
const port= process.env.PORT || 4000;
app.listen(port);