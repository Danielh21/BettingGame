const express = require("express");
const app = express();
const userfacade = require("./facade/userfacade")
var path = require('path');
var hbs  = require('express-hbs');
var AWS = require('aws-sdk');
var fs = require('fs')
var bodyParser = require('body-parser');
var helmet = require('helmet')
var cookieParser = require("cookie-parser")
var Secret = require('./serverSecret').secret // this file is ignored on git!
var session = require("express-session");
var nflRouter  = require('./routes/nflgameroute')


app.use(helmet());

app.use(express.static('views'))

AWS.config.region = process.env.REGION


app.set('view engine', 'hbs')

app.engine('hbs', hbs.express4({
     partialsDir: __dirname + '/views'
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: Secret ,saveUninitialized:true, resave: true}))


var header = fs.readFileSync("./views/partial/header.hbs", 'utf8')
var footer = fs.readFileSync("./views/partial/footer.hbs", "utf8")
hbs.registerPartial('header', header)
hbs.registerPartial('footer',footer)

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Server Running on Port: " + port )
})



app.get("/",function(req,res,next){
    res.render('index')
})

app.get("/nflgame", function(req,res,next){
    res.render("nflgame")
})

app.post("/login",function(req,res,next){
   let username =  req.body.username
   let password = req.body.password
   userfacade.authenticateUser(username,password, function(user){
       if(user != null){
        req.session.username = user.username
        req.session.userId = user.id
        res.redirect("/overview")
       }
       else{
           res.redirect("/nflgame")
       }
   })
})


app.use(function( req , res , next ) {
var sess = req.session
if(sess.username != null){
  next();
}
 else{
     res.redirect("/nflgame")
 }
});

app.use("/", nflRouter)
