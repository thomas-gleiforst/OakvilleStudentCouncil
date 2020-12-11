import * as React from "react";
import { Dimensions, Platform, Pressable, StyleSheet, TextInput } from "react-native";

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
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.title}
        placeholder="Event Location"
        textContentType="location"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.title}
        placeholder="Event Room"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.title}
        placeholder="Event Date(s)"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.title}
        placeholder="Event Description"
        placeholderTextColor="#fff"
      />
      <Pressable onPress={createEvent}>
        <Text style={styles.button}>Create Event</Text>
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
    ...Platform.select({
      web: {
        width: Dimensions.get("window").width*.45,
      },
      default: {
        width: Dimensions.get("window").width*.60,
      }
    })
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
        width: Dimensions.get("window").width*.45,
        boxShadow: "1px 5px 5px rgba(0,0,0,0.25)",
      },
      default: {
        width: Dimensions.get("window").width*.60,
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 5,
      },
    })

  },
});
