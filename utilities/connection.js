const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

let schema={
    "_id":{
        type:Number,
        required:true
    },
    "name":{
        type:String,
        required:true
    },
    "year":{
        type:Number,
        required:true
    },
    "department":{
        type:String,
        required:true
    },
    "party":{
        type:String,
        required:true
    },
    "position":{
        type:String,
        required:true
    },
    "promise":{
        type:String,
        
    },
    "votes":
    { 
        type:Number,
        default:0,
    }
}
let schema1={
    "_id":{
        type:Number,
        required:true
    },
    "name":{
        type:String,
        required:true
    },
    "year":{
        type:Number,
        required:true
    },
    "department":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "votingflag":{
        type:Number,
        default:0
    },
    "email_id":{
        type:String,
        required:true,
        unique:true
    },
    "gender":{
        type:String,
        required:true
    }
}
let candSchema= new Schema(schema, { collection: "CandidateList", timestamps: true })
let studSchema=new Schema(schema1,{collection: "StudentList", timestamps: true})
let connection = {}
connection.getCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/VotingDB", { useNewUrlParser: true }).then((db) => {
        console.log("connected")
        return db.model("CandidateList", candSchema)

    }).catch((err) => {
        console.log(err.message);

        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}
connection.getAllCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/VotingDB", { useNewUrlParser: true }).then((db) => {
        console.log("connected")
        return db.model("CandidateList", candSchema)

    }).catch((err) => {
        console.log(err.message);

        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}
connection.getStudentCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/VotingDB", { useNewUrlParser: true }).then((db) => {
        console.log("connected")
        return db.model("StudentList", studSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

module.exports = connection