import React from 'react'
import './NoteMain.css'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'

class NoteMain extends React.Component {
    static contextType = NotefulContext

    render(){
        const notes = this.context.store.notes.filter(n => 
            n.id === this.props.match.params.noteId)
        const note = this.context.store.notes.find(n => 
            n.id === this.props.match.params.noteId)
        let noteContent = ''
        if (note !== undefined){
            noteContent = note.content
        }
        return(
         <div className='main'>
             <Note notes={notes}/>
            <p>{noteContent}</p>
         </div>
        )
    }
}

export default NoteMain