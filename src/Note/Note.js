import React from 'react'
import './Note.css'


class Note extends React.Component {
    render(){
        return(
            <>
            {this.props.notes.map(note =>
            <div className="notebox" key={note.id}>
                <h2 className="note-name">{note.name}</h2>
                <div className="group">
                    <p className="note-modified">{note.modified}</p>
                    <button className="delete-note-btn">Delete Note</button>
                </div>
            </div>
            )}
            </>
        )
    }
}

export default Note