import React, { useEffect, useState } from 'react'
import './ContactConversation.css'
import { IoMdArrowDropright } from 'react-icons/io';
// import { GoPrimitiveDot } from 'react-icons/go';
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from '../../../redux/Slices';
import { selectToggleConversation, setToggleConversation } from '../../../redux/Slices';
import moment from "moment"




function ContactConversation( {contact}) {
    
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const toggleConversation = useSelector(selectToggleConversation)
    const [otherContact, setotherContact] = useState({})
   
    useEffect( () => {

        if (user._id !== contact.members[0]._id) { 
            setotherContact(contact.members[0]) 
        } 
        else { 
            setotherContact(contact.members[1])  
        }
        
    },[contact.members, user._id])

    return (
        <div className="contactConversation" 
            onClick={ () => { dispatch(setToggleConversation({ ...toggleConversation, _id: contact._id, type:"contact", toggle: false })) }}>
            <div className="contactConversation_left">
                <Avatar src={otherContact.photoUrl} />
            </div>
            <div className="contactConversation_right">
                <div className="contactConversation_right_top">
                    <p>{otherContact.username}</p>
                    <span>{contact.last_message && moment(contact.last_message.timestamp).calendar() }</span>
                    <IoMdArrowDropright title="Not working yet" />
                </div>
                <div className="contactConversation_right_bottom">
                    <p>{contact.last_message? contact.last_message.body : "No messages"}</p>
                    {/* <GoPrimitiveDot style={ {color: "green" } } /> */}
                </div>
            </div>
        </div>
    )
}

export default ContactConversation
