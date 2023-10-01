const userModel = require("../../models/userModel");
const bcrypt= require("bcryptjs")
const jwt=require("jsonwebtoken")

const createUser=async(args)=>{
    try {
        const foundUser=await userModel.findOne({email:args.userInput.email})
        if(foundUser) throw new Error("User already Existed")
        const salt= await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(args.userInput.password,salt)
        const createdUser=userModel({
            email:args.userInput.email,
            password:hashPassword
        })
        const newUser=await createdUser.save()
        const user=newUser._doc

        const token=jwt.sign(
            {userId:user._id,email:user.email},
            process.env.ACCESS_TOKEN,
            {expiresIn: "1h"}
        )

        return{
            userId:user._id,
            token:token,
            exp:1
        }
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

const login=async({email,password})=>{
    try {
        const foundUser=await userModel.findOne({email})
        if(!foundUser) throw new Error("User doesn't Exist")

        const passwordMatch= await bcrypt.compare(password, foundUser.password)
        if(!passwordMatch) throw new Error("Password is Incorrect")

        const token=jwt.sign(
            {userId:foundUser._id,email:foundUser.email},
            process.env.ACCESS_TOKEN,
            {expiresIn: "1h"}
        )

        return{
            userId:foundUser._id,
            token:token,
            exp:1
        }


    } catch (error) {
        throw error
        
    }
}

module.exports={createUser,login}