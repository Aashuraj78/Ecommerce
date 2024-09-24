// post call



// i need to intercept this
const authController = require("../Controller/auth.controller")
const authMw = require("../Middleware/auth.mw")
const authmw = require("../Middleware/auth.mw")


module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMw.verifysignupBody],authController.signup)

    // route for post call signin
    app.post("/ecomm/api/v1/auth/signin",authController.signin)
}





