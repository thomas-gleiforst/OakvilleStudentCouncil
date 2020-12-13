import React from "react"

const UserContext = React.createContext({
  email: "",
  eventID: "",
  setEmail: (email: string) => {},
  setEventID: (eventID: string) => {}
})

export default UserContext
