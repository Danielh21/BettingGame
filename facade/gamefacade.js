var games = require("./../Mock Data/games")
var bets = require("./../Mock Data/gamebets")

function getStandings(callback){
    callback(null,[
        {username: "Daniel", userid:1, points: 500},
        {username: "Jesper", userid:2, points: 300},
        {username: "Gert", userid:3, points: 200},
        {username: "Hans", userid:4, points: 100}                                
    ])
}

function getGamesOfTheWeek(callback){
    callback(null,[
        {id:1,
        homeTeam: "Washington Redskins",
        awayTeam: "Philadelphia Eagles",
        date: "02-08-2017",
        gameDone: false
        },
        {id:2,
        homeTeam: "Buffalo Bills",
        awayTeam: "New England Patriots",
        date: "02-08-2017",
        gameDone: false
        }
    ])
}

function postGameBets(bets, userId, callback){
    console.log("Recived from User: " + userId + ": " + bets)
    callback(null,true);
}



module.exports = {
    getStandings : getStandings,
    getGamesOfTheWeek: getGamesOfTheWeek,
    postGameBets: postGameBets
}