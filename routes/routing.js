const express = require('express');
const { request } = require('http');
const routing = express.Router();
const service = require("../services/candidatelist");
const nodemailer=require('nodemailer');

// view engine setup

routing.get('/',function(req,res){
    res.render('contact');
});

var email,id,name;

var otp;
otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

let transporter = nodemailer.createTransport({
    host: "eballotsctce@gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'eballotsctce@gmail.com',
      pass: 'eballot2020',
    }
    
});
    
routing.post('/send',function(req,res){
    email=req.body.email;
    name=req.body.name
    id=req.body._id
     // send mail with defined transport object
    var mailOptions={
        to: req.body.email,
        subject: "OTP For EBALLOTSCT Registration",
        html: "<h2 style='font-weight:bold;'>"+"Dear "  + name+" ("+id+") " +",</h2>"+
        "<h3> Your OTP for User Verification is: </h3>"  + "<h1 style='font-weight:bold;'>" + otp +". </h1><br>"+// html body
        "<h2>Enter this OTP to complete registration.</h2>"
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('otp');
    });
});

routing.post('/verify',function(req,res){

    if(req.body.otp==otp){
        res.json({message:"You has been successfully registered"});
        res.status=200;
    }
    else{
        res.json({message:"Incorrect OTP"});
        res.render('otp',{msg : 'otp is incorrect'});
        res.status=400
    }
});  

routing.post('/resend',function(req,res){
    var mailOptions={
        to: email,
       subject: "Otp for registration is: ",
       subject: "OTP For EBALLOTSCT Registration",
       html: "<h2 style='font-weight:bold;'>"+"Dear "  + name+" ("+id+") " +",</h2>"+
       "<h3> Your OTP for User Verification is: </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"+// html body
       "<h2>Enter this OTP to complete registration.</h2>"
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('otp',{msg:"otp has been sent"});
    });

});
//setupCandidateDB
routing.get("/setupCandidateDB", (req, res, next) => {
    service.insertScript().then((data) => {
        if (data) {
            console.log(data)
            res.status(201)
            res.json({message:"Setup Completed Succesffully"})
        }
    })
})
//setupStudentDB
routing.get("/setupStudentDB", (req, res, next) => {
    service.insertStudentScript().then((data) => {
        if (data) {
            console.log(data)
            res.status(201)
            res.json({message:"Setup Completed Succesffully"})
        }
    })
})
//setupab
routing.get("/setupab",(req,res,next)=>{
    service.insertScript().then((data)=>{
        if(data){
            console.log(data)
            res.json("inserted"+data.length)
        }
    })
})

//Routing for login
routing.post("/studentLogin", (req, res, next) => {
    let loginObj = req.body
    service.validateLogin(loginObj).then((resp) => {
        console.log(resp)
        if (resp) {
            res.status(200)
            res.json({message:"Logged In Successfully",username:resp})
        } 
    }).catch((err) => {
        next(err)
    })
})

//Routing for vote submission
routing.post("/submitVote", (req, res, next) => {
    let loginObj = req.body._id
    service.validateVote(loginObj).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message:"Voted Successfully"})
            console.log("Vote Successful")
        } 
    }).catch((err) => {
        next(err)
    })
})

//Routing to post candidate details 
routing.post("/insertCandidate", (req, res, next) => {
    let cLObj= req.body
    console.log(cLObj)
    service.createList(cLObj).then((data) => {
        res.json({message: "List Creation Succesful"})
        console.log("Success")
    }).catch((err) => {
        next(err)
    })
})
//Routing to get candidate details 
routing.post("/getCandidate",(req,res,next)=>{
    console.log("Get")
    let pos=req.body.position
    console.log(pos)
    service.getList(pos).then((data)=>{
        // res.json({message:"Recieved data"})
        res.send(data)
        console.log(data)
        console.log("DATA RECEIVED")
    }).catch((err) => {
        next(err)
    })
})
//Routing to get details of all candidates  
routing.get("/getAllCandidates",(req,res,next)=>{
    console.log("Get")
    service.getCandList().then((data)=>{
        res.send(data)
        console.log(data)
        console.log("DATA RECEIVED")
    }).catch((err) => {
        next(err)
    })
})
//Routing to get final results of the election
routing.get("/getResult",(req,res,next)=>{
    console.log("Get")
    service.getResult().then((data)=>{
        res.send(data)
        console.log(data)
        console.log("DATA RECEIVED")
    }).catch((err) => {
        next(err)
    })
})

//routing to insert student
routing.post("/insertStudent", (req, res, next) => {
    let sLObj= req.body
    console.log(sLObj)
    service.createStudentList(sLObj).then((data) => {
        res.json({message: "List Creation Succesful"})
        console.log("Success")
    }).catch((err) => {
        next(err)
    })
})  
//routing to delete candidate
routing.post("/deleteCandidate", (req, res, next) => {
    console.log("delete");    
    id=req.body._id
    service.deleteCandidate(id).then((tid) => {
        res.json({ message: "Removed Candidate" })
    }).catch((err) => {
        next(err)
    })
})
//voting
routing.post("/Voting",(req,res,next)=>{
    console.log("VOTING....")
    let n=req.body.id
    console.log(n)
    service.updateList(n).then((data)=>{
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})
module.exports = routing;