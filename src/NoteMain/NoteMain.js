import React from 'react'
import './NoteMain.css'
import Note from '../Note/Note'

class NoteMain extends React.Component {
    render(){
        const notes = this.props.store.notes.filter(n => 
            n.id === this.props.match.params.noteId)
        const note = this.props.store.notes.find(n => 
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