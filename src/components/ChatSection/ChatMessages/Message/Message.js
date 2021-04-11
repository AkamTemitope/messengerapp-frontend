import React from 'react'
import './Message.css'
import { selectUser } from '../../../../redux/Slices';
import { useSelector } from 'react-redux';
import moment from "moment"
function Message( {message}) {
    const user = useSelector(selectUser)

    return (
        <div className={`message ${user._id !== message.from?._id && "left"}`}>
            <div className="message_details">
                <p>{message.from?.username}</p>
                <span>{moment(message.timestamp).calendar()}</span>
            </div>
            <p>{message.body}</p>
        </div>
    )
}

export default Message
