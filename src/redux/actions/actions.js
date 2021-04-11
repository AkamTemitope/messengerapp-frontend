import * as api from "../../api/index"
import * as io from "../../sockets/io"
import events from "../../sockets/events"
import { addNewMessage, addGroup, login, setError, setIsActive, setIsLoggedIn, 
    editUserName, editGroupName, editGroupDescription } from "../Slices"

// USER ACTIONS

export const fetchCreateUser = (body) => async (dispatch) => {
    try {

        const res = await api.fetchCreateUser(body)
        dispatch(login(res.data[0]))
        dispatch(setIsLoggedIn(true))
        dispatch(setIsActive(true))
        console.log("fetchCreateUser")
    }
    catch (err) {
        dispatch(setError({error:err}))
        console.log(err)
        
    }
}

export const userExists = (email, next) => async (dispatch) => {
    try {
        const res = await api.userExists(email)
        next(res.data)
        console.log("userExists: all good")
    } 
    catch (err) {
        dispatch(setError({error:err}))
        console.log(err)
    }
}

export const fetchUserById = (id, next) => async (dispatch) => {
    try {
        const res = await api.fetchUserById(id)
        next(res.data)
        console.log("user fetched")

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const fetchUserByEmail  = (email, next) => async (dispatch) => {
    try {
        const res = await api.fetchUserByEmail(email) 
        next(res.data[0])
        console.log("fetchUserByEmail")

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const updateUserName = (id, body, user) => async (dispatch) => {
    try {
        const res = await api.updateUserName(id, body)
        res && console.log("Username Updated :-)")
        io.send(events.editName, { _id: user._id, username: body.username, contacts: user.contacts, groups: user.groups })
        dispatch(editUserName(body.username))
    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log("err occured")
        console.log(err)
    }
}

// Yet to do
export const updateUserPhoto = (id, body) => async (dispatch) => {
    try {

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}


// CONTACT ACTIONS

export const fetchContact = (id, user, next) => async (dispatch) => {
    try {
        const res = await api.fetchContact(id)
        next(res.data)
        io.send(events.joinContact, {contact: res.data, is_active: true, userId: user._id})
        console.log("fetchContact: all good")
    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const createContact = (body, members) => async (dispatch) => {
    try {
        const res = await api.createContact(body)
        res && console.log("Contact Created")
        console.log("createContact: all good")
        io.send(events.addNewContact, {...res.data, members: members})
    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
} 

export const newContactMessage = (id, body, user) => async (dispatch) => {
    try {
        const res = await api.newContactMessage(id, body)
        res && console.log("Message sent")
        dispatch(addNewMessage({ _id: id, type: "contact", message: {...res.data, from: user } }))
        io.send(events.newMessage, { _id: id, type: "contact", message: {...res.data, from: user } })
    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

// Yet to do
export const updateRequest = (id, body) => async (dispatch) => {
    try {

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const updateBlock = (id, body) => async (dispatch) => {
    try {
        const res = await api.updateBlock(id, body)
        res && console.log("Block Status Changed")

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}
export const deleteContactMessage = (id, body) => async (dispatch) => {
    try {

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const deleteContactMessages = (id) => async (dispatch) => {
    try {
        const res = await api.deleteContactMessages(id)
        res && console.log("All messages deleted")

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

// Yet to do
export const deleteContact = (id) => async (dispatch) => {
    try {

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}


// GROUP ACTIONS

export const fetchGroup = (id, user, next) => async (dispatch) => {
    try {
        const res = await api.fetchGroup(id)
        next(res.data)
        console.log("fetchGroup: all good")
        io.send(events.joinGroup, {group: res.data, is_active: true, userId: user._id})
    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
} 

export const createGroup = (body, user) => async (dispatch) => {
    try {
        const res = await api.createGroup(body)
        res && console.log("Group created")
        const group = {...res.data, members: [user] }
        dispatch(addGroup(group))
        io.send(events.joinGroup, {group, is_active: true, userId: user._id})
        // console.log({...res.data, members: [user] })

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
} 

export const newGroupMessage = (id, body, user) => async (dispatch) => {
    try {
        const res = await api.newGroupMessage(id, body)
        res && console.log("Message sent")
        dispatch(addNewMessage({ _id: id, type: "group", message: {...res.data, from: user } }))
        io.send(events.newMessage, { _id: id, type: "group", message: {...res.data, from: user } })
    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const addMember = (id, body) => async (dispatch) => {
    try {
        const res = await api.addMember(id, body)
        res && console.log("Member Added")

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const updateName = (id, body) => async (dispatch) => {
    try {
        const res = await api.updateName(id, body)
        res && console.log("Group name updated :-)")
        io.send(events.editGroupName, { _id: id, groupname: body.groupname })
        dispatch(editGroupName({ _id: id, groupname: body.groupname }))

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const updatePhoto = (id, body) => async (dispatch) => {
    try {

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const updateDescription = (id, body) => async (dispatch) => {
    try {
        const res = await api.updateDescription(id, body)
        res && console.log("Group description updated :)")
        io.send(events.editGroupDescription, { _id: id, description: body.description })
        dispatch(editGroupDescription({ _id: id, description: body.description }))

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

// Yet to do
export const deleteGroupMessage = (id, body) => async (dispatch) => {
    try {

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const deleteGroupMessages = (id) => async (dispatch) => {
    try {
        const res = await api.deleteGroupMessages(id)
        res && console.log("All Group Messages Deleted")
    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const deleteMember = (id, userId) => async (dispatch) => {
    try {
        const res = await api.deleteMember(id, userId)
        res && console.log("deleteMember: all good")

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

export const deleteGroup = (id) => async (dispatch) => {
    try {
        const res = await api.deleteGroup(id)
        res && console.log("Group Deleted :)")

    }
    catch (err) {
        dispatch(setError({error:err})) 
        console.log(err)
    }
}

