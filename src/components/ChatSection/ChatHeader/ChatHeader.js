import React, { useEffect, useState } from 'react'
import "./ChatHeader.css"
import { GoPrimitiveDot } from 'react-icons/go';
import { Avatar } from '@material-ui/core';
import { CgMoreVertical } from 'react-icons/cg';
import { selectToggleConversation, setToggleConversation } from '../../../redux/Slices';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/Slices';
import { selectContacts, selectGroups } from './../../../redux/Slices/userSlice';

function ChatHeader() {
    
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const toggleConversation = useSelector(selectToggleConversation)
    const groups = useSelector(selectGroups)
    const contacts = useSelector(selectContacts)
    const [conversation, setconversation] = useState(null)
    const [name, setname] = useState("")
    const [photoUrl, setphotoUrl] = useState("")
    const [is_active, setis_active] = useState(false)

    useEffect(() => {
        if (toggleConversation.type === "contact") {
            setconversation(contacts.find( contact => contact._id === toggleConversation._id))

        } 
        else {
            setconversation(groups.find( group => group._id === toggleConversation._id)) 
        }

    }, [toggleConversation._id, toggleConversation.type, contacts, groups])

    useEffect(() => {
        if (conversation) {
            if (toggleConversation.type === "contact"){
                if (user._id !== conversation.members[0]._id) {
                    setname(conversation.members[0]?.username) 
                    setphotoUrl(conversation.members[0]?.photoUrl) 
                    setis_active(conversation.members[0]?.is_active)
                } 
                else { 
                    setname(conversation.members[1]?.username) 
                    setphotoUrl(conversation.members[1]?.photoUrl) 
                    setis_active(conversation.members[1]?.is_active)
                }
            }
            else {
                setname(conversation?.groupname) 
                setphotoUrl(conversation?.photoUrl) 
            }
        }
    }, [conversation, toggleConversation.type, user._id])

    return (
        <>
            {conversation && 
            <div className="chatHeader">
                <div className="chatHeader_avatar" onClick={ () => dispatch(setToggleConversation({ ...toggleConversation, toggle: true}))}>
                    <Avatar src={photoUrl}/>
                    <span>{name} 
                        {toggleConversation.type === "contact" && 
                        <GoPrimitiveDot style={ {color: is_active? "green" : "grey" } } />}
                    </span>
                </div>
                <CgMoreVertical />
            </div>
            }
        </>
    )
}

export default ChatHeader
