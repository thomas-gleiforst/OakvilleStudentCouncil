import React, { useState, useContext, useEffect } from "react"
import {
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Dimensions,
} from "react-native"

import { Text, View } from "../components/Themed"

import UserContext from "../UserContext"

export default function Home({ navigation }: any) {
  const userContext = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const createAccount = (navigation: any) => {
    return navigation.navigate("CreateUser")
  }

  const logIn = (navigation: any) => {
    // if authenticated
    fetch("http://localhost:8080/loginStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 401) {
        response.text().then((text) => {
          alert(text)
        })
      } else {
        userContext.setEmail(email)
        return navigation.navigate("Main")
      }
    })
  }

  useEffect(() => {}, [userContext])

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/OHS-Logo.png")}
      />
      <View>
        <TextInput
          style={styles.title}
          placeholder="School Email"
          placeholderTextColor="#fff"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.title}
          placeholder="Password"
          placeholderTextColor="#fff"
          textContentType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable
          style={styles.clickableText}
          onPress={() => createAccount(navigation)}
        >
          <Text style={styles.clickableText}>Create Account</Text>
        </Pressable>
        <Pressable onPress={() => logIn(navigation)}>
          <Text style={styles.button}>Log In</Text>
        </Pressable>
      </View>
    </View>
  )
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
        width: Dimensions.get("window").width * 0.45,
      },
      default: {
        width: Dimensions.get("window").width * 0.6,
      },
    }),
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
        width: Dimensions.get("window").width * 0.45,
        boxShadow: "1px 5px 5px rgba(0,0,0,0.25)",
      },
      default: {
        width: Dimensions.get("window").width * 0.6,
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
  },
})
