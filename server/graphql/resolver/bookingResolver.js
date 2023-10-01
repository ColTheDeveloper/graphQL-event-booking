const bookingModel=require("../../models/bookingModel")
const eventModel=require("../../models/eventModel")
const { user, singleEvent } = require("./utils")


const bookEvent=async (args,req)=>{
    if(!req.isAuth) throw new Error("Unauthorized")
    try {
        const fetchedEvent= await eventModel.findOne({_id: args.eventId})
        const newBooking=new bookingModel({
            user:req.userId,
            event:fetchedEvent
        })
        const booking=await newBooking.save()

        return{
            ...booking._doc,
            user:user.bind(this,booking._doc.user),
            event:singleEvent.bind(this,booking._doc.event),
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString()    
        }
    } catch (error) {
        throw error
        
    }
}

const cancelBooking=async (args,req)=>{
    if(!req.isAuth) throw new Error("Unauthorized")
    try {
        const booking= await bookingModel.findById(args.bookingId).populate("event")
        
        const event={
            ...booking.event._doc,
            creator:user.bind(this,booking.event._doc.creator)
        }
        await bookingModel.deleteOne({_id:args.bookingId})

        return event
    } catch (error) {
        throw error
    }
}

const getAllBookings=async (args,req)=>{
    try {
        const bookings=await bookingModel.find({user:req.userId})

        return bookings.map((booking)=>{
            return{
                ...booking._doc,
                user:user.bind(this,booking._doc.user),
                event:singleEvent.bind(this,booking._doc.event),
                createdAt: new Date(booking._doc.createdAt).toISOString(),
                updatedAt: new Date(booking._doc.updatedAt).toISOString()
            }
        })
    } catch (error) {
        throw error
    }
}

module.exports={bookEvent,cancelBooking,getAllBookings}