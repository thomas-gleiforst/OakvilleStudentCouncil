import * as React from "react"
import { Dimensions, Platform, Pressable, StyleSheet } from "react-native"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"
import Navigation from "../navigation"

export default function Main({ navigation }: any) {
  var username: string = "Thomas"
  var events = [
    {
      title: "General Meeting 1",
      date: new Date().toLocaleString(),
      room: "204",
      location: "Oakville High School",
    },
    {
      title: "Volunteer at OMS",
      date: new Date(5000).toLocaleString(),
      room: "205",
      location: "Oakville High School",
    },
  ]
  var points = 6
  var pointGoal = 100

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {username}.</Text>
      <Text style={styles.title}>What would you like to do?</Text>
      <Pressable>
        <View style={styles.event}>
          <Text style={styles.eventTitle}>Scan QR code</Text>
        </View>
      </Pressable>
      <Text style={styles.title}>Here are your next events.</Text>
      {events.map((event) => {
        return (
          <Pressable key={event.title}>
            <View style={styles.event}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>
                Time: {event.date}
              </Text>
              <Text style={styles.eventDetails}>Room: {event.room}</Text>
              <Text style={styles.eventDetails}>{event.location}</Text>
            </View>
          </Pressable>
        )
      })}
      <Pressable onPress={() => navigation.navigate("Calendar")}>
        <Text style={styles.link}>Open Calendar</Text>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  event: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
    ...Platform.select({
      web: {
        width: Dimensions.get("window").width * 0.45,
      },
      default: {
        width: Dimensions.get("window").width * 0.6,
      },
    }),
  },
  eventDetails: {
    color: "#FFB61D",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3,
    textAlign: "center",
  },
  eventTitle: {
    color: "#FFB61D",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
  scanner: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
})
