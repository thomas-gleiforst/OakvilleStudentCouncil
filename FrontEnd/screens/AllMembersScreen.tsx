import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
          <View style={styles.memberBox} key={member.name}>
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
    ...Platform.select({
      web: {
        width: 400,
      },
      default: {
        width: "90%"
      }
    })
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
        width: "90%"
      }
    })
  },
});
