import React from 'react'
import './SideBar.css'
import STORE from '../store.js'
import { Link } from 'react-router-dom'

class SideBar extends React.Component {
    render(){
        return(
         <div className="sidebar">
             {STORE.folders.map(folder =>
                <button key={folder.id}>
                    <Link to={`/${folder.id}`}>
                    {folder.name}
                    </Link>
                </button>
            )}
            <button>Add folder</button>
         </div>
        )
    }
}

export default SideBar