import { useState } from "react"
import "./Auth.css"
import { AuthState } from "../../context/AuthContext"


const Auth=()=>{
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [isLogin,setIsLogin]=useState(true)
    const [isLoading,setIsLoading]=useState(false)
    const {setToken,setUserId}=AuthState()

    const handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        console.log(email+" "+password);

        const registerRequest={
            query:`
                mutation {
                    createUser(userInput:{email:"${email}" password:"${password}"}){
                        userId
                        token
                        exp
                    }
                }
            `
        }
        const loginRequest={
            query:`
                query {
                    login(email:"${email}" password:"${password}"){
                        userId
                        token
                        exp
                    }
                }
            `
        }

        const requestBody=isLogin?loginRequest:registerRequest

        fetch(import.meta.env.VITE_API_URL,{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.status !==200 && res.satus !==201){
                throw new Error("Failed") 
            }
            return res.json()
        }).then(resData=>{
            if(isLogin){
                setToken(resData.data.login.token)
                setUserId(resData.data.login.userId)
            }else{

                setToken(resData.data.createUser.token)
                setUserId(resData.data.createUser.userId)
            }
        }).catch(err=>console.log(err))

        setIsLoading(false)
    }

    return(
        <div className="Auth">
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <label htmlFor="email">E-mail:</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="example@domail.com" 
                        id="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-container">
                    <label htmlFor="Password">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="******" 
                        id="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                    />
                </div>
                {isLogin?
                    <div className="auth-submit">
                        <button className={isLoading?"disabled-btn":"submit-btn"} disabled={isLoading?true:false} type="submit">Login</button>
                        <a onClick={()=>setIsLogin(false)}>Switch To Register</a>
                    </div>
                    :
                    <div className="auth-submit">
                        <button className={isLoading?"disabled-btn":"submit-btn"} disabled={isLoading?true:false} type="submit">Register</button>
                        <a onClick={()=>setIsLogin(true)}>Switch To Login</a>
                    </div>
                }
            </form>
        </div>
    )
}

export default Auth