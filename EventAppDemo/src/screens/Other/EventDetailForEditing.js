import { View,  StyleSheet } from "react-native";
import React from "react";
import DetailText from "../../components/DetailText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "react-native-vector-icons";
import * as SQLite from "expo-sqlite";
import Constants from "../../constants/Constants";
import Query from "../../constants/Queries";
import { Alert } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
const EventDetailForEditing = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.data;
  const edit = () => {
    // console.log(`ItemFirst:${JSON.stringify(item)}`);
    if (item.email == FIREBASE_AUTH.currentUser.email) {
      navigation.navigate(Constants.UpdateEventStr, { item });
    } else {
      Alert.alert("This Event is not created by You");
    }
  };

  const deleteEvent = () => {
    // console.log(`item:${JSON.stringify(item)}`);
    const db = SQLite.openDatabase("events.db");
    db.transaction((tx) => {
      tx.executeSql(
        Query.DELETE_EVENT,
        [item.id],
        (txObj, resultSet) => {
          // console.log(`${resultSet.rowsAffected}`);

          Alert.alert("Status", "Row Deleted", [
            {
              text: "OK",
              onPress: () => {
                navigation.pop();
              },
            },
          ]);
          // console.log('Rows deleted:', resultSet.rowsAffected);
        },
        (tx, error) => {
          alert(`Error deleting rows:${error.message}`);
          // console.log("Error deleting rows:", error);
        }
      );
    });
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
      {item.email == FIREBASE_AUTH.currentUser.email ? (
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-around",
          }}
        >
          <Feather
            name="edit"
            size={24}
            color="black"
            onPress={() => {
              edit();
            }}
          />
          <Feather
            name="trash-2"
            size={24}
            color="black"
            onPress={deleteEvent}
          />
        </View>
      ) : null}
    </View>
  );
};

export default EventDetailForEditing;

const styles = StyleSheet.create({
  textStyle: {
    textAlignVertical: "center",
    textAlign: "center",
    height: "100%",
    fontWeight: "bold",
    color: "white",
  },
  btnStyle: {
    borderRadius: 5,
    height: 40,
    backgroundColor: "#788EEC",
    width: "90%",
  },
});
