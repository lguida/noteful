import React from 'react';
import { Route } from 'react-router-dom'
import Nav from './Nav/Nav'
import SideBar from './SideBar/SideBar'
import Main from './Main/Main'
import './App.css'
import FolderSidebar from './FolderSidbar/FolderSidebar'
import NotefulContext from './NotefulContext'
import NoteMain from './NoteMain/NoteMain'
import config from './config'

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  }

  setFolders = folders => {
    this.setState({
      folders,
      notes: this.state.notes,
      error: null,
    })
  }
  setNotes = notes => {
    this.setState({
      folders: this.state.folders,
      notes,
      error: null,
    })
  }

  addNote = note => {
    console.log('adding note', note)
  }

  addFolder = folder =>{
    console.log('adding folder', folder)
  }

  deleteNote = noteId => {
    console.log('deleting noteId', noteId)
  }

  componentDidMount() {
    const urlFolders = config.API_URL + "/folders"
    const urlNotes = config.API_URL + "/notes"
    fetch(urlFolders, {
      method: 'GET',
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
    .then(this.setFolders)
    .catch(error => this.setState({ error }))

    fetch(urlNotes, {
      method: 'GET',
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
    .then(this.setNotes)
    .catch(error => this.setState({ error }))
  }

  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addNote: this.addNote,
      addFoler: this.addFolder,
      deleteNote: this.deleteNote,
    }
    return (
      <main className='App'>
        <Nav />
        <div className="group">
        <NotefulContext.Provider value={contextValue}>

          <Route exact path='/' component={FolderSidebar}/>
          <Route exact path='/' component={Main}/>

          <Route exact path='/folder/:folderId' component={FolderSidebar}/>
          <Route exact path='/folder/:folderId' component={Main}/>

          <Route exact path='/note/:noteId' component={SideBar}/>
          <Route exact path='/note/:noteId' component={NoteMain}/>
          
          </NotefulContext.Provider>
        </div>
      </main>
    );
  }
}

export default App;