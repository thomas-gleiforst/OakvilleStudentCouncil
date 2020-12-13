import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { ActivityIndicatorComponent } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"

import UserContext from "./UserContext"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  const [globalEmail, setGlobalEmail] = useState("")
  const [globalEventID, setGlobalEventID] = useState("")

  const setEmail = (email: string) => {
    setGlobalEmail(email)
  }

  const setEventID = (eventID: string) => {
    setGlobalEventID(eventID)
  }

  const globalUser = {
    email: globalEmail,
    eventID: globalEventID,
    setEmail,
    setEventID
  }


  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <UserContext.Provider value={globalUser}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </UserContext.Provider>
      </SafeAreaProvider>
    )
  }
}
