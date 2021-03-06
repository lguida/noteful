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
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import ErrorBound from './ErrorBound/ErrorBound'

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    idToUpdate: '',
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

  addNote = (note) => {
    this.setState({
      notes: [ ...this.state.notes, note],
    })
  }

  addFolder = folder =>{
    this.setState({
      folders: [ ...this.state.folders, folder],
      idToUpdate: folder.id
    })
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(n =>
      n.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    fetch(config.urlFolders, {
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

    fetch(config.urlNotes, {
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
      idToUpdate: this.state.idToUpdate,
      addNote: this.addNote,
      addFolder: this.addFolder,
      deleteNote: this.deleteNote,
    }
    return (
      <main className='App'>
        <Nav />
        <div className="group">
        <NotefulContext.Provider value={contextValue}>

          <ErrorBound>
            <Route exact path='/' component={FolderSidebar}/>
            <Route exact path='/' component={Main}/>
          </ErrorBound>

          <ErrorBound>
            <Route exact path='/folder/:folderId' component={FolderSidebar}/>
            <Route exact path='/folder/:folderId' component={Main}/>
          </ErrorBound>

          <ErrorBound>
            <Route exact path='/note/:noteId' component={SideBar}/>
            <Route exact path='/note/:noteId' component={NoteMain}/>
          </ErrorBound>

          <ErrorBound>
            <Route exact path='/addfolder' component={FolderSidebar}/>
            <Route exact path='/addfolder' component={AddFolder}/>
          </ErrorBound>

          <ErrorBound>
            <Route exact path='/addnote' component={FolderSidebar}/>
            <Route exact path='/addnote' component={AddNote}/>
          </ErrorBound>

          </NotefulContext.Provider>
        </div>
      </main>
    );
  }
}

export default App;