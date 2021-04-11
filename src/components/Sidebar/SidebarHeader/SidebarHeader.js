import React, { useEffect, useState } from 'react'
import "./SidebarHeader.css"
import { Avatar } from '@material-ui/core';
import { GoPlus } from 'react-icons/go';
import { useSelector, useDispatch } from "react-redux"
import { selectContacts, selectUser } from '../../../redux/Slices';
import { setToggleProfile } from '../../../redux/Slices';
import { createGroup, fetchUserByEmail, userExists } from '../../../redux/actions/actions';
import { createContact } from './../../../redux/actions/actions';


function SidebarHeader() {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [moreDisplay, setmoreDisplay] = useState("none")

    return (
        <div className="sidebarHeader">
            <div className="sidebarHeader_left" onClick={ () => dispatch(setToggleProfile(true))}>
                <div className="sidebarHeader_avatar">
                    <Avatar src={user.photoUrl}/>
                </div>
                <span>{user.username}</span>
            </div>
            <div className="sidebarHeader_icons">
                <GoPlus onClick={() => { setmoreDisplay("flex") }} />
                <AddOptions moreDisplay={moreDisplay} setmoreDisplay={setmoreDisplay}/>    
            </div>
        </div>
    )
}

function AddOptions ( { moreDisplay, setmoreDisplay }) {

    const [addGroupDisplay, setaddGroupDisplay] = useState("none")
    const [addContactDisplay, setaddContactDisplay] = useState("none")

    return (
        <>
            <div className="addOptions" style={{ display: `${moreDisplay}`}}>
                <p onClick={() => {
                    setmoreDisplay("none")
                    setaddGroupDisplay("flex")
                    }}>Add Group</p>
                <p onClick={() => {
                    setmoreDisplay("none")
                    setaddContactDisplay("flex")
                    }}>Add Contact</p>
                <p onClick={() => setmoreDisplay("none")} >Cancel</p>
            </div>
            <AddContactOptions addContactDisplay={addContactDisplay} setaddContactDisplay={setaddContactDisplay}/>
            <AddGroupOptions addGroupDisplay={addGroupDisplay} setaddGroupDisplay={setaddGroupDisplay} />
        </>
    )
}

function AddGroupOptions( {addGroupDisplay, setaddGroupDisplay}) {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")

    const handleAddGroup = () => {
        if (name.trim()){

            const group = {  
                groupname: name,
                description: description,
                created_at: Date.now(),
                members: [ user._id ],
                messages: []
            }

            dispatch(createGroup({ group: group}, user))
            setname("")
            setdescription("")
            setaddGroupDisplay("none")
    
        }

    }

    return (
        <div className="addGroupOptions" style={{ display: `${addGroupDisplay}` }}>
            <div className="addGroupOptions_name ">
                <input value={name} onChange={ (e) => setname(e.target.value)} required type="text"  placeholder="Group name" />
            </div>
            <div className="addGroupOptions_des">
                <textarea value={description} spellCheck placeholder="Description" rows="3" name="Description" onChange={ (e) => setdescription(e.target.value)} />
            </div>
            <div  className="addGroupOptions_button">
                <p  type="submit" onClick={handleAddGroup}>Create</p>
                <p  onClick={() => {
                    setname("")
                    setdescription("")
                    setaddGroupDisplay("none")}}>Cancel</p>
            </div>
        </div>
    )
}

function AddContactOptions( {addContactDisplay, setaddContactDisplay}) {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const contacts = useSelector(selectContacts)
    const [email, setemail] = useState("")
    const [exist, setexist] = useState("")
    const [result, setresult] = useState(null)
    const [message, setmessage] = useState("")

    const handleSearchContact = (e) => {
        e.preventDefault()
        dispatch(userExists(email, setresult))
    }

    const handleAddContact = () => {
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
            const createNewContact = () => {

                const alreadyExist = contacts.find( (contact) => (contact.members[0]._id === result._id || contact.members[1]._id === result._id))
                console.log("already")
                console.log(alreadyExist)
                if (!alreadyExist) {
                    const contact = {
                        members: [user._id, result._id]
                    }
                    const members = [user, result]
                    dispatch(createContact({ contact: contact }, members))
                    setexist("done")
                    setemail("")
                    setmessage("Contact Created")
                    // setaddContactDisplay("none")
        
                }
                else {
                    console.log("Contact not created as it already exits")
                    setexist("done")
                    setemail("")
                    setmessage("Contact Already Exists")
                }
            }

            createNewContact()
            
        }
        else if (result?.email === user.email) {
            setexist("done")
            setemail("")
            setmessage(`Lol, this is you email, ${user.username.split(" ")[0]} try again`)
        }
     
    }, [result, email, user, contacts, dispatch])

    return (
        <div className="addContact" style={{ display: `${addContactDisplay}` }}>
            <form onSubmit={handleSearchContact}>
                <input value={email} style={{ display: exist === "done"? "none" : "inline" }}
                    onChange={ (e) => setemail(e.target.value.trim())} 
                    required type="email"  
                    title="format: xxx@gmail.com"
                    placeholder="exple@gmail.com" />
                {email.length > 5 && 
                <button type="submit" style={{ display: exist === ""? "inline" : "none" }}>Search</button>}
            </form>
            {message && <span>{message}</span>}
            <p className="addContactAdd" style={{ display: exist === "yes"? "inline" : "none" }}
                onClick={handleAddContact}>Add
            </p>
    
            <p className="addContactCancel"onClick={() => {
                setexist("")
                setemail("")
                setmessage("")
                setresult(null)
                setaddContactDisplay("none")}}>Cancel
            </p>
        </div>
    )
}

export default SidebarHeader
