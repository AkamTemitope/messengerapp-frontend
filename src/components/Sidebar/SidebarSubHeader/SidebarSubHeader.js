import React from 'react'
import "./SidebarSubHeader.css"
import { GrSearch } from 'react-icons/gr';
import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from "react-redux"
import { selectSearchInput, selectSidebarSearch, setSearchInput, setShowConversation, setSidebarSearch } from "../../../redux/Slices"

function SidebarSubHeader() {

    const search = useSelector(selectSidebarSearch)

    return (
        <div className="sidebarSubHeader">
            { !search?  <SubHeader /> : <SearchBar />}
        </div>
    )
}

const SearchBar = () => {

    const dispatch = useDispatch()
    const input = useSelector(selectSearchInput)

    return (
        <div className="searchBar" >
            <form>
                <input value={input} onChange={(e) => { 
                        dispatch(setSearchInput(e.target.value))
                        dispatch(setShowConversation( "searchResults" ))
                        }} 
                    type="text" placeholder="Search"  />
                <button onClick={ (e) => { 
                        e.preventDefault()
                        dispatch(setShowConversation( "searchResults" ))

                     }} 
                    type="submit" >Search</button>
            </form>
            <CgClose className="searchBar_close" onClick={ () => {
                        dispatch(setSidebarSearch(false))
         
                } }/>
        </div>
    )
}

const SubHeader = ({setshowSearch}) => {

    const dispatch = useDispatch()

    return (
            <div className="sidebarSubHeader_elements" >
                <div className="sidebarSubHeader_search">
                <   GrSearch onClick={() =>  {
                    dispatch(setSearchInput(""))
                    dispatch(setSidebarSearch(true))
                     }}/>
                </div>
                <span onClick={() => dispatch(setShowConversation( "contacts" )) }  >Contacts</span>
                <span onClick={() => dispatch(setShowConversation( "groups" ))} >Groups</span>
            </div>
    )
}

export default SidebarSubHeader
