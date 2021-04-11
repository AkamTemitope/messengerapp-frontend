import React, { useEffect, useState } from 'react'
import './InputSection.css'
import { GrEmoji } from 'react-icons/gr';
import { BiImageAdd } from 'react-icons/bi';
import { selectContacts, selectGroups, selectUser } from '../../../redux/Slices';
import { useDispatch, useSelector } from 'react-redux';
import { selectToggleConversation } from '../../../redux/Slices';
import { newContactMessage, newGroupMessage } from './../../../redux/actions/actions';
import Picker from 'emoji-picker-react';
function InputSection() {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const toggleConversation = useSelector(selectToggleConversation)
    const groups = useSelector(selectGroups)
    const contacts = useSelector(selectContacts)
    const [input, setinput] = useState("")
    const [conversation, setconversation] = useState({})
    const [showPicker, setshowPicker] = useState(false)
    useEffect(() => {
        if (toggleConversation.type === "contact") {
             const foundConversation =contacts.find( contact => contact._id === toggleConversation._id)
            setconversation(foundConversation)
        } 
        else {
            const foundConversation =groups.find( group => group._id === toggleConversation._id)
            setconversation(foundConversation) 
        }
        setinput("")
        
    }, [toggleConversation._id, toggleConversation.type, contacts, groups])

    const sendMessage = (e) => {
        e.preventDefault()
        if (input.trim()) {
            const id = toggleConversation._id
            const message = {
                from: user._id,
                body: input,
                timestamp: Date.now()
            }
            if (toggleConversation.type === "contact") {

                dispatch(newContactMessage(id, { message: message }, user))
                
            }
            else {
            
                dispatch(newGroupMessage(id, { message: message }, user))

            }
        }
        setinput("")
    }

    return (
        <>
            { conversation &&
            <div className="inputSection">
                {!conversation?.block?.status &&
                <>
                    <form>
                        <input type="text"  value={input}  placeholder="write message" onChange={(e) => { setinput(e.target.value) }} onClick={() => setshowPicker(false)} />
                        <button type="submit" onClick={sendMessage} >Send</button>
                    </form>
                    <div className="inputSection_icons">
                            <GrEmoji onClick={() => setshowPicker(!showPicker)} title="emoji" />
                            <div className="emojiPicker" style={{ display: showPicker? "inline" : "none" }} >
                            <Picker 
                                onEmojiClick={(event, emojiObject) => setinput(input + " " + emojiObject.emoji)}
                                disableSearchBar={true}
                             />

                            </div>
                            <BiImageAdd title="Not working yet" />
                    </div>
                </>
                }
                {conversation?.block?.status &&
                    <p style={{ fontSize: "1.3rem" }}>{conversation?.block?.from === user.email ? 
                        "Unblock contact to send messages" :
                        "You have been blocked"}
                    </p>

                }
                
            </div>
            }
        </>
    )
}



export default InputSection
