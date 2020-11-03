import React from 'react'
import './AddNote.css'
import config from '../config'
import PropTypes from 'prop-types'
import NotefulContext from '../NotefulContext'
import { withRouter } from 'react-router-dom'



class AddNote extends React.Component {
    static contextType = NotefulContext
    constructor(props){
        super(props)
        this.state = {
            noteName: {
                value: "",
                touched: false
            },
            folder: {
                value: "",
                touched: false
            },
            content: {
                value: "",
                touched: false
            }
        }
    }

    randomStr(len, arr) { 
        var ans = ''; 
        for (var i = len; i > 0; i--) { 
            ans +=  
              arr[Math.floor(Math.random() * arr.length)]; 
        } 
        return ans; 
    } 

    createDateModified(){
        const date = new Date()
        return String(date)
    }

    handleSubmit(event, stateValues, callback) {
        event.preventDefault()
        const noteToAdd = {
                "id": this.randomStr(8, '12345abcde')+ "-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": stateValues.noteName.value,
                "modified": this.createDateModified(),
                "folderId": stateValues.folder.value,
                "content": stateValues.content.value
            }
        fetch(config.urlNotes, {
            method: 'POST',
            body: JSON.stringify(noteToAdd),
            headers: {
              'content-type': 'application/json',
            }
          })
        .then(res => {
            if (!res.ok){
              throw new Error(res.status)
            }
            return res.json()
          })
          .then(data =>{
            callback(noteToAdd)
            this.props.history.push(`/folder/${noteToAdd.folderId}`)
        })
        .catch(error => console.log(error))
    }

    handleCancelClick = () => {
        this.props.history.goBack()
    }

    updateName(name){
        this.setState({ noteName: { value: name, touched: true} })
    }
    
    updateFolder(folder){
        const folderConst = this.context.folders.filter(f => 
            f.name === folder)
        this.setState({ folder: { value: folderConst[0].id, touched: true} })
    }
    
    updateContent(content){
        this.setState({ content: { value: content, touched: true} })
    }
    
    
    validateName() {
        const name = this.state.noteName.value.trim()
        if (name.length === 0){
            return "Note name is required"
        } else if (name.length <3){
            return "Note name must be at least 3 characters long"
        }
    }

    validateContent(){
        const content = this.state.content.value.trim()
        if (content.length === 0){
            return "Content is required"
        } else if (content.length <3){
            return "Content must be at least 3 characters long"
        }
    }

 
    render() {
        return(
            <form 
                className="addNote" 
                onSubmit={e => { 
                    this.handleSubmit(
                        e,
                        this.state,
                        this.context.addNote)
                }}>
                <h2>Add Note</h2>
                <div className="group">
                    <label className="name-label" htmlFor="noteName">Note Name:</label>
                    <label className="folder-label" htmlFor="selectFolder">Select Folder:</label>
                </div>
                <div className="group">
                    <input
                        type='text'
                        className='addNote-textField'
                        name="noteName"
                        id="noteName"
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <select
                        className="selectFolder"
                        name="selectFolder"
                        id="selectFolder"
                        onChange={e => this.updateFolder(e.target.value)}
                        >
                        {this.context.folders.map(folder =>
                            <option key={folder.id}> {folder.name} </option>
                            )}
                    </select>
                </div>
                <label htmlFor="contentInput">Write note content here:</label>
                <textarea 
                    className="contentInput"
                    name="contentInput"
                    id="contentInput"
                    onChange={e => this.updateContent(e.target.value)}
                />
                <div className="AddFolder-btns"> 
                    <button 
                        type="reset" 
                        className="cancel-btn" 
                        onClick={this.handleCancelClick}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="noteSubmit-btn"
                        disabled={
                            this.validateName() ||
                            this.validateContent()
                        }
                    >
                        Save
                    </button>     
                </div>
            </form>
        )
    }
}

AddNote.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(AddNote)