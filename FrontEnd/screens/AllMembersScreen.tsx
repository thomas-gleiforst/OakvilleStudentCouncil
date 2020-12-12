import React, { useState, useEffect } from "react"
import { Platform, StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"

import { Text, View } from "../components/Themed"

export default function AllMember() {
  const [filter, setFilter] = useState("")
  const [members, setMembers] = useState([
    {
      email: "",
      stuPass: "",
      firstName: "",
      middleName: "",
      lastName: "",
      loginDate: new Date(),
      joinDate: new Date(),
      points: 0,
    },
  ])

  useEffect(() => {
    const fetchData = async () =>
      fetch("/allStudent", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((json) => {
          setMembers(json.users)
        })

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.detailSearch}
        placeholder="Enter Name, Email, or Point Value"
        placeholderTextColor="#FFB61D"
        value={filter}
        onChangeText={(text) => setFilter(text)}
      />
      {members.map((member) => {
        return (
          <View
            style={styles.memberBox}
            key={member.firstName + member.lastName}
          >
            <Text style={styles.memberDetails}>
              {member.firstName} {member.lastName}
              {`${member.firstName} ${member.lastName} - ${member.email} - ${member.points}`}
            </Text>
          </View>
        )
      })}
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
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  memberBox: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 5,
    ...Platform.select({
      web: {
        width: 400,
      },
      default: {
        width: "90%",
      },
    }),
  },
  memberDetails: {
    color: "#FFB61D",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3,
    textAlign: "center",
  },
  detailSearch: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 20,
    color: "#FFB61D",
    fontSize: 20,
    textAlign: "center",
    ...Platform.select({
      web: {
        width: 400,
      },
      default: {
        width: "90%",
      },
    }),
  },
})
