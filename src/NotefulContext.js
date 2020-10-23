import React from 'react'

const NotefulContext = React.createContext({
  store: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default NotefulContext