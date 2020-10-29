import React from 'react'
import './Note.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import config from '../config'
import NotefulContext from '../NotefulContext'


function deleteNoteRequest(noteId, callback){
    fetch(config.urlNotes +`/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res => {
        if (!res.ok){
            return res.json().then(error =>{
                throw error
            })
        }
        return res.json()
    })
    .then(data =>{
        console.log(data)
        callback(noteId)
    })
    .catch(error => {
        console.log(error)
    })

}

class Note extends React.Component {
    static contextType = NotefulContext
    render(){
        let deletePath = `/folder/${this.props.folder}`
        if (this.props.notePage === true){
            deletePath = '/'
        }
        return(
            <>
            {this.props.notes.map(note =>
            <div className="notebox" key={note.id}>
                <Link className="note-link" to={`/note/${note.id}`}>
                    <h2 className="note-name">{note.name}</h2>
                </Link>
                <div className="group">
                    <p className="note-modified">{note.modified}</p>
                    <Link className="delete-btn-link" to={deletePath}>
                    <button 
                        className="delete-note-btn"
                        onClick={() => {
                            deleteNoteRequest(
                                note.id,
                                this.context.deleteNote)
                        }}>
                        Delete Note
                    </button>
                    </Link>
                </div>
            </div>
            )}
            </>
        )
    }
}

Note.propTypes = {
    notes: PropTypes.array,
    notePage: PropTypes.bool,
    folder: PropTypes.array
}

export default Note