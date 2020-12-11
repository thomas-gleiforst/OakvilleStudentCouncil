import * as React from "react";
import { Pressable, StyleSheet, TextInput, Image, Platform, Dimensions } from "react-native";

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
          placeholderTextColor="#fff"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.title}
          placeholder="Password"
          placeholderTextColor="#fff"
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
    margin: 15,
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
    color: "#FFB61D",
    backgroundColor: "#fff",
    margin: 25,
    padding: 10,
    borderRadius: 25,
    fontSize: 24,
    lineHeight: 48,
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
