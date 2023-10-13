import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import DetailText from "../../components/DetailText";
import { useNavigation, useRoute } from "@react-navigation/native";
import Query from "../../constants/Queries";
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
const EventDetailForNomination = () => {
  const route = useRoute();
  const item = route.params?.data;
  const navigation =useNavigation();
  const insertNominations = () => {
    try {
      const db = SQLite.openDatabase("events.db");
      // console.log(item);
      db.transaction((tx) => {
        tx.executeSql(
          Query.INSERT_INTO_NOMINATIONS,
          [`${FIREBASE_AUTH.currentUser.email}`, `${item.id}`],
          (tx, results) => {
            // console.log(results.insertId);
            Alert.alert("Status", "Nominations Done Successfully", [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]);
            // alert('Event inserted Successfully');
          },
          (tx, error) => {
            // console.log(JSON.stringify(error.message));
            alert("Error inserting event:", error.message);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Constant Margin
  const marginBetween = 20;
  return (
    <View style={{ alignItems: "center" }}>
      <View height={marginBetween} />

      <DetailText label="Name of the Event" text={item.name} width="90%" />
      <View height={marginBetween} />

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <DetailText label={"Date"} text={item.dateToShow} width="50%" />
        <DetailText label={"Time"} text={item.time} width="40%" />
      </View>
      <View height={marginBetween} />
      <DetailText label="Location" text={item.location} width="90%" />
      <View height={marginBetween} />
      <DetailText label="Event Type" text={item.event_type} width="90%" />
      <View height={marginBetween} />
      <DetailText
        label="Registration Type"
        text={item.registration_type}
        width="90%"
      />
      <View height={marginBetween} />
      {item.registration_type === "Paid" ? (
        <DetailText label="Amount" text={item.amount} width="90%" />
      ) : null}
      <View height={marginBetween} />
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => {
          insertNominations();
        }}
      >
        <Text style={styles.textStyle}>{"Nominate"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetailForNomination;

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "bold",
    color: "white",
  },
  btnStyle: {
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
    height: 40,
    backgroundColor: "#788EEC",
    width: "90%",
  },
});
