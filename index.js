const express = require("express");
const app = express();
const userfacade = require("./facade/userfacade")
var path = require('path');
var hbs  = require('express-hbs');
var AWS = require('aws-sdk');
var fs = require('fs')
var bodyParser = require('body-parser');


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


app.get("/",function(req,res,next){
    res.render('home')
})

app.post("/login",function(req,res,next){
   let username =  req.body.username
   let password = req.body.password
   if(userfacade.authenticateUser(username,password)){
    res.redirect("/overview")
   }
   else{
       res.redirect("/")
   }
})

app.get("/overview", function(req,res,next){
    res.render('overview')
})
