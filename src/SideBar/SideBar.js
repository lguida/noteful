import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

class SideBar extends React.Component {
    static contextType = NotefulContext
    render(){
        const note = this.context.notes.find(n =>
            n.id === this.props.match.params.noteId)
        const folder = (this.context.folders.find(f =>
            f.id === note.folderId))
        let folderName =''
        let folderId = ''
        if (folder !== undefined){
            folderName = folder.name
            folderId = folder.id
        }
        return(
         <div className="sidebar">
            <button>
                <Link to={`/folder/${folderId}`}>
                    Go back
                </Link>
            </button>
            <p>{folderName}</p>
         </div>
        )
    }
}

export default SideBar 