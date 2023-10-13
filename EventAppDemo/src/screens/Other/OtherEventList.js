import { StyleSheet,  SafeAreaView } from "react-native";
import Constants from "../../constants/Constants";
import ResusableEventList from "./ReusableEventList";
import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import Query from "../../constants/Queries";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function OtherEventList() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [eventsList, setEventsList] = useState([]);

  const handleButtonPress = () => {
    navigation.navigate(Constants.CreateEventStr);
  };

  const getEventList = () => {
    const db = SQLite.openDatabase("events.db");
    db.transaction((tx) => {
      tx.executeSql(
        Query.READ_OTHER_EVENTS_2,
        [FIREBASE_AUTH.currentUser.email],
        (tx, results) => {
          let list = results.rows._array.sort((a, b) => {
            let aDate = new Date(a.date);
            let bDate = new Date(b.date);
            return aDate - bDate;
          });
          setEventsList(list);
        },
        (tx, error) => {
          alert(error.message);
        }
      );
    });
  };

  useEffect(
    React.useCallback(() => {
      const onScreenFocus = () => {
        try {
          getEventList();
        } catch (error) {
          console.log(JSON.stringify(error))
        }
      };
      if (isFocused) {
        const unsubscribe = navigation.addListener("focus", onScreenFocus);
        return () => {
          unsubscribe;
        };
      }
    }, [isFocused, navigation])
  );
  return (
    <SafeAreaView style={styles.container}>
      <ResusableEventList
        valid={false}
        style={{ flex: 1 }}
        eventsList={eventsList}
        callback={getEventList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
