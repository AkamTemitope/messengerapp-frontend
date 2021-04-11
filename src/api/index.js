import axios from "./axios"

// USER API CALLS

export const fetchCreateUser = (body) => axios.post("/users/new", body)

export const userExists = (email) => axios.get(`/users/exist?e=${email}`)

export const fetchUserById  = (id) => axios.get(`users/user/${id}`)

export const fetchUserByEmail  = (email) => axios.get(`users/email?e=${email}`)

export const updateUserName = (id, body) => axios.patch(`users/updateName/${id}`, body)

export const updateUserPhoto = (id, body) => axios.patch(`users/updatePhoto/${id}`, body)


// CONTACT API CALLS

export const fetchContact = (id) =>  axios.get(`contacts/${id}`)

export const createContact = (body) =>  axios.post("contacts/new", body)

export const newContactMessage = (id, body) => axios.post(`contacts/newMessage/${id}`, body)

export const updateRequest = (id, body) => axios.patch(`contacts/updateRequest/${id}`, body)

export const updateBlock = (id, body) => axios.patch(`contacts/updateBlock/${id}`, body)

export const deleteContactMessage = (id, body) => axios.delete(`contacts/deleteMessage/${id}`, body)

export const deleteContactMessages = (id) => axios.delete(`contacts/deleteMessages/${id}`)

export const deleteContact = (id) => axios.delete(`contacts/deleteContact/${id}`)


// GROUP API CALLS

export const fetchGroup = (id) =>  axios.get(`groups/${id}`)

export const createGroup = (body) =>  axios.post("groups/new/", body)

export const newGroupMessage = (id, body) => axios.post(`groups/newMessage/${id}`, body)

export const addMember = (id, body) => axios.patch(`groups/addMember/${id}`, body)

export const updateName = (id, body) => axios.patch(`groups/updateName/${id}`, body)

export const updatePhoto = (id, body) => axios.patch(`groups/updatePhoto/${id}`, body)

export const updateDescription = (id, body) => axios.patch(`groups/updateDescription/${id}`, body)

export const deleteGroupMessage = (id, messageId) => axios.delete(`groups/deleteMessage/${id}?_id=${messageId}`)

export const deleteGroupMessages = (id) => axios.delete(`groups/deleteMessages/${id}`)

export const deleteMember = (id, userId) => axios.delete(`groups/deleteMember/${id}?_id=${userId}`)

export const deleteGroup = (id) => axios.delete(`groups/deleteGroup/${id}`)


