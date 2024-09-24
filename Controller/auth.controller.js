// i need to write the controller / logic to register a user
const bcrypt = require("bcryptjs")
const user_model = require("../Models/user.model")
const secret = require("../Configs/auth.secret")
jwt = require("jsonwebtoken")
exports.signup = async (req, res) => {


    // logic to create the user

    // 1. read the request body

    const request_body = req.body

    // 2. insert the data in the user collection mongodb
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }


    try {

        const user_created = await user_model.create(userObj)

        //return this user

        const res_obj ={
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            created_At: user_created.createdAt,
            update_At: user_created.updatedAt
        }
        res.status(201).send(user_created)
    } catch (err) {
        console.log("error while registering the user", err)
        res.status(500).send({
            message: "some error happened while registering the user "
        })
    }
    //3. return the response back to the user
}

// code for sign in the app
exports.signin = async (req,res) =>{
    // check if the user id is present in the system
     await user_model.findOne({userId :req.body.userId})
     
     if(user == null){
        return res.status(400).send({
            message:"user id passed is not valid user id"
        })
     }

    //password is correct
 const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
 if(isPasswordValid){
    return res.status(401).send({
        message:"wrong password passed"
    })
 }

    //using jwt we will create the access token with a given ttl(time to leave) and return
     const token = jwt.sign({id: user.userId},secret.secret,{
        expiresIn : 120
     })

     res.status(200).send({
        name : user.name,
        userId: user.userId,
        email : user.email,
        userType: user.userType,
        accessToken : token
     })
    
}