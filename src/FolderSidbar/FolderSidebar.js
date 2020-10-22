import React from 'react'
import STORE from '../store.js'
import { Link } from 'react-router-dom'

class FolderSidebar extends React.Component {
    render(){
        return(
         <>
             {STORE.folders.map(folder =>
                <button key={folder.id}>
                    <Link to={`/${folder.name}`}>
                    {folder.name}
                    </Link>
                </button>
            )}
         </>
        )
    }
}

export default FolderSidebar