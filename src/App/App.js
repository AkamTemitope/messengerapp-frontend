import React, { useEffect } from 'react'
import "./App.css"
import Chat from './../components/Chat';
import Login from './../components/Login/Login';
import { selectUser } from '../redux/Slices';
import { useSelector } from 'react-redux';
import * as io from "../sockets/io"


function App() {
    const user = useSelector(selectUser)

    
    useEffect(() => {
        return () =>  io.disconnect()
    }, [])

    return (
        <div className="app">
            { !user? <Login/> : <Chat />  }
        </div>
    )
}

export default App



