const jwt = require("jsonwebtoken")

const checkAuth=async(req,res,next)=>{
    const authHeader=req.header.authorization || req.header.authorization

    if(!authHeader){
        req.isAuth=false
        return next()
    }

    const token= authHeader.split(" ")[1]

    if(!token || token==""){
        req.isAuth=false
        return next()
    }

    try {
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN)

        if(!decodedToken){
            req.isAuth=false
            return next()
        }

        req.isAuth=true
        req.userId=decodedToken.userId

        next()
    } catch (error) {
        console.log(error)
        throw error
        
    }
}

module.exports=checkAuth