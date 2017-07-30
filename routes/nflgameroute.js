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

router.get("/betgames", function(req,res,next){
    var userid =  req.session.userid
    res.render("betgames", {username:req.session.username,
                                   userid: userid})
})

router.get("/divisionwinners", function(req,res,next){
    var userid =  req.session.userid
    res.render("divisionwinners", {username:req.session.username,
                                   userid: userid})
})

router.get("/singlepage/:id", function(req,res,next){
    var userid = req.params.id
    res.send("Succes you navigated to: " + userid)
})

module.exports = router