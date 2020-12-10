import { processFontFamily } from "expo-font";
import * as React from "react";
import { Button, Pressable, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

function createAccount() {
  return false;
}

export default function CreateUser() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholder="School Email"
        textContentType="emailAddress"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.title}
        placeholder="Password"
        textContentType="password"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.title}
        placeholder="Confirm Password"
        textContentType="password"
        placeholderTextColor="#fff"
      />
      <Pressable style={styles.button} onPress={createAccount}>
        Create Account
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
    fontSize: 20,
    color: "#fff",
    borderBottomWidth: 2,
    borderColor: "#fff",
    margin: 15,
    fontFamily: "Arial",
  },
  button: {
    color: "#FFB61D",
    backgroundColor: "#fff",
    margin: 25,
    padding: 10,
    borderRadius: 25,
    fontSize: 24,
    width: "45vw",
    lineHeight: 48,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Arial",
    boxShadow: "1px 5px 5px rgba(0,0,0,0.25)",
  },
});
