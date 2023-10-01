import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { AuthState } from "../../context/AuthContext";
import SingleBooking from "../../components/SingleBooking/SingleBooking";



const Booking=()=>{
    const [bookings,setBookings]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const {token}=AuthState()

    const getMyBookings=()=>{
        setIsLoading(true)
        const reqBody={
            query:`
                query{
                    bookings{
                        _id
                        event{
                            _id
                            title
                            price
                            date
                        }
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
            setBookings(resData.data.bookings)
            setIsLoading(false)
        }).catch(err=>console.log(err))
    }

    const cancelBooking=(bookingId)=>{
        setIsLoading(true)
        const reqBody={
            query:`
                mutation{
                    cancelBooking(bookingId:"${bookingId}"){
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
            setBookings((prevs)=>{
                return prevs.filter(prev=>prev._id!=bookingId)
            })
            setIsLoading(false)
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        getMyBookings()
    },[])
    return(
        <div className="event-container">
            {isLoading?(
                <Spinner />
            ):
                bookings?.map((booking)=>{
                    return(
                        <SingleBooking 
                            title={booking.event.title}
                            date={booking.event.date}
                            price={booking.event.price}
                            bookingId={booking._id}
                            key={booking._id}
                            onCancel={()=>cancelBooking(booking._id)}
                        />
                    )
            })}
        </div>
    )
}

export default Booking;