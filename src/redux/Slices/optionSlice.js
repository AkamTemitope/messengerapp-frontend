import { createSlice } from "@reduxjs/toolkit"

export const optionSlice = createSlice({
    name: "option",
    initialState: {
        sidebarSearch: false,
        showConversation: "contacts",
        searchInput: "",
        toggleProfile: false,
        conversation: null,
        toggleConversation: { 
            _id: null, 
            type: "", 
            toggle: false
        },
         fetchResult: null,
         update: null
    },

    reducers: {

        setSidebarSearch: (state, action) => {
            state.sidebarSearch = action.payload;
        },

        setUpdate: (state, action) => {
            state.update = action.payload;
        },

        setShowConversation: (state, action) => {
            state.showConversation = action.payload;
        },

        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },

        setToggleProfile: (state, action) => {
            state.toggleProfile = action.payload;
        },

        setToggleConversation: (state, action) => {
            state.toggleConversation = action.payload;
        },

        setConversation: (state, action) => {
            state.conversation = action.payload
        },

        setFetchResult: (state, action) => {
            state.fetchResult = action.payload
        }

    },

}) 

export const { setShowConversation, setSearchInput, setToggleProfile, setToggleConversation, setConversation } = optionSlice.actions;
export const { setSidebarSearch, setFetchResult, setUpdate } = optionSlice.actions;

export const selectSidebarSearch = (state) => state.option.sidebarSearch;
export const selectConversation = (state) => state.option.conversation;
export const selectShowConversation = (state) => state.option.showConversation;
export const selectSearchInput = (state) => state.option.searchInput
export const selectToggleProfile = (state) => state.option.toggleProfile
export const selectToggleConversation = (state) => state.option.toggleConversation
export const selectFetchResult = (state) => state.option.fetchResult;
export const selectUpdate = (state) => state.option.update;

export default optionSlice.reducer;
