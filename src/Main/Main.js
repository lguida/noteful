import React from 'react'
import './Main.css'
import Note from '../Note/Note'

class Main extends React.Component {
    render(){
        const notes = this.props.store.notes.filter(n => 
            n.folderId === this.props.match.params.folderId)
        return(
         <div className='main'>
             <Note notes={notes}/>
         </div>
        )
    }
}

export default Main