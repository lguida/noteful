import React from 'react'
import './FolderSidebar.css'
import STORE from '../store.js'
import { NavLink } from 'react-router-dom'

class FolderSidebar extends React.Component {
    render(){
        return(
        <ul className="sidebar">
            {STORE.folders.map(folder =>
               <li key={folder.id} className='folder-btn'>
                   <NavLink className='folder-link' to={`/folder/${folder.id}`}>
                   {folder.name}
                   </NavLink>
               </li>
           )}
           <button>Add folder</button>
        </ul>
        )
    }
}

export default FolderSidebar