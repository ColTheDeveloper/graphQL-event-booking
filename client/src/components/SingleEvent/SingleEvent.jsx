import { useState } from "react"
import { AuthState } from "../../context/AuthContext"
import Modal from "../Modal/Modal"
import "./SingleEvent.css"

const SingleEvent=({event})=>{
    const {userId,token}=AuthState()
    const [showEvent, setShowEvent]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    const [selectedEvent, setSelectedEvent]=useState({})

    const handleBooking=(eventId)=>{
        setIsLoading(true)
        const reqBody={
            query:`
                mutation{
                    bookEvent(eventId:"${eventId}"){
                        _id
                    }
                }
            `
        }

        fetch(import.meta.env.VITE_API_URL,{
            method:"POST",
            body:JSON.stringify(reqBody),
            headers:{
                'Content-Type':"application/json",
                "Authorization":"Bearer "+token
            }
        }).then(res=>{
            if(res.status !==200){
                throw new Error("Failed")
            }
            return res.json()
        }).then(resData=>{
            console.log(resData)
            setIsLoading(false)
            setShowEvent(false)
        }).catch(err=>console.log(err))

    }

    const handleSingleEvent=(event)=>{
        setSelectedEvent(event)
        setShowEvent(true)
    }

    return(
        <div  className="single-event">
            <div>
                <h2>{event.title}</h2>
                <p>${event.price} - {new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div>
                {userId===event.creator._id?
                    <p>You're the owner of this event</p>
                    :
                    <button onClick={()=>handleSingleEvent(event)} className="btn">View Details</button>
                }
            </div>
            {showEvent&&
                <div className="modal-container">
                    <Modal title="Event Details" isLoading={isLoading} confirmText="Book" onConfirm={()=>handleBooking(event._id)} close={()=>setShowEvent(false)}>
                        <div className="event-details">
                            <h2>{selectedEvent.title}</h2>
                            <h2>{selectedEvent.price} - {new Date(selectedEvent.date).toLocaleString()}</h2>
                            <p>{selectedEvent.description}</p>
                        </div>
                    </Modal>

                </div>
            }
        </div>
    )
}
export default SingleEvent