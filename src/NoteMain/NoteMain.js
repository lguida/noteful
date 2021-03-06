import React from 'react'
import './NoteMain.css'
import Note from '../Note/Note'
import PropTypes from 'prop-types'
import NotefulContext from '../NotefulContext'


class NoteMain extends React.Component {
    static contextType = NotefulContext

    render(){
        const notes = this.context.notes.filter(n => 
            n.id === parseInt(this.props.match.params.noteId))
        const note = this.context.notes.find(n => 
            n.id === parseInt(this.props.match.params.noteId))
        let folder=''

        if (note !== undefined){
            folder = this.context.folders.find(f =>
                f.id === notes.folderId)
        }
        let noteContent = ''
        if (note !== undefined){
            noteContent = note.content
        }
        return(
         <div className='main'>
             <Note notes={notes} notePage={true} folder={folder}/>
            <p>{noteContent}</p>
         </div>
        )
    }
}

NoteMain.propTypes ={ 
    match: PropTypes.object.isRequired
}

export default NoteMain