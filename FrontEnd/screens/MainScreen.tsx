import * as React from "react";
import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function Main() {
  var username: string = "Thomas";
  var events = [
    {
      title: "General Meeting 1",
      date: Date.now(),
      room: "204",
      location: "Oakville High School",
    },
    {
      title: "Volunteer at OMS",
      date: Date.now() + 5000,
      room: "205",
      location: "Oakville High School",
    },
  ];
  var points = 6;
  var pointGoal = 100;
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
          <Pressable>
            <View style={styles.event}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>
                {event.date.toLocaleString()}
              </Text>
              <Text style={styles.eventDetails}>Room: {event.room}</Text>
              <Text style={styles.eventDetails}>{event.location}</Text>
            </View>
          </Pressable>
        );
      })}
      <Text style={styles.link}>Open Calendar</Text>
    </View>
  );
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
  },
  eventDetails: {
    color: "#FFB61D",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3,
  },
  eventTitle: {
    color: "#FFB61D",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  link: {
    textDecorationLine: "underline",
  }
});
