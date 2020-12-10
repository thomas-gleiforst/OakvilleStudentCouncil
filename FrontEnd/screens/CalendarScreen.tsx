import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function Calendar() {
  let month: string = "January"
  let offset: number = 5
  let lastDay: number = 31
  let events = [{name: "General Meeting", date: "1/7/20", time: "5:00 pm"}, {name: "OMS Service Hrs", date: "1/12/20", time: "5:00 pm"}, {name: "General Meeting", date: "1/14/20", time: "5:00 pm"}, {name: "General Meeting", date: "1/21/20", time: "5:00 pm"}, {name: "General Meeting", date: "1/28/20", time: "5:00 pm"}]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{month}</Text>
      {Array.from(Array(6).keys()).map((week) => {
        return (
          <View style={styles.week} key={week}>
            {Array.from(Array(7).keys()).map((day) => {
              return (
                <View style={styles.day} key={day+7*week+1-offset}>
                  <Text style={styles.dayText}>
                    {day + 7 * week + 1 - offset > 0 && day + 7 * week + 1 - offset <= lastDay ? day + 7 * week + 1 - offset : ''}
                  </Text>
                  {events.map((event) => {
                    if (
                      parseInt(event.date.split('/')[1]) ==
                      day + 7 * week + 1 - offset
                    ) {
                      return (
                        <View style={styles.event} key={event.name}>
                          <Text style={styles.eventText}>{event.name}</Text>
                        </View>
                      )
                    } else {
                      return
                    }
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
    fontSize: 16,
    color: "#FFB61D",
    textAlign: "center",
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
    fontSize: 10,
    backgroundColor: "#FFB61D",
    color: "white",
  }
});
