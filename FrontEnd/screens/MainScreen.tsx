import React, { useState, useEffect, useContext } from "react"
import { Dimensions, Platform, Pressable, StyleSheet } from "react-native"
import { Text, View } from "../components/Themed"
import UserContext from "../UserContext"

export default function Main({ navigation }: any) {
  const userContext = useContext(UserContext)
  const [events, setEvents] = useState([
    {
      eventID: "",
      eventName: "",
      event_desc: "",
      eventDate: [{ eventDate: "" }],
    },
  ])
  const [user, setUser] = useState({
    email: "",
    stuPass: "",
    firstName: "",
    middleName: "",
    lastName: "",
    loginDate: new Date(),
    joinDate: new Date(),
    points: 0,
  })
  useEffect(() => {
    if (!userContext || !userContext.email) return

    const fetchData = async () => {
      fetch("http://localhost:8080/events", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          setEvents(json)
        })
    }
    const fetchUser = async () => {
      fetch("http://localhost:8080/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userContext.email,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setUser(json)
        })
    }
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData()
      fetchUser()
    })

    return unsubscribe
  }, [navigation, userContext])

  const scanQR = (navigation: any) => {
    navigation.navigate("Scanner")
  }

  var pointGoal = 100
  let monthNum: number = 1
  let year: number = 2021
  let offset: number = 5

  return (
    <>
      {userContext && userContext.email ? (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome {user.firstName}.</Text>
          <Text style={styles.title}>
            You have {user.points} out of {pointGoal} points
          </Text>
          <Text style={styles.title}>What would you like to do?</Text>
          <Pressable onPress={() => scanQR(navigation)}>
            <View style={styles.event}>
              <Text style={styles.eventTitle}>Scan QR code</Text>
            </View>
          </Pressable>
          <Text style={styles.title}>Here are your next events.</Text>
          {events &&
            events.map((event) => {
              return event.eventDate.map((date) => {
                if (new Date(date.eventDate) > new Date()) {
                  return (
                    <Pressable key={event.eventName}>
                      <View style={styles.event}>
                        <Text style={styles.eventTitle}>{event.eventName}</Text>
                        <Text style={styles.eventDetails}>
                          Date: {new Date(date.eventDate).toLocaleDateString()}
                        </Text>
                        <Text style={styles.eventDetails}>
                          Time: {new Date(date.eventDate).toLocaleTimeString()}
                        </Text>
                        {/*<Text style={styles.eventDetails}>Room: {event.room}</Text>
              <Text style={styles.eventDetails}>{event.location}</Text>*/}
                      </View>
                    </Pressable>
                  )
                }
              })
            })}
          <Pressable onPress={() => navigation.navigate("Calendar")}>
            <Text style={styles.link}>Open Calendar</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Please sign in</Text>
        </View>
      )}
    </>
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
