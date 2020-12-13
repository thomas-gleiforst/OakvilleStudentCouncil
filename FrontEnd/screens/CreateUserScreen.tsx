import React, { useState } from "react"

import {
  Button,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"

export default function CreateUser({ navigation }: any) {
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const createAccount = (navigation: any) => {
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        fetch("http://localhost:8080/newStudent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            stuPass: password,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
          }),
        })
        .then((response) => response.json())
        .then((response) => console.log(response))
        navigation.navigate("Main")
      }
    }
    else {
      alert("Not sent for some reason")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholder="First Name"
        textContentType="givenName"
        placeholderTextColor="#fff"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Middle Name"
        textContentType="middleName"
        placeholderTextColor="#fff"
        value={middleName}
        onChangeText={(text) => setMiddleName(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Last Name"
        textContentType="familyName"
        placeholderTextColor="#fff"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="School Email"
        textContentType="emailAddress"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Password"
        textContentType="password"
        placeholderTextColor="#fff"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Confirm Password"
        textContentType="password"
        placeholderTextColor="#fff"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Pressable onPress={() => createAccount(navigation)}>
        <Text style={styles.button}>Create Account</Text>
      </Pressable>
    </View>
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
})
