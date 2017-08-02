
submitClicked = function(){
    var gameElements = document.getElementsByName("game")
    var bets = []
    gameElements.forEach(function(element) {
        var bet = element.value
        var gameid = parseInt(element.id)
        console.log("GameID: " + gameid + " Bet is: " + bet)
       var game = {bet: bet, gameid: gameid}
        bets.push(game);
    }, this);

    axios.post("/gamesoftheweek",{
                bets: bets
            })
            .then(function(response){
                if(response.data.succes == true){
                    window.location.href = "/singlepage/" + response.data.userId
                }
            })
            .catch(function(error){
                console.log(error)
            })

}