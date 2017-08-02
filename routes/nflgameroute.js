var express = require("express")
var router = express.Router()
var gamefacade = require("./../facade/gamefacade")

router.get("/overview", function(req,res,next){
    gamefacade.getStandings(function(err,users) {
    if(err == null)
    res.render("overview", {username:req.session.username,
                            users: users}) // standings Gets returned as array!
    })
})

router.get("/divisionwinners", function(req,res,next){
    var userid =  req.session.userid
    res.render("divisionwinners", {username:req.session.username,
                                   userid: userid})
})

router.get("/gamesoftheweek", function(req,res,next){
    gamefacade.getGamesOfTheWeek(function(err,games){
        if(err != null) next();
        
        res.render("gamesoftheweek", {username: req.session.username,
                                      userId : req.session.userId, 
                                      games : games})
    })
})

router.post("/gamesoftheweek", function(req,res,next){
    var bets = req.body.bets
    var userId = req.session.userId
    gamefacade.postGameBets(bets,userId, function(err,succes){
       if(err != null) next();
        res.json({succes : succes, userId: userId})
    })

})

router.get("/singlepage/:id", function(req,res,next){
    var userid = req.params.id
    res.send("Succes you navigated to: " + userid)
})

module.exports = router