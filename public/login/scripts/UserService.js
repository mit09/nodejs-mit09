app.factory('UserService', function () {
    var users = [
        { username: 'mit', password: 'mit' },
        { username: 'admin', password: 'admin' }];

    var currentUser = null;

    var login = function (username, password) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                if (users[i].password == password) {
                    currentUser = users[i];
                    return users[i];
                } else {
                    return null;
                }
                
            }
        }
        return null;
    }

    var getCurrentUser = function(){
        return currentUser;
    }

    var logout = function (username) {
        currentUser = null;
    }
    return {
        /*Expose the function*/
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout
    };
});