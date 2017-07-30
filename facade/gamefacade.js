var games = require("./../Mock Data/games")
var bets = require("./../Mock Data/gamebets")

function getStandings(callback){
    callback(null,[
        {username: "Daniel", userid:1, points: 500},
        {username: "Jesper", userid:2, points: 300},
        { username: "Gert", userid:3, points: 200},
        {username: "Hans", userid:4, points: 100}                                
    ])
}



module.exports = {
    getStandings : getStandings
}