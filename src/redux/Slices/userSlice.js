import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
        loggingIn: false,
        is_active: false,
        contacts: [],
        groups: [],
        error: null,
        loginError: null,
        timestamp: null,
        connected: true,
        notifications: [],
        loading: false 

        
    },

    reducers: {

        setNotification: (state, action) => {
            state.notification = action.payload
        },

        setConnected: (state, action) => {
            state.connected = action.payload
        },

        setIsActive: (state, action) => {
            state.user.is_active = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },

        setIsLoggingIn: (state, action) => {
            state.isLoggingIn = action.payload
        },
        
        setGroups: (state, action) => {  
            state.groups = action.payload
        },

        addGroup: (state, action) => {  
            state.groups = [...state.groups, action.payload]
        },

        removeGroup: (state, action) => {
            let groups = []
            state.groups.forEach( group => {
                if(group._id !== action.payload._id){
                    groups.push(group)
                }
            })
            state.groups = groups
        },
        
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },

        addContact: (state, action) => {  
            state.contacts = [...state.contacts, action.payload]
        },

        addNewMessage: (state, action) => {
            if (action.payload.type === "contact") {
                state.contacts = state.contacts.map(contact => {
                    if (contact?._id === action.payload._id) {
                        let messages = [...contact.messages, action.payload.message]
                        return {...contact, messages: messages, last_message: action.payload.message }
                    }
                    return contact
                });
            }
            else {
                state.groups = state.groups.map(group => {
                    if (group?._id === action.payload._id) {
                        let messages = [...group.messages, action.payload.message]
                        return {...group, messages: messages, last_message: action.payload.message }
                    }
                    return group
                });
            }
        },

        editUserName:  (state, action) => {
            state.user.username = action.payload
        },
        editUserNameInConversations: (state, action) => {
            if (action.payload.type === "contact") {
                state.contacts = state.contacts.map(contact => {
                    if (contact?._id === action.payload._id) {
                        let members = contact.members.map( member => {
                            if (member._id === action.payload.userId){
                                return {...member, username: action.payload.username}
                            }
                            return member
                        })
                        return {...contact, members: members}
                    }
                    return contact
                });

            }
            else {
                state.groups = state.groups.map(group => {
                    if (group?._id === action.payload._id) {
                        let members = group.members.map( member => {
                            if (member._id === action.payload.userId){
                                return {...member, username: action.payload.username}
                            }
                            return member
                        })
                        return {...group, members: members}
                    }
                    return group
                });
            }
        },

        updateIsActive: (state, action) => {
            if (action.payload.type === "contact") {
                state.contacts = state.contacts.map(contact => {
                    if (contact?._id === action.payload._id) {
                        let members = contact.members.map( member => {
                            if (member._id === action.payload.userId){
                                return {...member, is_active: action.payload.is_active}
                            }
                            return member
                        })
                        return {...contact, members: members}
                    }
                    return contact
                });

            }
            else if (action.payload.type === "group") {
                state.groups = state.groups.map(group => {
                    if (group?._id === action.payload._id) {
                        let members = group.members.map( member => {
                            if (member._id === action.payload.userId){
                                return {...member, is_active: action.payload.is_active}
                            }
                            return member
                        })
                        return {...group, members: members}
                    }
                    return group
                });
            }
            else {
                state.contacts = state.contacts.map(contact => {
                    if (contact?._id === action.payload._id) {
                        let members = contact.members.map( member => {
                            if (member._id === action.payload.userId){
                                return {...member, is_active: action.payload.is_active}
                            }
                            return member
                        })
                        return {...contact, members: members}
                    }
                    return contact
                });
                state.groups = state.groups.map(group => {
                    if (group?._id === action.payload._id) {
                        let members = group.members.map( member => {
                            if (member._id === action.payload.userId){
                                return {...member, is_active: action.payload.is_active}
                            }
                            return member
                        })
                        return {...group, members: members}
                    }
                    return group
                });
            }
        },

        editGroupName:  (state, action) => {
            state.groups = state.groups.map( group => {
                if (group._id === action.payload._id) {
                    return {...group, groupname: action.payload.groupname}
                }
                return group
            })
        },

        editGroupDescription:  (state, action) => {
            state.groups = state.groups.map( group => {
                if (group._id === action.payload._id) {
                    return {...group, description: action.payload.description}
                }
                return group
            })
        },

        deleteOneMessage: (state, action) => {
            if (action.payload.type === "contact") {

            }
            else {

            }
        },

        deleteAllMessages: (state, action) => {
            if (action.payload.type === "contact") {
                state.contacts = state.contacts.map(contact => {
                    if (contact?._id === action.payload._id) {
                        return {...contact, messages: [], last_message: null }
                    }
                    return contact
                });

            }
            else {
                state.groups = state.groups.map(group => {
                    if (group?._id === action.payload._id) {
                        return {...group, messages: [], last_message: null }
                    }
                   
                    return group
                });
            }
        },

        updateBlockStatus: (state, action) => {
            state.contacts = state.contacts.map(contact => {
                if (contact?._id === action.payload._id) {
                    return {...contact, block: action.payload.block}
                }
                return contact
            });

        },

        updateGroup: (state, action) => {
            state.groups = state.groups.map(group => {
                if (group?._id === action.payload._id) {
                    return action.payload.group
                }
                return group
            });
        },
        
        setError: (state, action) => {
            if(action.payload.error){
                state.error = action.payload.error
            }
            if (action.payload.LoginError){
                state.loginError = action.payload.loginError
                state.isLoggedIn = action.payload.isLoggedIn
                
            }
        },
        
        login: (state, action) => {
            state.user = action.payload;
        },
        
        logout: (state) => {
            state.user = null;
            state.contacts = [ ]
            state.groups = [ ]
            state.is_active = false
            state.timestamp = null
            state.isLoggedIn = false
            state.isLoggingIn = false
            state.loading = false 
            state.error = null
            state.loginError = null
    },
    },

})

export const { login, logout, setGroups, setContacts, setError, setLoading } = userSlice.actions;
export const { setNotification, setConnected, setIsActive, setIsLoggedIn,  setIsLoggingIn, updateIsActive } = userSlice.actions;
export const { removeGroup, updateBlockStatus, addContact, addGroup, deleteAllMessages, editUserNameInConversations } = userSlice.actions
export const { editUserName, editGroupName, editGroupDescription, deleteContactMessage, deleteGroupMessage, updateGroup, addNewMessage } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectGroups = (state) => state.user.groups;
export const selectContacts = (state) => state.user.contacts;
export const selectError   = (state) => state.user.error
export const selectLoginError   = (state) => state.user.loginError
export const selectNotifications   = (state) => state.user.notifications
export const selectConnected  = (state) => state.user.connected
export const selectIsLoggedIn   = (state) => state.user.isLoggedIn
export const selectIsLoggingIn   = (state) => state.user.isLoggingIn
export const selectLoading   = (state) => state.user.loading

export default userSlice.reducer;
