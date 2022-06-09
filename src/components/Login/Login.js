import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import {  logout, setError, setIsLoggedIn, } from "../../redux/Slices/userSlice" 
import './Login.css'
import { auth, provider } from "../../firebase"
import { fetchCreateUser } from '../../redux/actions/actions'
import { RotateCircleLoading } from "react-loadingg"
import { useAuthState } from "react-firebase-hooks/auth"

function Login() {

    const dispatch = useDispatch()
    const [ loading ] = useAuthState(auth)

    const signIn = () => {
        
        dispatch(setIsLoggedIn(false))
        auth.signInWithPopup(provider)
        .catch( (error) => dispatch(setError({ loginError: error, isLoggedIn: false })))
    }

    useEffect(() => {
        auth.onAuthStateChanged( (authUser) =>  {
            if (authUser){
                const req = {
                    id: authUser.uid, 
                    username: authUser.displayName,
                    email: authUser.email,
                    photoUrl: authUser.photoURL,
                }
                dispatch(fetchCreateUser(req))

            }
            else {
                dispatch(logout())
            }
            
        } )

    }, [dispatch])

    if (loading) {
        return <RotateCircleLoading color="#0E59ED"  />
    }

    return (
        <div>       
            <div className="login">
                <img src="https://i.postimg.cc/zXqXxPvQ/logoblue-clear.png" alt="logo"/>
                {/* <h1>Welcome to webChatT</h1> */}
                <div className="login-button">
                    {/* <p>Sign-In</p> */}
                    <button onClick={signIn}>Sign-In with google</button>
                </div>  
            </div>
        </div>
    )
}

export default Login
