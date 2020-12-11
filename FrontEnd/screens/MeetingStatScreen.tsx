import * as React from "react"
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native"

import { Text, View } from "../components/Themed"

function changeEvent() {
  return false
}

function resort() {
  return false
}

export default function MeetingStat() {
  let events = [
    { name: "General Meeting", date: "1/7/20", time: "5:00 pm" },
    { name: "OMS Service Hrs", date: "1/12/20", time: "5:00 pm" },
    { name: "General Meeting", date: "1/14/20", time: "5:00 pm" },
    { name: "General Meeting", date: "1/21/20", time: "5:00 pm" },
    { name: "General Meeting", date: "1/28/20", time: "5:00 pm" },
  ]
  let event = {
    name: "General Meeting",
    date: "1/7/20",
    time: "5:00 pm",
    totalPoints: "30",
    attendees: [
      { name: "Thomas Gleiforst", email: "18gleiforstt@msdr9.edu", points: 6 },
      { name: "Tommy Dong", email: "18dongt@msdr9.edu", points: 24 },
    ],
  }
  let sortOptions = Object.keys(event.attendees[0])
  let sortBy = sortOptions[0]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Pressable onPress={changeEvent}>
        <Text style={styles.button}>Change Event</Text>
      </Pressable>
      <View style={styles.analytics}>
        <View style={styles.stats}>
          <Text style={styles.subtitle}>Stats</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.attendee}>
              <Text style={styles.stat}>Total Attended</Text>
              <Text style={styles.stat}>{event.attendees.length}</Text>
            </View>
            <View style={styles.attendee}>
              <Text style={styles.stat}>Total Points</Text>
              <Text style={styles.stat}>{event.totalPoints}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.attendees}>
          <Text style={styles.subtitle}>
            <Text>Attendance</Text>
          </Text>
          <Pressable onPress={resort}>
            <Text style={styles.button}>Sort By: {sortBy}</Text>
          </Pressable>
          <View style={styles.attendee}>
            <Text style={styles.header}>Attendees</Text>
            <Text style={styles.header}>Points</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {event.attendees.map((attendee) => {
              return (
                <View style={styles.attendee} key={attendee.name}>
                  <Text style={styles.stat}>{attendee.name}</Text>
                  <Text style={styles.stat}>{attendee.points}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  analytics: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: "80%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 25,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  stats: {
    textAlign: "center",
    height: "30%",
    ...Platform.select({
      web: {
        width: Dimensions.get("window").width * 0.5,
      },
      default: {
        width: Dimensions.get("window").width * 0.8,
      },
    }),
  },
  attendees: {
    textAlign: "center",
    ...Platform.select({
      web: {
        width: Dimensions.get("window").width * 0.5,
        height: "50%",
      },
      default: {
        width: Dimensions.get("window").width * 0.8,
        height: "60%",
      },
    }),
  },
  attendee: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 7,
    fontSize: 18,
    lineHeight: 24,
    backgroundColor: "#fff",
    color: "#FFB61D",
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center",
    ...Platform.select({
      web: {
        width: Dimensions.get("window").width * 0.3,
        boxShadow: "1px 5px 5px rgba(0,0,0,0.25)",
      },
      default: {
        width: Dimensions.get("window").width * 0.4,
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
  stat: {
    fontSize: 20,
  },
  header: {
    fontSize: 16,
  },
})
