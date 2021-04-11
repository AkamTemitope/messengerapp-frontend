import React from 'react'
import ContactConversation from './Conversation/ContactConversation'
import GroupConversation from './Conversation/GroupConversation'
import SidebarHeader from "./SidebarHeader/SidebarHeader"
import SidebarSubHeader from "./SidebarSubHeader/SidebarSubHeader"
import { useSelector } from "react-redux"
import { selectGroups, selectUser, selectContacts } from '../../redux/Slices';
import { selectSearchInput, selectShowConversation } from '../../redux/Slices';
import "./Sidebar.css"

function Sidebar() {

    const user = useSelector(selectUser)
    const showConversation = useSelector(selectShowConversation)
    const searchInput = useSelector(selectSearchInput)
    const groups = useSelector(selectGroups)
    const contacts = useSelector(selectContacts)

    return (
        <div className="sidebar">
            <SidebarHeader />
            <SidebarSubHeader />
            {showConversation === "contacts" && 
            ( 
                <div className="sidebar_bottom" >
                    {contacts && contacts.map((contact) => 
                    <ContactConversation key={contact._id} contact={contact}/>)
                    }
                   
                </div>
         
            )}
            {showConversation === "groups" &&
            ( 
                <div className="sidebar_bottom" >
                    {groups && groups.map((group) =>
                     <GroupConversation key={group._id} group={group}/>)
                    }

                    
                </div>
      
            )}
            {showConversation === "searchResults" && 
            ( 
                <div className="sidebar_bottom" >
                    {
                        groups && (groups.map((group) => {
                            let a = group.groupname.trim().toLowerCase()
                            let b = searchInput.trim().toLowerCase()
                            return (a.includes(b) && b && <GroupConversation key={group._id} group={group}/>)
                        }))
                    }
                    {
                        contacts && (contacts.map((contact) => {

                            if (contact.members[0]._id !== user._id) {
                                let a = contact.members[0].username.trim().toLowerCase()
                                let b = searchInput.trim().toLowerCase()
                                return (a.includes(b)  && <ContactConversation key={contact._id} contact={contact}/>)
                            }
                            else {
                                let a = contact.members[1].username.trim().toLowerCase()
                                let b = searchInput.trim().toLowerCase()
                                return (a.includes(b) && b && <ContactConversation key={contact._id} contact={contact}/>)
                            }
                        }))
                        
                    }
                </div>
            
             )}

        </div>
    )
}
export default Sidebar
