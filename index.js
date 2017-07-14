const express = require("express");
const app = express();
const userfacade = require("./facade/userfacade")
var path = require('path');
var hbs  = require('express-hbs');
var AWS = require('aws-sdk');
var fs = require('fs')
var bodyParser = require('body-parser');
var helmet = require('helmet')
var passport = require("passport")
var JWT = require("jsonwebtoken")
var passportJWT = require('passport-jwt')
var ExtractJwt = passportJWT.ExtractJwt;
var Secret = require('./serverSecret').secret // this file is ignored on git!
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = Secret

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    try{
    console.log('payload received', jwt_payload);
    userFacade.findUserByName(jwt_payload.userName, function(user){
        if (user) {
        next(null, user);
        } else {
        next(null, false);
        }
      })
    }
    catch(exeption){
        next(null,false)
    }
});
app.use(helmet());
passport.use(strategy);
app.use(passport.initialize());

AWS.config.region = process.env.REGION

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'hbs')

app.engine('hbs', hbs.express4({
     partialsDir: __dirname + '/views'
}))

var header = fs.readFileSync("./views/partial/header.hbs", 'utf8')
var footer = fs.readFileSync("./views/partial/footer.hbs", "utf8")
hbs.registerPartial('header', header)
hbs.registerPartial('footer',footer)

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Server Running on Port: " + port )
})


app.use(express.static('views'))

app.get("/",function(req,res,next){
    res.render('home')
})

app.post("/login",function(req,res,next){
   let username =  req.body.username
   let password = req.body.password
   if(userfacade.authenticateUser(username,password)){
    var payload = {username: username}
    var token = JWT.sign(payload,jwtOptions.secretOrKey)
    res.json({message: "ok", token : token, goTo: "overview"})
   }
   else{
       res.redirect("/")
   }
})

app.get("/overview", passport.authenticate('jwt', {session: false}), function(req,res,next){
    res.render('overview')
})
