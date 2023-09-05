const userModel=require("../../models/userModel")
const eventModel=require("../../models/eventModel")

const user=async userId=>{
    try {
        const foundUser= await userModel.findById(userId)
        return({...foundUser._doc,createdEvent:event.bind(this,foundUser._doc.createdEvent)})
    } catch (error) {
        throw error
    }
}

const event=async eventIds=>{
    try {
        const foundEvents= await  eventModel.find({_id:{$in:eventIds}})

        const detailedEvent2= foundEvents.map((event)=>{
            return{
                ...event._doc,
                creator:user.bind(this,event.creator)
            }
        })
        return detailedEvent2
    } catch (error) {
        throw error
    }
}

const singleEvent=async eventId=>{
    try {
        const event= await eventModel.findById(eventId)
        return transformEvent(event)
    } catch (error) {
        throw error
    }
}

const transformEvent=(event)=>{
    return {
        ...event._doc,
        creator:user.bind(this,event.creator)
    }
}

module.exports={transformEvent,user,singleEvent}