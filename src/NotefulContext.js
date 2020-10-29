import React from 'react'

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  idToUpdate: '',
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default NotefulContext