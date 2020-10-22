import React from 'react';
import { Route } from 'react-router-dom'
import Nav from './Nav/Nav'
import SideBar from './SideBar/SideBar'
import Main from './Main/Main'
import './App.css'
import FolderSidebar from './FolderSidbar/FolderSidebar'
import STORE from './store.js'

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    this.setState({
      notes: STORE.notes,
      folders: STORE.folders
    })
  }

  render(){
    return (
      <main className='App'>
        <Nav />
        <div className="group">
          <Route path='/:folderId' render={routeProps => (
            <>
              <SideBar 
                folders={this.state.folders}
                notes={this.state.notes}
                {...routeProps}/> 
              <Main 
                store={this.state}
                {...routeProps}/>
            </>
            )}
          />
        </div>
      </main>
    );
  }
}

export default App;