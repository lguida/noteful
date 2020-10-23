import React from 'react';
import { Route } from 'react-router-dom'
import Nav from './Nav/Nav'
import SideBar from './SideBar/SideBar'
import Main from './Main/Main'
import './App.css'
import FolderSidebar from './FolderSidbar/FolderSidebar'
import NotefulContext from './NotefulContext'
import NoteMain from './NoteMain/NoteMain'
import STORE from './store.js'

class App extends React.Component {
  state = {
    notes: [],
    folders: []
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
    this.setState({
      notes: STORE.notes,
      folders: STORE.folders
    })
  }

  render(){
    const contextValue = {
      store: STORE,
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