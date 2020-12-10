import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function AllMember() {
  var members = [
    { name: "Thomas Gleiforst", email: "18gleiforstt@msdr9.edu", points: 6 },
    { name: "Tommy Dong", email: "18dongt@msdr9.edu", points: 24 },
  ];
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.detailSearch}
        placeholder="Enter Name, Email, or Point Value"
        placeholderTextColor="#FFB61D"
      />
      {members.map((member) => {
        return (
          <View style={styles.memberBox}>
            <Text style={styles.memberDetails}>
              {member.name + " - " + member.email + " - " + member.points}
            </Text>
          </View>
        );
      })}
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
    width: "75%",
  },
  memberDetails: {
    color: "#FFB61D",
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom: "2.5px",
    textAlign: "center",
  },
  detailSearch: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 20,
    width: "75%",
    color: "#FFB61D",
    fontSize: 20,
    textAlign: "center",
  },
});
