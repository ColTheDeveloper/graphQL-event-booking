import "./SingleBooking.css"

const SingleBooking=({title,date,price,onCancel})=>{

    return(
        <div className="single-event">
            <div>
                <h2>{title}</h2>
                <h3>${price} -{new Date(date).toLocaleDateString()}</h3>
            </div>
            <div>
                <button onClick={()=>onCancel()} className="btn">Cancel</button>
            </div>

        </div>
    )
}

export default SingleBooking