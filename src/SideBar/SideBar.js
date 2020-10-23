import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

class SideBar extends React.Component {
    static contextType = NotefulContext
    render(){
        let folder
        let folderName =''
        let folderpath
        const note = this.context.notes.find(n =>
            n.id === this.props.match.params.noteId)
        if (note !== undefined){
            folder = (this.context.folders.find(f =>
                f.id === note.folderId))
        }
        
        if (folder !== undefined){
            folderName = folder.name
            folderpath = `/folder/${folder.Id}`
        }
        else {
            folderpath = ('/')
        }
        return(
         <div className="sidebar">
            <button>
                <Link to={folderpath}>
                    Go back
                </Link>
            </button>
            <p>{folderName}</p>
         </div>
        )
    }
}

export default SideBar 