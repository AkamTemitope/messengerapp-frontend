import React, { useRef, useEffect, useState } from 'react'
import { selectToggleConversation } from '../../../redux/Slices'
import './ChatMessages.css'
import Message from './Message/Message'
import { useSelector } from 'react-redux';
import { selectContacts, selectGroups } from './../../../redux/Slices/userSlice';

function ChatMessages() {
    const messageRef = useRef(null);
    const groups = useSelector(selectGroups)
    const contacts = useSelector(selectContacts)
    const toggleConversation = useSelector(selectToggleConversation)
    const [conversation, setconversation] = useState({})
    
    useEffect(() => {
        if (toggleConversation.type === "contact") {
             const foundConversation =contacts.find( contact => contact._id === toggleConversation._id)
            setconversation(foundConversation)
            
        } 
        else {
            const foundConversation =groups.find( group => group._id === toggleConversation._id)
            setconversation(foundConversation) 
        }
        
    }, [toggleConversation._id, toggleConversation.type, contacts, groups])
    
    useEffect(() => {
        if (messageRef) {
            messageRef.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth', block: 'end',  smooth: true });
            });
        }
    
    }, [toggleConversation._id])

    return (
        <>
            {conversation && 
            <div className="chatMessages" ref={messageRef} >
                {conversation.messages && 
                conversation.messages.map( (message) => {
                    return <Message key={message._id} message={message}/>
                })}
            </div>
            }
        </>
    )
}

export default ChatMessages
