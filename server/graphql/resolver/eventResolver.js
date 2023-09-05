const eventModel=require("../../models/eventModel")
const userModel=require("../../models/userModel")
const { transformEvent } = require("./utils")

const createEvent=async(args,req)=>{
    if(!req.isAuth) throw new Error("Unauthorized")
    try {
        const event=new eventModel({
            title:args.eventInput.title,
            description:args.eventInput.description,
            price: args.eventInput.price,
            date: args.eventInput.date,
            creator:req.userId
        })
        const newEvent=await event.save()
        const foundUser= await userModel.findById(req.userId)
        if(!foundUser) throw new Error("Event Doesn't have an Author")

        foundUser.createdEvent.push(newEvent)
        await foundUser.save()
        
        return transformEvent(newEvent)
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

const getAllEvents=async()=>{
    try {
        const events=await eventModel.find()
        const detailedEvent= events.map((event)=>{
            return transformEvent(event)
        })
        return detailedEvent
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={createEvent,getAllEvents}