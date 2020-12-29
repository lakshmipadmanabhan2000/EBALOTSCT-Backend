const adminData = require("./admin.json")
const nota = require("./nota.json")
const collection = require("../utilities/connection")
const { response } = require("express")


let model = {}

model.insertScript = () => {
    return collection.getCollection().then((collection) => {
        return collection.remove().then((data) => {
            return collection.insertMany(nota).then((response) => {
                console.log(response)
                if (response && response.length > 0) {
                    return response
                } else {
                    let err = new Error("Script insertion failed")
                    err.status = 500
                    throw new Error
                }
            })
        })
    })
}
    model.insertStudentScript = () => {
        return collection.getStudentCollection().then((collection) => {
            return collection.remove().then((data) => {
                return collection.insertMany(adminData).then((response) => {
                    if (data && data.length > 0) {
                        console.log(data)
                        return data
                    } else {
                        let err = new Error("Script insertion failed")
                        err.status = 500
                        throw new Error
                    }
                })
            })
        })
    }


model.insertData=(cdata) =>{
    console.log("model")
    console.log(cdata)
    return collection.getCollection().then((collection) => {
        
            return collection.insertMany(cdata).then((response) => {

                if (response && response.length > 0) {
                    return response
                } else {
                    let err = new Error("Insertion failed")
                    err.status = 500
                    throw new Error
                }
            
        })
    })
}

model.getAllData=() =>{
    console.log("model")
    return collection.getAllCollection().then((collection) => {
        return collection.find().sort({"position":1})
            .then((data) => {
                console.log(data)
                return data
            })
    })
}
model.getResult=() =>{
    console.log("model")
    return collection.getAllCollection().then((collection) => {
        return collection.find().sort({"position":1,"votes":-1})
            .then((data) => {
                console.log(data)
                return data
            })
    })
}

model.getData=(position) =>{
    console.log("model")
    return collection.getCollection().then((collection) => {
        return collection.find({position:position}).sort({"party":-1})
            .then((data) => {
                console.log(data)
                return data
            })
    })
}
model.updateData=(id) =>{
    console.log("model")
    return collection.getCollection().then((collection) => {
        return collection.findOneAndUpdate({_id:id},{$inc : { "votes" :1}})
            .then((data) => {
                console.log(data)
                return data
            })
    })
}
model.insertStudentData=(cdata) =>{
    console.log("model")
    console.log(cdata)
    return collection.getStudentCollection().then((collection) => {
        
            return collection.insertMany(cdata).then((response) => {
                if (response && response.length > 0) {
                    return response
                } else {
                    let err = new Error("Insertion failed")
                    err.status = 500
                    throw new Error
                }
            
        })
    })
}
model.getUser = (username) => {
    return collection.getStudentCollection().then((collection) => {
        return collection.findOne({ _id: username })
            .then((data) => {
                return data

            })
    })
}
model.getStudent = (username) => {
    return collection.getStudentCollection().then((collection) => {
        return collection.updateOne({_id:username},  {$set : {votingflag:1} })
            .then((data) => {
                console.log(data)
                return data

            })
    })
}

model.deleteCandidate = (tid) => {
    return collection.getCollection().then((collection) => {
        return collection.deleteOne({_id:tid}).then((resp) => {
            console.log(resp)
            console.log(tid)
            if (resp.deletedCount ==1) return "Success"
            else return null
        })
    })
}
module.exports = model