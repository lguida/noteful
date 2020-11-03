import React from 'react'
import './Main.css'
import Note from '../Note/Note'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import NotefulContext from '../NotefulContext'




class Main extends React.Component {
    static contextType = NotefulContext
    render(){
        const notes = this.context.notes.filter(n => 
            n.folderId === this.props.match.params.folderId)
        const folder = this.props.match.params.folderId
        return(
         <div className='main'>
             <Note notes={notes} notePage={false} folder={folder}/>
             <Link className="addNote-btn-link" to={'/addNote'}>
                <button>Add Note</button>
             </Link>
         </div>
        )
    }
}

Main.propTypes ={ 
    match: PropTypes.object.isRequired
}

export default Main