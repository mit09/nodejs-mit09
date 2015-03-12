var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


app.use(express.static(__dirname + '/public'));

var players = [
    { username: 'Lionel Messi', age: 27, team: 'F.C. Barcelona' },
    { username: 'Cristiano Ronaldo', age: 30, team: 'Real Madrid' },
    { username: 'Wayne Rooney', age: 29, team: 'Manchester United' },
];

app.get('/hello', function (req, res) {
    res.send("HelloWorld");
});

var path = require('path');
app.get('/read', function (req, res) {    
    res.sendFile(path.join(__dirname+'/public/1.html'));
});

app.get('/add', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/add.html'));
});

app.get('/update', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/update.html'));
});

app.get("/player", function (req, res) {
    res.json(players);
});

app.get("/player/:index", function (req, res) {
    
    var idx = req.params.index;
    res.json(players[idx]);
});

app.get("/player/:index/team", function (req, res) {
    var idx = req.params.index;
    res.json(players[idx].team);
});

app.delete("/player/:index", function (req, res) {
    var idx = req.params.index;
    players.splice(idx, 1);
    res.json(players);
})

app.post("/player", function (req, res) {
    var newPlayer = req.body;
    players.push(newPlayer)
    res.json(players);
});

app.put("/player/:selectedIndex", function (req, res) {
    var selectedIndex = req.params.selectedIndex;
    var newPlayer = req.body;
    players[selectedIndex] = newPlayer;
    res.json(players);
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
