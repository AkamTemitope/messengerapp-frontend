import React, { useEffect, useState } from 'react'
import './ContactProfile.css'
import { CgClose } from 'react-icons/cg';
import { GoPrimitiveDot } from 'react-icons/go';
import { selectContacts, selectGroups, selectToggleConversation, setToggleConversation, 
    deleteAllMessages, updateBlockStatus } from '../../../redux/Slices';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/Slices';
import { deleteContactMessages, updateBlock } from '../../../redux/actions/actions';
import * as io from "../../../sockets/io"
import events from '../../../sockets/events';

function ContactProfile() {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const groups = useSelector(selectGroups)
    const contacts = useSelector(selectContacts)
    const toggleConversation = useSelector(selectToggleConversation)
    const [otherContact, setotherContact] = useState({})
    const [conversation, setconversation] = useState(null)

    useEffect(() => {
        if (toggleConversation.type === "contact") {
             const temp =contacts.find( contact => contact._id === toggleConversation._id)
            setconversation(temp)
            
        }
        
    }, [toggleConversation._id, toggleConversation.type, contacts, groups])

    useEffect( () => {

        if (conversation) {
            if (user._id !== conversation.members[0]._id) { 
                setotherContact(conversation.members[0]) 
            } 
            else { 
                setotherContact(conversation.members[1])  
            }
        }
    }
    ,[conversation, user._id])

    const handleBlock = () => {

        if (!conversation?.block?.status) {
            // console.log("Blocked")
            const newBlock = { from: user.email, status: true }
            dispatch(updateBlock(conversation._id, { block: newBlock }))
            dispatch(updateBlockStatus({ _id: conversation._id, block: newBlock }))
            io.send(events.updateBlock, { _id: conversation._id, block: newBlock })
        
        }
        else {
            // console.log("UnBlocked")
            const newBlock = { from: user.email, status: false }
            dispatch(updateBlock(conversation._id, { block: newBlock }))
            dispatch(updateBlockStatus({ _id: conversation._id, block: newBlock }))
            io.send(events.updateBlock, { _id: conversation._id, block: newBlock })

        }
    }

    // Delete All Conversation Messages     
    const [deleteMessagesDisplay, setdeleteMessagesDisplay] = useState("none")
    const DeleteContactMessages = () => {

        const DELETE = () => {

            dispatch(deleteContactMessages(conversation._id))
            dispatch(setToggleConversation({ ...toggleConversation, toggle: false }))
            dispatch(deleteAllMessages({ _id: conversation._id, type: "contact" }))
            io.send(events.deleteContactMessages, { _id: conversation._id, type: "contact" })
        }
        return(
            <div className="deleteMessages"  style={{ display: `${deleteMessagesDisplay}`}}>
                <span>Are you sure you wanna "DELETE ALL MESSAGES" &lt;&lt;{conversation?.groupname}&gt;&gt;?</span>
                <p onClick={() => DELETE() }>Yes</p>
                <p onClick={() => setdeleteMessagesDisplay("none")}>No</p>
            </div>
        )

    }

    return (
        <div className="contactProfile">
            <div className="contactProfile_top">
                <p>Contact info</p>
                <CgClose onClick={ () => dispatch(setToggleConversation({ ...toggleConversation, type:"contact", toggle: false}))}/>
            </div>
            <div className="contactProfile_scroll">
                <div className="contactProfile_middle">
                    <img src={otherContact.photoUrl} alt="" />
                    <p style={ {color: otherContact.is_active? "green" : "grey" } }>
                        <GoPrimitiveDot  />
                        {otherContact.is_active? "Online" : "Offline"}
                    </p>
                </div>
                <div className="contactProfile_details">
                    <p>{otherContact.username}</p>
                    <span>{otherContact.email}</span>
                </div>
                
                <div className="contactProfile_bottom">
                    {!conversation?.block?.status && <button className="contactProfile_block" onClick={handleBlock}>Block Contact</button>}
                    {conversation?.block?.status && conversation?.block?.from === user.email &&
                     <button className="contactProfile_block" onClick={handleBlock}>Unblock Contact</button>}
                     {conversation?.block?.status && conversation?.block?.from !== user.email &&
                     <h3>You have been <span style={{ fontSize: "1.1rem", color: "red"}}>"BLOCKED"</span> by {otherContact.username}</h3>}
                    
                    {conversation?.messages.length > 0 && !conversation?.block?.status && 
                    <button onClick={() => setdeleteMessagesDisplay("flex")}>Delete All Messages</button>}
                    <DeleteContactMessages />
                </div>
            </div>
        </div>
    )
}


export default ContactProfile
