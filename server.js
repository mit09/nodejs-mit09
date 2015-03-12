var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/nodejs';
mongoose.connect(connectionString);
var playerSchema = new mongoose.Schema({
    username: String,
    age: Number,
    team: String
}, { collection: "player" });

var PlayerModel = mongoose.model("player", playerSchema);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));



app.get('/process', function(req, res){
	res.json(process.env);
});

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

/*without mongo

var players = [
    { username: 'Lionel Messi', age: 27, team: 'F.C. Barcelona' },
    { username: 'Cristiano Ronaldo', age: 30, team: 'Real Madrid' },
    { username: 'Wayne Rooney', age: 29, team: 'Manchester United' },
];

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

*/

//get
app.get('/player', function (req, res) {
    PlayerModel.find(function (err, data) {
        res.json(data);
    });
});

//get a player
app.get("/player/:id", function (req, res) {
    PlayerModel.findById(req.params.id, function (err, data) {
        res.json(data);
    });
});

//get the team of a player
app.get("/player/:id/team", function (req, res) {
    PlayerModel.findById(req.params.id, function (err, data) {
        res.json(data.team);
    });
});

//delete a player
app.delete("/player/:id", function (req, res) {
    PlayerModel.remove({ _id: req.params.id }, function (err, numberOfRowsDeleted) {
        if (numberOfRowsDeleted != 1) {
            console.log('Unable to delete player _id:' + req.params.id);
        }
        PlayerModel.find(function (err, data) {
            res.json(data);
        });
    });
});

//add a player
app.post("/player", function (req, res) {
    console.log(req.body.username);
    var newPlayer = new PlayerModel({
        username: req.body.username, age: req.body.age, team: req.body.team
    })
    
    newPlayer.save(function (err) {
        if (!err) {
            console.log('New player added:'+newPlayer);
        } else if(err){
            console.log(err);
        }
        PlayerModel.find(function(err, data){
            res.json(data);
        });
    });       
});

//update a player
app.put("/player/:id", function (req, res) {
    PlayerModel.findById(req.params.id, function (err, player) {
        player.username = req.body.username;
        player.age = req.body.age;
        player.team = req.body.team;

        player.save(function (err) {
            if (!err) {
                console.log('Player updated to:' + player);
            } else if (err) {
                console.log(err);
            }
            PlayerModel.find(function (err, data) {
                res.json(data);
            })
        });
    });
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
