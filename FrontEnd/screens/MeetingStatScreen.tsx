import React, { useState, useEffect, useContext } from "react"
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native"

import UserContext from "../UserContext"
import { Text, View } from "../components/Themed"

function changeEvent() {
  return false
}

function resort() {
  return false
}

export default function MeetingStat({ navigation, route }: any) {
  const userContext = useContext(UserContext)
  const emptyUser = {
    email: "",
    stuPass: "",
    firstName: "",
    middleName: "",
    lastName: "",
    loginDate: new Date(),
    joinDate: new Date(),
    points: 0,
  }
  const [event, setEvent] = useState({
    eventID: "",
    eventName: "",
    event_desc: "",
    eventDate: new Date(),
  })
  const [attendees, setAttendees] = useState([emptyUser])
  const [pointValue, setPointValue] = useState(0)

  let sortOptions = Object.keys(emptyUser)
  let sortBy = sortOptions[0]

  useEffect(() => {
    if (!userContext.eventID) return

    const fetchData = async () => {
      fetch("http://localhost:8080/eventDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventID: userContext.eventID,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setEvent(json) // ?
        })
    }
    const fetchAttendees = async () => {
      fetch("http://localhost:8080/events/viewAttendees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventID: userContext.eventID,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setAttendees(json)
        })
    }
    const fetchQRCode = async () => {
      fetch("http://localhost:8080/events/viewBarcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventID: userContext.eventID,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setPointValue(json.pointValue)
        })
    }
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("run")
      console.log(route)
      fetchData()
      fetchAttendees()
    })

    return unsubscribe
  }, [navigation, userContext])

  const displayEvent = (navigation: any) => {
    navigation.navigate("QRCode", { event: event.eventID })
  }

  console.log(attendees)

  return (
    <>
      {event ? (
        <View style={styles.container}>
          <Text style={styles.title}>{event.eventName}</Text>
          <View style={styles.row}>              
            {/* Disabled changing event viewed - not implemented
            <Pressable onPress={changeEvent}>
              <Text style={styles.button}>Change Event</Text>
            </Pressable>              
            */}
            <Pressable onPress={() => displayEvent(navigation)}>
              <Text style={styles.button}>Display Event</Text>
            </Pressable>
          </View>
          <View style={styles.analytics}>
            <View style={styles.stats}>
              <Text style={styles.subtitle}>Stats</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.attendee}>
                  <Text style={styles.stat}>Total Attended</Text>
                  <Text style={styles.stat}>{attendees.length}</Text>
                </View>
                <View style={styles.attendee}>
                  <Text style={styles.stat}>Total Points</Text>
                  <Text style={styles.stat}>
                    {attendees.reduce((a, b) => a + b.points, 0) || 0}
                  </Text>
                </View>
                <View style={styles.attendee}>
                  <Text style={styles.stat}>Point Value</Text>
                  <Text style={styles.stat}>
                    {pointValue}
                  </Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.attendees}>
              <Text style={styles.subtitle}>
                <Text>Attendance</Text>
              </Text>
              {/* Disabled sorting of attendance list - not implemented
              <Pressable onPress={resort}>
                <Text style={styles.button}>Sort By: {sortBy}</Text>
              </Pressable>
              */}
              <View style={styles.attendee}>
                <Text style={styles.header}>Attendees</Text>
                <Text style={styles.header}>Points</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {attendees.map((attendee) => {
                  return (
                    <View
                      style={styles.attendee}
                      key={attendee.firstName + attendee.lastName}
                    >
                      <Text style={styles.stat}>
                        {attendee.firstName} {attendee.lastName}
                      </Text>
                      <Text style={styles.stat}>{attendee.points}</Text>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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
