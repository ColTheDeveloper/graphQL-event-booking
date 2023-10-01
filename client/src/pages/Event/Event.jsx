import "./Event.css"
import Modal from "../../components/Modal/Modal"
import { useEffect, useState } from "react"
import { AuthState } from "../../context/AuthContext"
import SingleEvent from "../../components/SingleEvent/SingleEvent"
import Spinner from "../../components/Spinner/Spinner"


const Event=()=>{
    const [isCreatingEvent, setIsCreatingEvent]=useState(false)
    const [events,setEvents]=useState()
    const [isLoading,setIsLoading]= useState(false)
    const {token}=AuthState()
    const [eventForm,setEventForm]=useState({
        title:"",
        description:"",
        price:0,
        date:""
    })

    const createEvent=()=>{
        const reqBody={
            query:`
                mutation{
                    createEvent(eventInput:{title:"${eventForm.title}" description:"${eventForm.description}" price:${parseFloat(eventForm.price)} date:"${eventForm.date}"}){
                        _id
                        title
                        description
                        date
                        price
                        creator{
                            _id
                            email
                        }
                    }
                }
            `
        }
        fetch(import.meta.env.VITE_API_URL,{
            method:"POST",
            body:JSON.stringify(reqBody),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        }).then(res=>{
            if(res.status !==200 && res.satus !==201){
                throw new Error("Failed") 
            }
            return res.json()
        }).then(resData=>{
            console.log(resData)
            setIsCreatingEvent(false)
        }).catch(err=>console.log(err))


    }

    const getAllEvents=()=>{
        setIsLoading(true)
        const reqBody={
            query:`
                query{
                    events{
                        _id
                        title
                        price
                        date
                        description
                        creator{
                            _id
                            email
                        }
                    }
                }
            `
        }

        fetch(import.meta.env.VITE_API_URL,{
            method:"POST",
            body:JSON.stringify(reqBody),
            headers:{
                'Content-Type':"application/json"
            }
        }).then(res=>{
            if(res.status !==200){
                throw new Error("Failed")
            }
            return res.json()
        }).then(resData=>{
            setEvents(resData.data.events)
            setIsLoading(false)
        }).catch(err=>console.log(err))

    }

    const handleChange=(e)=>{
        setEventForm({...eventForm,[e.target.name]:e.target.value})
    }

    useEffect(()=>{

        getAllEvents()

    },[])

    
    return(
        <div className="Event">
            {token&&
                <div className="event-first-section">
                    <p>Share your own events!</p>
                    <button onClick={()=>setIsCreatingEvent(true)} className="btn">
                        Create Event
                    </button>
                </div>
            }
            {isCreatingEvent&&
                <div className="modal-container">
                    <Modal title="Create Event" confirmText="Create" onConfirm={createEvent} close={()=>setIsCreatingEvent(false)}>
                        <form>
                            <div className="form-container">
                                <label htmlFor="title">Title:</label>
                                <input 
                                    type="text" 
                                    id="title"
                                    name="title"
                                    placeholder="title"
                                    value={eventForm.title}
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="form-container">
                                <label htmlFor="description">Description:</label>
                                <textarea 
                                    type="text" 
                                    id="description"
                                    name="description"
                                    value={eventForm.description}
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="form-container">
                                <label htmlFor="price">Price:</label>
                                <input 
                                    type="number" 
                                    id="price"
                                    name="price"
                                    value={eventForm.price}
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="form-container">
                                <label htmlFor="date">Date:</label>
                                <input 
                                    type="datetime-local" 
                                    name="date"
                                    id="date"
                                    value={eventForm.data}
                                    onChange={handleChange} 
                                />
                            </div>
                            
                        </form>
                    </Modal>
                </div>
            }
            {isLoading?(
                <Spinner />
            ):(
                <div className="event-container">
                    {events?.map((event)=>{
                        return(
                            <SingleEvent 
                                key={event._id}
                                event={event}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Event