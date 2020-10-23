import React from 'react'
import './FolderSidebar.css'
import { NavLink } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

class FolderSidebar extends React.Component {
    static contextType = NotefulContext
    render(){
        return(
        <ul className="sidebar">
            {this.context.folders.map(folder =>
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