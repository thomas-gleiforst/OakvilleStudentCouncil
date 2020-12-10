import * as React from "react";
import { Pressable, StyleSheet, TextInput, Image } from "react-native";

import { Text, View } from "../components/Themed";

function createAccount( navigation: any) {
  console.log(navigation)
  return navigation.navigate("CreateUser")
}

function logIn(navigation: any) {
  // if authenticated
  return navigation.navigate("Main")
}

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/OHS-Logo.png")} />
      <View>
        <TextInput
          style={styles.title}
          placeholder="School Email"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.title}
          placeholder="Password"
          textContentType="password"
        />
        <Pressable style={styles.clickableText} onPress={() => createAccount(navigation)}>
          <Text style={styles.clickableText}>Create Account</Text>
        </Pressable>
        <Pressable onPress={() => logIn(navigation)}>
          <Text style={styles.button}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    borderBottomWidth: 2,
    borderColor: "#fff",
    placeholderTextColor: "#fff",
    margin: 15,
  },
  button: {
    color: "#FFB61D",
    backgroundColor: "#fff",
    margin: 25,
    padding: 10,
    borderRadius: 25,
    fontSize: 24,
    //width: Math.round(window.innerWidth*.45),
    lineHeight: 48,
    textAlign: "center",
    fontWeight: "bold",
    // boxShadow: "1px 5px 5px rgba(0,0,0,0.25)",
  },
  clickableText: {
    color: "#fff",
    margin: 5,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  logo: {
    width: "90%",
    height: "25%",
  }
});
