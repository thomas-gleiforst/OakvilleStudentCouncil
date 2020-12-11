import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import QR from "react-native-qrcode-svg";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function QRCode() {
  let meeting = {
    name: "General Meeting",
    date: "1/7/20",
    time: "5:00 pm",
    attendees: [
      { name: "Thomas Gleiforst", email: "18gleiforstt@msdr9.edu", points: 6 },
      { name: "Tommy Dong", email: "18dongt@msdr9.edu", points: 24 },
    ],
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meeting.name}</Text>
      <View style={styles.QRcontainer}>
        <QR
          value={meeting.name + meeting.date + meeting.time}
          backgroundColor="transparent"
          size={Dimensions.get("window").width*.6}
          logo={require("../assets/images/smallLogo.png")}
          logoSize={Dimensions.get("window").width*.2}
        />
      </View>
      <View style={styles.attendees}>
        <Text style={styles.subtitle}>Attendees ({meeting.attendees.length})</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {meeting.attendees.map((attendee) => {
            return <Text style={styles.attendee} key={attendee.name}>{attendee.name}</Text>;
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
