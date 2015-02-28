var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

var developer = [
    { username: 'Alice', age: 25, application: [{ name: 'word' }, { name: 'excel' }, { name: 'ppt' }] },
    { username: 'Bob', age: 28, application: [] },
    { username: 'Charlie', age: 30, application: [] },
];

/*var path = require("path");
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});*/

app.get("/developers", function (req, res) {
    res.json(developer);
});

app.get("/developers/:index", function (req, res) {
    
    var idx = req.params.index;
    res.json(developer[idx]);
});

app.get("/developers/:index/application", function (req, res) {
    var idx = req.params.index;
    res.json(developer[idx].application);
});

app.get("/developers/:index/application/:applicationIndex", function (req, res) {
    var idx = req.params.index;
    var appIndex = req.params.applicationIndex;
    res.json(developer[idx].application[appIndex]);
});

app.delete("/developers/:index", function (req, res) {
    var idx = req.params.index;
    developer.splice(idx, 1);
    res.json(developer);
})

app.post("/developers", function (req, res) {
    var newDeveloper = req.body;
    developer.push(newDeveloper)
    res.json(developer);
});

app.put("/developers/:selectedIndex", function (req, res) {
    var selectedIndex = req.params.selectedIndex;
    var newDeveloper = req.body;
    developer[selectedIndex] = newDeveloper;
    res.json(developer);
});
app.listen(3000);
