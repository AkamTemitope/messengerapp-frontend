import React, { useEffect, useState } from 'react'
import './GroupProfile.css'
import { CgClose } from 'react-icons/cg';
import GroupMember from './GroupMember';
import { selectGroups, selectToggleConversation, selectUser, 
    deleteAllMessages, setToggleConversation, removeGroup, updateGroup } from '../../../redux/Slices';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"
import { addMember, deleteGroup, deleteGroupMessages, deleteMember, fetchUserByEmail, updateDescription, updateName, userExists } from '../../../redux/actions/actions';
import * as io from "../../../sockets/io"
import events from '../../../sockets/events';


function GroupProfile() {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const groups = useSelector(selectGroups)
    const toggleConversation = useSelector(selectToggleConversation)
    const [conversation, setconversation] = useState(null)
    const [addMemberDisplay, setaddMemberDisplay] = useState("none")
    const [newDescription, setnewDescription] = useState("")
    const [newName, setnewName] = useState("")
    
    useEffect(() => {
        if (toggleConversation.type === "group") {
            const temp = groups.find( group => group._id === toggleConversation._id)
            setconversation(temp) 
        } 
        
    }, [toggleConversation._id, toggleConversation.type, groups, groups.members])
    

    // Leave Group
    const [leaveGroupDisplay, setleaveGroupDisplay] = useState("none")
    const LeaveGroup = () => {

        const LEAVE = () => {
            dispatch(deleteMember(conversation?._id, user._id))
            let members = []
            conversation.members.forEach( member => {
                if (member._id !== user._id) {
                    members.push(member)
                }
            })
            
            dispatch(removeGroup({ _id: conversation._id }))
            io.send(events.leaveGroup, { _id: conversation._id, group: {...conversation, members: members } })
            dispatch(setToggleConversation({ ...toggleConversation, type: "", _id: null, toggle: false }))

        }
        
        return (
            <div className="groupProfile_bottom_LD"  style={{ display: `${leaveGroupDisplay}`}}>
                <span>Are you sure you wanna leave &lt;&lt;{conversation?.groupname}&gt;&gt;?</span>
                <p onClick={() => LEAVE() }>Yes</p>
                <p onClick={() => setleaveGroupDisplay("none")}>No</p>
            </div>
        )

    }

    // Delete Group
    const [deleteGroupDisplay, setdeleteGroupDisplay] = useState("none")
    const DeleteGroup = () => {

        const DELETE = () => {
            dispatch(deleteGroup(conversation._id))
            io.send(events.deleteGroup, { _id: conversation._id })
            dispatch(removeGroup({ _id: conversation._id }))
            dispatch(setToggleConversation({ ...toggleConversation, type: "", _id: null, toggle: false }))
        }

        return (
            <div className="groupProfile_bottom_LD"  style={{ display: `${deleteGroupDisplay}`}}>
                <span>Are you sure you wanna "DELETE" &lt;&lt;{conversation?.groupname}&gt;&gt;?</span>
                <p onClick={() => DELETE() }>Yes</p>
                <p onClick={() => setdeleteGroupDisplay("none")}>No</p>
            </div>
        )

    }

    // Delete All Group Messages
    const [deleteGroupMessagesDisplay, setdeleteGroupMessagesDisplay] = useState("none")
    const DeleteGroupMessages = () => {

        const DELETE = () => {
            dispatch(deleteGroupMessages(conversation?._id))
            setdeleteGroupMessagesDisplay("none")
            dispatch(setToggleConversation({ ...toggleConversation, toggle: false }))
            dispatch(deleteAllMessages({ _id: conversation._id, type: "group" }))
            io.send(events.deleteGroupMessages, { _id: conversation._id, type: "group" })

        }

        return (
            <div className="groupProfile_bottom_LD"  style={{ display: `${deleteGroupMessagesDisplay}`}}>
                <span>Are you sure you wanna "DELETE  ALL MESSAGES"?</span>
                <p onClick={() => DELETE() }>Yes</p>
                <p onClick={() => setdeleteGroupMessagesDisplay("none")}>No</p>
            </div>
        )

    }
    
    // Edit Group Description
    const [editDesDisplay, seteditDesDisplay] = useState("none")
    const changeDescription = (e) => {
        e.preventDefault()
        if (newDescription.trim()) {
            dispatch(updateDescription(conversation._id, { description: newDescription.trim() }))
            setnewDescription("")
            seteditDesDisplay("none")
        }

    }

    //Edit Group Name
    const [editNameDisplay, seteditNameDisplay] = useState("none")
    const changeGroupName = (e) => {
        e.preventDefault()
        if (newName.trim()) {
            dispatch(updateName(conversation._id, { groupname: newName.trim() }))
            setnewName("")
            seteditNameDisplay("none")
        }

    }

    return (
        <>
            {conversation && 
            <div className="groupProfile">
                <div className="groupProfile_top">
                    <p>Group info</p>
                    <CgClose onClick={ () => dispatch(setToggleConversation({ ...toggleConversation, type:"group", toggle: false}))}/>
                </div>

                <div className="groupProfile_scroll">

                    <div className="groupProfile_middle">
                        <img src={conversation.photoUrl} alt="" />
                        <div className="groupProfile_info">
                            <p>{conversation.groupname}<span  onClick={() => seteditNameDisplay("flex")} >Edit</span></p>
                            <span>created: {moment(conversation.created_at).calendar()}</span>
                        </div>

                        <form onSubmit={changeGroupName} name="changeName" style={{ display: editNameDisplay }} >
                            <input value={newName} 
                                type="text" placeholder="Enter name"
                                onChange={ (e) => setnewName(e.target.value)}   />
                            <button type="submit" >Rename</button>
                            <button onClick={() => { 
                                setnewName("")
                                seteditNameDisplay("none")}} >Cancel</button>
                        </form>
                    </div>

                    <div className="groupProfile_details">
                        <h5>Description <span onClick={() => seteditDesDisplay("flex")}>Edit</span></h5> 
                        <span>
                            {conversation.description? conversation.description : "No Description"}
                        </span>

                        <form onSubmit={changeDescription} name="changeDescription" style={{ display: editDesDisplay }} >
                            <textarea value={newDescription} spellCheck 
                                type="text" rows="5" name="Description" 
                                placeholder="Enter description"
                                onChange={ (e) => setnewDescription(e.target.value)}   />
                            <button type="submit" >Edit</button>
                            <button onClick={() => { 
                                setnewDescription("")
                                seteditDesDisplay("none")}} >Cancel</button>
                        </form>
                    </div>
                    <span>Group members</span>

                    <div className="groupProfile_members">
                        {conversation.members.map( member => <GroupMember key={member?._id}  member={member}/>)}
                        
                    </div>
                    
                    <div className="groupProfile_bottom">
                        <AddMember group={conversation} addMemberDisplay={addMemberDisplay} setaddMemberDisplay={setaddMemberDisplay} />
                        <button onClick={() => setaddMemberDisplay("flex")}>Add Member </button>

                        {conversation.members.length > 1 && 
                        <button onClick={() => setleaveGroupDisplay("flex")}>Leave Group</button>}
                        <LeaveGroup />

                        {conversation?.messages.length > 0 && 
                        <button className="groupProfile_delete" onClick={() => setdeleteGroupMessagesDisplay("flex")}>Delete All Messages</button>}
                        <DeleteGroupMessages />

                        <button className="groupProfile_delete" onClick={() => setdeleteGroupDisplay("flex")}>Delete Group</button>
                        <DeleteGroup />
                    </div>
                </div>
            </div>
            }
        </>
    )
}


