app.factory('PlayerService', function($http){
    var addPlayer = function(player, callback){
        $http.post("/player" ,player)
       .success(callback);
    }

    var getAllPlayer = function (callback) {
        $http.get('/player')
        .success(callback);
    }

    var deletePlayer = function (id, callback) {
        $http.delete('/player/' + id)
        .success(callback);
    }

    var getPlayerById = function (id, callback) {
        $http.get('/player/' + id)
        .success(callback);
    }

    var updatePlayer = function (id, updatedPlayer, callback) {
        $http.put('/player/' + id, updatedPlayer)
        .success(callback);
    }

    return{
        addPlayer: addPlayer,
        getAllPlayer: getAllPlayer,
        deletePlayer: deletePlayer,
        getPlayerById: getPlayerById,
        updatePlayer: updatePlayer
    };

    

});