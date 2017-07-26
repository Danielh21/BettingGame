
 function authenticateUser(username,password, callback){
    if(username === "daniel") return callback({username:"daniel", id: 1})
        else{
            return callback(null)
        }
}


module.exports = {
    authenticateUser : authenticateUser
}
