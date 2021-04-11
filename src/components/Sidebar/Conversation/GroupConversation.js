import React from 'react'
import "./GroupConversation.css"
import { IoMdArrowDropright } from 'react-icons/io';
// import { GoPrimitiveDot } from 'react-icons/go';
import { Avatar } from '@material-ui/core';
import { selectToggleConversation, setToggleConversation } from '../../../redux/Slices';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"


function GroupConversation( { group } ) {

    const dispatch = useDispatch()
    const toggleConversation = useSelector(selectToggleConversation)
    
    return (
        <div className="groupConversation"
            onClick={ () => {dispatch(setToggleConversation({ ...toggleConversation, _id: group._id, type: "group", toggle: false})) }}
            >
            <div className="groupConversation_left">
                <Avatar src="" />
            </div>
            <div className="groupConversation_right">
                <div className="groupConversation_right_top">
                    <p>{group.groupname}</p>
                    <span>{group.last_message && moment(group.last_message.timestamp).calendar()}</span>
                    <IoMdArrowDropright  onClick={() => { alert("Display more options") }} />
                </div>
                <div className="groupConversation_right_bottom">
                    <p>{group.last_message? group.last_message.body : "No messages"}</p>
                    {/* <GoPrimitiveDot style={ {color: "green", display: "inline" } } /> */}
                </div>
            </div>
        </div>
    )
}

export default GroupConversation
