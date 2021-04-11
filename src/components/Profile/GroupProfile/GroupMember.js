import React from 'react'
import './GroupMember.css'
import { Avatar } from '@material-ui/core';
import { GoPrimitiveDot } from 'react-icons/go';

function GroupMember( { member }) {

    return (
        <div className="groupMember" >
            <Avatar src={member.photoUrl} />
            <p>{member.username}</p>
            <GoPrimitiveDot style={ {color: member.is_active? "green" : "grey" } } />
  
        </div>
    )
}

export default GroupMember
