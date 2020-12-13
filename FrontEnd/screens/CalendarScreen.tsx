import React, { useState, useEffect, useContext } from "react"
import { Pressable } from "react-native"
import { Platform, StyleSheet } from "react-native"
import { Text, View } from "../components/Themed"
import UserContext from "../UserContext"

export default function Calendar({ navigation }: any) {
  const userContext = useContext(UserContext)
  const [events, setEvents] = useState([
    {
      eventID: "",
      eventName: "",
      event_desc: "",
      eventDate: [{ eventDate: "" }],
    },
  ])

  let month: string = "January"
  let monthNum: number = 1
  let year: number = 2021
  let offset: number = 5
  let lastDay: number = 31

  useEffect(() => {
    const fetchData = async () =>
      fetch("http://localhost:8080/events", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setEvents(json)
        })
    
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })

    return unsubscribe
  }, [navigation])

  const meetingStats = (eventID: string) => {
    console.log(eventID)
    userContext.setEventID(eventID)
    navigation.navigate("MeetingStat")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{month}</Text>
      {Array.from(Array(6).keys()).map((week) => {
        return (
          <View style={styles.week} key={week}>
            {Array.from(Array(7).keys()).map((day) => {
              let dateCalc = day + 7 * week + 1 - offset
              return (
                <View style={styles.day} key={dateCalc}>
                  <Text style={styles.dayText}>
                    {dateCalc > 0 && dateCalc <= lastDay ? dateCalc : ""}
                  </Text>
                  {events.map((event) => {
                    return event.eventDate.map((date) => {
                      if (
                        parseInt(
                          new Date(date.eventDate)
                            .toLocaleDateString()
                            .split("/")[0]
                        ) === monthNum &&
                        parseInt(
                          new Date(date.eventDate)
                            .toLocaleDateString()
                            .split("/")[1]
                        ) === dateCalc &&
                        parseInt(
                          new Date(date.eventDate)
                            .toLocaleDateString()
                            .split("/")[2]
                        ) === year
                      ) {
                        return (
                          <Pressable
                            style={styles.event}
                            key={event.eventName}
                            onPress={() => meetingStats(event.eventID)}
                          >
                            <Text style={styles.eventText}>
                              {event.eventName}
                            </Text>
                          </Pressable>
                        )
                      } else {
                        return null
                      }
                    })
                  })}
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  day: {
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
    width: "10%",
    height: "100%",
    color: "#FFB61D",
    flexDirection: "column",
    alignItems: "center",
  },
  week: {
    flexDirection: "row",
    borderRadius: 5,
    margin: 5,
    width: "100%",
    height: "12.5%",
    justifyContent: "center",
  },
  event: {
    width: "90%",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#FFB61D",
    color: "white",
  },
  dayText: {
    fontSize: 16,
    color: "#FFB61D",
    textAlign: "center",
  },
  eventText: {
    textAlign: "center",
    color: "white",
    ...Platform.select({
      web: {
        fontSize: 12,
      },
      default: {
        fontSize: 8,
      },
    }),
  },
})
