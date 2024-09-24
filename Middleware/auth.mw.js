// // create a middleware will check if the request body is proper and correct


const verifysignupBody = async(req,res,next) =>{
    try{
        // check for the name
        if(!req.body.name){
            return res.status(400).send({
                message: "Failed :Name was not provided in the request body"
            })
        }

        // check for the email
        if(!req.body.email){
            return res.status(400).send({
                message: "Failed :email was not provided in the request body"
            })
        }

        // check for the userid already present
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed :userId was not provided in the request body "
            })
        }
        // check whether user with the same user id already present

        const user = await user_model.findOne({userId:req.body.userId})

        if(user){
            return res.status(400).send({
                message: "Failed :user with the same userid already present "
            })
        }

        next()
    }catch(err){
        console.log("error while validating the request object",err)
        res.status(500).send({
            message: "error while validating the request body"
        })
    }
}

module.exports = {
    verifysignupBody : verifysignupBody 
}