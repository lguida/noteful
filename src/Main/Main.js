import React from 'react'
import './Main.css'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'

class Main extends React.Component {
    static contextType = NotefulContext

    render(){
        const notes = this.context.notes.filter(n => 
            n.folderId === this.props.match.params.folderId)
        return(
         <div className='main'>
             <Note notes={notes}/>
             <button>Add Note</button>
         </div>
        )
    }
}

export default Main