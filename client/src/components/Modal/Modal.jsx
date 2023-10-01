import { AuthState } from "../../context/AuthContext"
import "./Modal.css"

const Modal=({title,children,isLoading,close,onConfirm,confirmText})=>{
    const {token}=AuthState()
    return(
        <div className="modal">
            <header><h1>{title}</h1></header>
            <hr className="modal-line" />
            <section className="modal-content">
                {children}
            </section>
            <section className="modal-actions">
                <button onClick={()=>close()} className="btn">Close</button>
                {token?(
                    <button onClick={()=>onConfirm()} disabled={isLoading?true:false} className="btn">{confirmText}</button>
                ):(
                    <button onClick={()=>close()}  className="btn">Confirm</button>
                )
                }
            </section>
        </div>
    )
}

export default Modal