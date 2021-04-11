import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectToggleConversation, selectToggleProfile } from '../redux/Slices'
import ChatSection from './ChatSection/ChatSection'
import ContactProfile from './Profile/ContactProfile/ContactProfile'
import UserProfile from './Profile/UserProfile/UserProfile'
import Sidebar from './Sidebar/Sidebar'
import "../App/App.css"
import GroupProfile from './Profile/GroupProfile/GroupProfile'
import { selectContacts, selectGroups, selectUser, setContacts, setGroups } from '../redux/Slices'
import { fetchContact, fetchGroup } from '../redux/actions/actions'
import { RotateCircleLoading } from "react-loadingg"
import * as io from "../sockets/io"
import events from "../sockets/events"


function Chat() {
    
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const toggleProfile = useSelector(selectToggleProfile)
    const toggleConversation = useSelector(selectToggleConversation)
    const groups = useSelector(selectGroups)
    const contacts = useSelector(selectContacts)
    const [group, setgroup] = useState(null)
    const [contact, setcontact] = useState(null)
    const [loadingCounter, setloadingCounter] = useState(user.groups.length + user.contacts.length)


    useEffect(() => {

        io.connect(user._id, dispatch)
        io.send(events.sendMessage, user.username + " is connected to server")
        io.receive(events.receiveMessage, (data) =>console.log(data))
        io.updateOnlineStatus(events.updateOnlineStatus, user, dispatch)
        io.updateNewStatus(events.updateNewStatus, dispatch)
        io.editName(events.editName, dispatch)
        io.editSpecificGroupName(events.editGroupName, dispatch)
        io.editSpecificGroupDes(events.editGroupDescription, dispatch)
        io.newMessage(events.newMessage, dispatch)
        io.blockStatus(events.updateBlock, dispatch)
        io.addNewContact(events.addNewContact, user, dispatch)
        io.addMember(events.addNewMember, dispatch)
        io.onLeaveGroup(events.leaveGroup, dispatch)
        io.connectToNewGroup(events.connectMemberToGroup, user, dispatch)
        io.deleteMessages(events.deleteContactMessages, dispatch)
        io.deleteMessages(events.deleteGroupMessages, dispatch)
        io.deleteGroup(events.deleteGroup, dispatch)

    }, [dispatch])

    useEffect(() => {

        // fetch all contacts
        if (user.contacts) {
            user.contacts.forEach((contact_id) => {
               dispatch(fetchContact(contact_id, user, setcontact))
           })
        }
        // fetch all groups
        if (user.groups) {
            user.groups.forEach((group_id) => { 
                dispatch(fetchGroup(group_id, user, setgroup))
            })
        }


    }, [dispatch])

    useEffect(() => {
       if (contact) {
            dispatch(setContacts([...contacts, contact]))
            setloadingCounter(loadingCounter -1)
        }

    }, [contact, dispatch])


    useEffect(() => {
       if (group) {
            dispatch(setGroups([...groups, group]))
            setloadingCounter(loadingCounter -1)
       }

    }, [group, dispatch])


    if (loadingCounter > 0) {
        return <RotateCircleLoading color="#0E59ED"  />
    }

    return (

        <div className="appChat">
            {!toggleProfile? <Sidebar />: <UserProfile />}

            {!toggleConversation.toggle? <ChatSection />: 
            (toggleConversation.type === "contact"? <ContactProfile /> : <GroupProfile /> ) 
            }
        
        </div>
    )
}

export default Chat
