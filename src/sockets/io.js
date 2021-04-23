import io from "socket.io-client"
import { fetchGroup } from "../redux/actions/actions"
import { updateBlockStatus, deleteAllMessages, updateGroup, addGroup, removeGroup, addContact, addNewMessage, 
    editUserNameInConversations, editGroupName, editGroupDescription, setIsActive, updateIsActive } from "../redux/Slices/userSlice"
import events from "./events"

let socket = null
const ENDPOINT = process.env.REACT_APP_BASE_URL 
const options = {transports: ['websocket', 'polling', 'flashsocket']}

/// connect to server
export const connect = (_id, dispatch) => {

    socket = io(ENDPOINT, options)
    console.log("socket connected")
    socket.emit(events.join, _id)
    dispatch(setIsActive(true))
}

//// send from client to server 
export const send = (event, data) => {
    if (socket) {
        socket.emit(event, data)
    }
    else {
        console.log("no socket was connected")
    }
}

///// receive from server
export const receive = (event, set) => {
    if (socket) {
        socket.on(event, (data) => {
            set(data)
        })
    }
    else {
        console.log("no socket was connected")
    }
}



export const editName = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            dispatch(editUserNameInConversations(data))
        })
    }
}

export const updateOnlineStatus = (event, user, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            dispatch(updateIsActive(data))
            if (data.userId !== user.id){
                send(events.updateOnlineStatus, {...data, is_active: true, userId: user._id})
            }
        })
    }
}

export const updateNewStatus = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            dispatch(updateIsActive(data))

        })
    }
}

// connect newly added member to socket room
export const connectToNewGroup = (event, user, dispatch) => {
    if(socket) {
        socket.on(event, ({ member, group }) => {
            if (user._id === member._id) {
                dispatch(fetchGroup(group._id, user, (data) => dispatch(addGroup(data))))
                // dispatch(addGroup(group))
                // send(events.joinGroup, { group, is_active: true, userId: user._id })
                // send(events.updateOnlineStatus, { type: "group", _id: group._id, is_active: true, userId: user._id})

                console.log("connectToNewGroup successful")
            }

        })
    }
}

export const editSpecificGroupName = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            dispatch(editGroupName(data))
        })
    }
}

export const editSpecificGroupDes = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            dispatch(editGroupDescription(data))
        })
    }
}

export const newMessage = (event, dispatch) => {
    console.log("hello world")
    if(socket) {
        socket.on(event, (data) => {
            dispatch(addNewMessage(data))
            console.log(`new ${data.type} message `)
    })
    }
}

//// Delete All Messages (either from Contact or Group)
export const deleteMessages = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            dispatch(deleteAllMessages(data))
        })
    }
}

/// add new contact

export const addNewContact = (event, user, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            const members = data.members
            console.log("from io addNewContact")
            if (members[0].email === user.email){
                dispatch(addContact(data))
                send(events.joinContact, { contact: data, is_active: true, userId: user._id })
            }
            if (members[1].email === user.email){
                dispatch(addContact(data))
                send(events.joinContact, { contact: data, is_active: true, userId: user._id })
            }
        })
    }
}

/// update block
export const blockStatus = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            dispatch(updateBlockStatus(data))
        })
    }
}


// add new member to group
export const addMember = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            console.log("addMember successful")
            dispatch(updateGroup(data))
        })
    }
}

// update members
export const onLeaveGroup = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            console.log("remove member successful")
            dispatch(updateGroup(data))
        })
    }
}

// delete group
export const deleteGroup = (event, dispatch) => {
    if(socket) {
        socket.on(event, (data) => {
            console.log("deleteGroup successful")
            dispatch(removeGroup(data))
        })
    }
}

///// disconnect from server
export const disconnect = () => {
    if (socket) {
        socket.disconnect()
        console.log("socket disconnected")

    }
    else {
        console.log("no socket was connected")
    }

}