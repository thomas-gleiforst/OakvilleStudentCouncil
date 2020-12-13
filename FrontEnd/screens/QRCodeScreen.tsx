import React, { useState, useEffect, useContext } from "react"
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import QR from "react-native-qrcode-svg";

import UserContext from "../UserContext"
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function QRCode({ navigation, route }: any) {
  const userContext = useContext(UserContext)
  const [event, setEvent] = useState({
    eventID: "default",
    eventName: "",
    event_desc: "",
    eventDate: new Date(),
  })
  const emptyUser = {
    email: "",
    stuPass: "",
    firstName: "",
    middleName: "",
    lastName: "",
    loginDate: new Date(),
    joinDate: new Date(),
    points: 0,
  }

  const [attendees, setAttendees] = useState([emptyUser])
  const [QRCode, setQRCode] = useState({
    pointValue: 0,
    eventID: ""
  })

  useEffect(() => {
    if (!userContext.eventID) return

    const fetchData = async () => {
      fetch("http://localhost:8080/eventDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventID: userContext.eventID,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setEvent(json) // ?
        })
    }
    const fetchAttendees = async () => {
      fetch("http://localhost:8080/events/viewAttendees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventID: userContext.eventID,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setAttendees(json)
        })
    }
    const fetchQRCode = async () => {
      fetch("http://localhost:8080/events/viewBarcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventID: userContext.eventID,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setQRCode(json)
        })
    }
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("run")
      console.log(route)
      fetchData()
      fetchAttendees()
    })

    return unsubscribe
  }, [navigation, userContext])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <View style={styles.QRcontainer}>
        <QR
          value={QRCode.eventID+"-"+QRCode.pointValue}
          backgroundColor="transparent"
          size={Dimensions.get("window").width*.6}
          logo={require("../assets/images/smallLogo.png")}
          logoSize={Dimensions.get("window").width*.2}
        />
      </View>
      <View style={styles.attendees}>
        <Text style={styles.subtitle}>Attendees ({attendees.length})</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {attendees.map((attendee) => {
            return <Text style={styles.attendee} key={attendee.firstName+attendee.lastName}>{attendee.firstName} {attendee.lastName}</Text>;
          })}
        </ScrollView>
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
    fontSize: 28,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  QRcontainer: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 25,
  },
  attendees: {
    height: "40%",
  },
  attendee: {
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
