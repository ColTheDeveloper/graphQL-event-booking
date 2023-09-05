const { createUser, login } = require("./AuthResolver")
const { bookEvent, cancelBooking, getAllBookings } = require("./bookingResolver")
const { createEvent, getAllEvents } = require("./eventResolver")



const resolver={
    login:login,
    events:getAllEvents,
    createEvent:createEvent,
    bookings:getAllBookings,
    createUser:createUser,
    bookEvent: bookEvent,
    cancelBooking: cancelBooking
}

module.exports=resolver