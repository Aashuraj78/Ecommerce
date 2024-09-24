//starting file of the project

const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const app = express()
const db_config = require("./Configs/db.config")
const server_config= require("./Configs/server.config")
const user_model = require("./Models/user.model")
app.use(express.json())


// create an admin user at the starting of the application
// if not already present

// connection with mongo db
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error",() =>{
    console.log("error while connecting to the mongoDB")
})

db.once("open",() =>{
    console.log("connected to MongoDB")
    init()
})

async function init(){
    try{
        let user = await user_model.findOne({userId: "admin"})

    if(user){
        console.log("Admin is already present")
        return
    }

    }catch(err){
        console.log("error while reading the data",err)

    }
    

    try{
       user = await user_model.create({
        name : "Ayush kumar",
        userId : "admin",
        email: "arnavraj@763gmail.com",
        usertype: "ADMIN",
        password:bcrypt.hashSync("ayush008" ,8)
       })
       console.log("admin created", user)
    }catch(err){
        console.log("error while creating admin",err)
    }
}
// stitch the route to the server
// call routes and passing app object
require("./Routes/auth.route")(app)  

// start the server

app.listen(server_config.PORT, ()=>{
    console.log("server started at port number" , server_config.PORT)
})