
 function authenticateUser(username,password){
    if(username === "daniel") return true
        else{
            return false
        }
}

userfacade = {
    authenticateUser : authenticateUser
}


module.exports = {
    authenticateUser : authenticateUser
}
