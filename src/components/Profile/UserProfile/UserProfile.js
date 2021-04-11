import React, { useState } from 'react'
import './UserProfile.css'
import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../redux/Slices" 
import { auth } from "../../../firebase"
import { setToggleProfile } from '../../../redux/Slices';
import { updateUserName } from '../../../redux/actions/actions';
import { GoPrimitiveDot } from 'react-icons/go';



function UserProfile() {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [newName, setnewName] = useState("")
    const [editDisplay, seteditDisplay] = useState("none")

    const Logout = () => {
        dispatch(setToggleProfile(false))
        dispatch(logout())
        auth.signOut()
    }

    const changeName = (e) => {
        e.preventDefault()
        if (newName.trim()) {
            dispatch(updateUserName(user._id, { username: newName.trim() }, user))
            setnewName("")
            seteditDisplay("none")
        }

    }

    return (
        <div className="userProfile">
            <div className="userProfile_top">
                <p>Profile</p>
                <CgClose onClick={ (e) => {dispatch(setToggleProfile(false))}}/>
            </div>
            <div className="userProfile_middle">
                <img src={user.photoUrl} alt="" />
                <p style={ {color: user.is_active? "green" : "grey" } }>
                    <GoPrimitiveDot  />
                    {user.is_active? "Online" : "Offline"}
                </p>
            </div>
            <div className="userProfile_bottom">
                <form onSubmit={changeName} name="changeName" style={{ display: editDisplay }} >
                        <input value={newName} type="text"  placeholder="Enter name" onChange={ (e) => setnewName(e.target.value)} />
                        <button type="submit" >Rename</button>
                        <button onClick={() => { 
                            setnewName("")
                            seteditDisplay("none")}} >Cancel
                        </button>
                </form>
                <p>{user.username} <span onClick={() => seteditDisplay("flex")}>Edit</span></p>
                <span>{user.email}</span>
            </div>
            <button onClick={Logout} className="userProfile_logout">Logout</button>

        </div>
    )
}



export default UserProfile
