const dbLayer = require("../model/candidatelist")


let service = {}

service.insertScript = () => {
    return dbLayer.insertScript().then((data) => {
        return data
    })
}
service.insertStudentScript = () => {
    return dbLayer.insertStudentScript().then((data) => {
        return data
    })
}

service.createList=(listObj) => {
    console.log("service")
    console.log(listObj)
    return dbLayer.insertData(listObj).then((listObj) =>{
        return listObj
    })
}
service.getList=(position)=>{
    console.log("service")
    return dbLayer.getData(position).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("No details found")
            err.status = 404
            throw err
        }
    })
}
service.updateList=(id)=>{
    console.log("service")
    return dbLayer.updateData(id).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("No details found")
            err.status = 404
            throw err
        }
    })
}
service.getCandList=()=>{
    console.log("service")
    return dbLayer.getAllData().then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("No details found")
            err.status = 404
            throw err
        }
    })
}
service.getResult=()=>{
    console.log("service")
    return dbLayer.getResult().then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("No details found")
            err.status = 404
            throw err
        }
    })
}
service.createStudentList=(listObj) => {
    console.log("service")
    console.log(listObj)
    return dbLayer.insertStudentData(listObj).then((listObj) =>{
        return listObj
    })
}
service.deleteCandidate = (tid) => {
    return dbLayer.deleteCandidate(tid).then((resp) => {
        console.log(resp)
        if (resp) return resp
        else {
            let err = new Error("No Such Candidate");
            err.status = 500;
            throw err;
        }
    })
}
service.validateLogin = (loginObj) => {
    
    return dbLayer.getUser(loginObj._id).then((response) => {
        if (!response) {
            let err = new Error("You have not registered")
            err.status = 401
            throw err
        }
        else if (response.password != loginObj.password) {
            let err = new Error("Incorrect Password")
            err.status = 402
            throw err
        }
        else if(response.votingflag==1){
            let err=new Error("You have Already Voted")
            err.status=403
            throw err
        } else {
            console.log(response)
            return response
        }
    })
}
service.validateVote= (loginObj) => {
    
    return dbLayer.getStudent(loginObj).then((response) => {
        console.log(response)
        return response
        
    })
}


module.exports = service