function AddMember( {group, addMemberDisplay, setaddMemberDisplay}) {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [email, setemail] = useState("")
    const [exist, setexist] = useState("")
    const [result, setresult] = useState(null)
    const [message, setmessage] = useState("")

    const handleSearchContact = (e) => {
        e.preventDefault()
        dispatch(userExists(email, setresult))
    }

    const handleAddMember = () => {
        dispatch(fetchUserByEmail(email, setresult))
    }
    
    useEffect(() => {

        if (result === true) {
            setexist("yes")
            console.log("result true")
            console.log(result)
            setmessage("User exists")
        }
        if (result === false) {
            setexist("no")
            setmessage("User doesn't exist")
            console.log("result false")
            console.log(result)
        }
        
        if (result?.email === email && result?.email !== user.email ) {
            const alreadyExist = group.members.find( (member) => (member._id === result._id ))
            if (!alreadyExist) {
                dispatch(addMember(group._id, { _id : result._id }))
                const members = [...group.members, result]

                dispatch(updateGroup({ _id: group._id, group: {...group, members: members } }))
                io.send(events.addNewMember, { _id: group._id, group: {...group, members: members }, member: result })
                console.log("Member info sent to server")
                setexist("done")
                setemail("")
                setmessage("Member Added")

            }
            else {
                console.log("Member not added as already in group")
                setexist("done")
                setemail("")
                setmessage("Member Already Part Of Group")
            }
            
        }
        if (result?.email === user.email ) {
            console.log("You are a member of this group")
            setexist("done")
            setemail("")
            setresult(null)
            setmessage("You are a member of this group ")
        }
     
    }, [result, email, user, group, group._id, group.members, dispatch])

    return (
        <div className="addMember" style={{ display: `${addMemberDisplay}` }}>
            <form onSubmit={handleSearchContact}>
                <input value={email} style={{ display: exist === ""? "inline" : "none" }}
                    onChange={ (e) => setemail(e.target.value.trim())} 
                    required type="email"  
                    title="format: xxx@gmail.com"
                    placeholder="exple@gmail.com" />
                {email.length > 5 && 
                <button type="submit" style={{ display: exist === ""? "inline" : "none" }} >Search</button>}
            </form>
            {message && <span>{message}</span>}
            <p className="addMemberAdd" style={{ display: exist === "yes"? "inline" : "none" }}
                onClick={handleAddMember}>Add
            </p>
            <p className="addMemberCancel"onClick={() => {
                setexist("")
                setemail("")
                setmessage("")
                setresult(null)
                setaddMemberDisplay("none")}}>Cancel
            </p>
        </div>
    )

}


export default GroupProfile
