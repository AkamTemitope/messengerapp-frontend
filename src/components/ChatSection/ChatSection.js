import React from 'react'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatMessages from './ChatMessages/ChatMessages'
import InputSection from './InputSection/InputSection'
import './ChatSection.css'
import { selectToggleConversation, selectUser } from '../../redux/Slices'
import { useSelector } from 'react-redux'
            

function ChatSection() {
    const toggleConversation = useSelector(selectToggleConversation)
    const user = useSelector(selectUser)

    return (
        < >
        {!toggleConversation.type? 
        <div className='chatSection_empty'>
            <h1>Welcome, {user.username}<br/>
                Click on conversation to get started
            </h1>
            
        </div>:
        <div className='chatSection'>
            <ChatHeader />
            <ChatMessages />
            <InputSection />
        </div>
        }
        </>
        
    )
}
 
export default ChatSection
