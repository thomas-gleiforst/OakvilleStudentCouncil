import React, { useState, useEffect } from "react"
import { Platform, StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"

import { Text, View } from "../components/Themed"

export default function AllMember({ navigation }: any) {
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
  const [avg, setAvg] = useState(0)
  const [max, setMax] = useState(0)
  const [sum, setSum] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      fetch("http://localhost:8080/allStudents", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          setMembers(json.users)
        })
    }
    const fetchAvgPoints = async () => {
      fetch("http://localhost:8080/averagePoints", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          setAvg(parseInt(json[0].avg))
        })
    }
    const fetchMaxPoints = async () => {
      fetch("http://localhost:8080/maxPoints", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          setMax(parseInt(json[0].max))
        })
    }
    const fetchSumPoints = async () => {
      fetch("http://localhost:8080/sumPoints", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          setSum(parseInt(json[0].sum))
        })
    }
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData()
      fetchAvgPoints()
      fetchMaxPoints()
      fetchSumPoints()
    })

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.attendee}>
        <Text style={styles.stat}>Total Points Earned: </Text>
        <Text style={styles.stat}>{sum}</Text>
      </View>
      <View style={styles.attendee}>
        <Text style={styles.stat}>Max Points Earned: </Text>
        <Text style={styles.stat}>{max}</Text>
      </View>
      <View style={styles.attendee}>
        <Text style={styles.stat}>Avg Points Earned: </Text>
        <Text style={styles.stat}>{avg}</Text>
      </View>
      <TextInput
        style={styles.detailSearch}
        placeholder="Enter Name, Email, or Point Value"
        placeholderTextColor="#FFB61D"
        value={filter}
        onChangeText={(text) => setFilter(text)}
      />
      {members.map((member) => {
        if (member.firstName && member.lastName && member.email) {
          if (filter === "" || (
            (member.firstName.toLowerCase().includes(filter.toLowerCase())) ||
            (member.lastName.toLowerCase().includes(filter.toLowerCase()) ||
            ((member.firstName.toLowerCase()+member.lastName.toLowerCase()).includes(filter.toLowerCase())) ||
            (member.email.toLowerCase().includes(filter.toLowerCase())) ||
            (filter[0] == ">" && member.points > parseInt(filter.slice(1))) ||
            (filter[0] == "<" && member.points < parseInt(filter.slice(1))) ||
            (filter[0] == "=" && member.points === parseInt(filter.slice(1)))))) {
          return (
            <View
              style={styles.memberBox}
              key={member.firstName + member.lastName}
            >
              <Text style={styles.memberDetails}>
                {`${member.firstName} ${member.lastName} - ${member.email} - ${member.points}`}
              </Text>
            </View>
          )}
        }
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
  attendee: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    fontSize: 20,
  },
})
