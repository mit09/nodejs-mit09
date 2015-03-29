var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs');

var playerSchema = new mongoose.Schema({
    username: String,
    age: Number,
    team: String
}, { collection: "player" });

var playerModel = mongoose.model("player", playerSchema);

var player1 = new playerModel({ username: 'Lionel Messi', age: 27, team: 'F.C. Barcelona' });
player1.save();

var player2 = new playerModel({ username: 'Cristiano Ronaldo', age: 30, team: 'Real Madrid' });
player2.save();

var player3 = new playerModel({ username: 'Wayne Rooney', age: 29, team: 'Manchester United' });
player3.save();

var player4 = new playerModel({ username: 'Zlatan Ibrahimovic', age: 33, team: 'P.S.G' });
player4.save();