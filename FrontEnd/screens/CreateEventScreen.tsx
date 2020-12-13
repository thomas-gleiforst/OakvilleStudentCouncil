import React, { useState } from "react"
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native"

import { Text, View } from "../components/Themed"
import { forModalPresentationIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators"

// TODO: Datepicker should support multiple dates
// TODO: Native datepicker for non-web platforms
export default function CreateEventScreen() {
  const [eventName, setEventName] = useState("")
  const [eventDesc, setEventDesc] = useState("")
  const [dates, setDates] = useState("")
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")
  const [room, setRoom] = useState("")
  const [points, setPoints] = useState("")

  const createEvent = () => {
    if (eventName && eventDesc && location && room && dates) {
      // TODO: Date validation
      // const trueDates = dates.map((date) => {
      const dateArray = dates.split("-")
      const newDate = new Date(
        Number(dateArray[2]),  //year
        Number(dateArray[0])-1,//month counting from 0
        Number(dateArray[1]),  //day
        Number(dateArray[3]), 
        Number(dateArray[4]),
        Number(dateArray[5]),
      )
      console.log(newDate)
      //   return newDate
      // })

      fetch("http://localhost:8080/createEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: eventName,
          event_desc: eventDesc,
          eventDates: [newDate.toString()],
          locationName: location,
          address: address,
          room: Number(room),
          points: Number(points),
        }),
      })
      .then((response) => response.text())
      .then((response) => alert(response))
    } else {
      alert("You need to fill in everything!!!")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholder="Event Name"
        placeholderTextColor="#fff"
        value={eventName}
        onChangeText={(text) => setEventName(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Event Description"
        placeholderTextColor="#fff"
        value={eventDesc}
        onChangeText={(text) => setEventDesc(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="mm-dd-yyyy-hh-mm-ss"
        placeholderTextColor="#fff"
        value={dates}
        onChangeText={(text) => setDates(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Event Location"
        textContentType="location"
        placeholderTextColor="#fff"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Event Address"
        textContentType="fullStreetAddress"
        placeholderTextColor="#fff"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Event Room"
        placeholderTextColor="#fff"
        value={room}
        onChangeText={(text) => setRoom(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Event Points"
        placeholderTextColor="#fff"
        value={points}
        onChangeText={(text) => setPoints(text)}
      />
      <Pressable onPress={createEvent}>
        <Text style={styles.button}>Create Event</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: 15,
    fontSize: 20,
    borderBottomWidth: 2,
    color: "#fff",
    borderColor: "#fff",
    ...Platform.select({
      web: {
        width: Dimensions.get("window").width * 0.45,
      },
      default: {
        width: Dimensions.get("window").width * 0.6,
      },
    }),
  },
  button: {
    margin: 25,
    marginTop: 100,
    padding: 10,
    borderRadius: 25,
    fontSize: 24,
    lineHeight: 48,
    backgroundColor: "#fff",
    color: "#FFB61D",
    textAlign: "center",
    fontWeight: "bold",
    ...Platform.select({
      web: {
        width: Dimensions.get("window").width * 0.45,
        boxShadow: "1px 5px 5px rgba(0,0,0,0.25)",
      },
      default: {
        width: Dimensions.get("window").width * 0.6,
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 5,
      },
    }),
  },
})
