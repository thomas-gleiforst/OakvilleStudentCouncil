import * as React from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

function createEvent() {
  return false
}

export default function CreateEventScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholder="Event Name"
      />
      <TextInput
        style={styles.title}
        placeholder="Event Location"
        textContentType="location"
      />
      <TextInput
        style={styles.title}
        placeholder="Event Room"
      />
      <TextInput
        style={styles.title}
        placeholder="Event Date(s)"
      />
      <TextInput
        style={styles.title}
        placeholder="Event Description"
      />
      <Pressable style={styles.button} onPress={createEvent}>
        Create Event
      </Pressable>
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
    margin: 15,
    fontSize: 20,
    borderBottomWidth: 2,
    color: "#fff",
    borderColor: "#fff",
    placeholderTextColor: "#fff",
    fontFamily: "Arial",
  },
  button: {
    margin: 25,
    marginTop: 100,
    padding: 10,
    borderRadius: 25,
    fontSize: 24,
    lineHeight: 48,
    width: "45vw",
    backgroundColor: "#fff",
    color: "#FFB61D",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Arial",
    boxShadow: "1px 5px 5px rgba(0,0,0,0.25)",
  },
});
