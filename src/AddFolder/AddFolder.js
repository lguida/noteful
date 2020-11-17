import React from 'react'
import './AddFolder.css'
import config from '../config'
import PropTypes from 'prop-types'
import NotefulContext from '../NotefulContext'
import { withRouter } from 'react-router-dom'


class AddFolder extends React.Component {
    static contextType = NotefulContext
    constructor(props){
        super(props)
        this.state = {
            folderName: {
                value: '',
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

    handleSubmit(event, value, callback) {
        event.preventDefault()
        const folderToAdd = {
                "name": value
            }
        fetch(config.urlFolders, {
            method: 'POST',
            body: JSON.stringify(folderToAdd),
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
              const addFolderToList = {
                  "id": data.id,
                  "name": value
              }
            callback(addFolderToList)
            this.props.history.push(`/folder/${data.id}`)
        })
        .catch(error => console.log(error))
    }
    
    handleCancelClick = () => {
        this.props.history.goBack()
    }

    updateName(name){
        this.setState({ folderName: { value: name, touched: true} })
    }
    
    validateName() {
        const name = this.state.folderName.value.trim()
        if (name.length === 0){
            return "Folder name is required"
        } else if (name.length <3){
            return "Folder name must be at least 3 characters long"
        }
    }

 
    render() {
        return(
            <form 
                className="addFolder" 
                onSubmit={e => { 
                    this.handleSubmit(
                        e,
                        this.state.folderName.value,
                        this.context.addFolder)
                }}>
                <h2>Add Folder</h2>
                <label htmlFor="folderName">Folder Name</label>
                <input
                    type='text'
                    className='addFolder-textField'
                    name="folderName"
                    id="folderName"
                    onChange={e => this.updateName(e.target.value)}
                />
                <div className="addfolder-hint">
                    * Folder name must be at least 3 characters long
                </div>
                <div className="AddFolder-btns"> 
                    <button 
                        type="reset" 
                        className="cancel-btn"
                        onClick={this.handleCancelClick}>
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="folderSubmit-btn"
                        disabled={
                            this.validateName()
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

AddFolder.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(AddFolder)