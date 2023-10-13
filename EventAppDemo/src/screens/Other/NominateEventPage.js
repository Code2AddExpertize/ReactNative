import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import Constants from "../../constants/Constants";
import EventList from "./ReusableEventList";
import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import Query from "../../constants/Queries";
export default function NominateEventPage() {
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
        Query.READ,
        [],
        (tx, results) => {
          let list = results.rows._array.sort((a, b) => {


            let aDate = new Date(a.date);
            let bDate = new Date(b.date);
            return aDate-bDate;
              // if(aDate<bDate){
              //   return -1;
              // }else if(aDate>bDate){
              //   return 1;
              // }else{
              //   return 0;
              // }
          });
          setEventsList(list);
          // eventsList=eventsList.sort((a,b)=>new Date(a.date)- new Date(b.date));
          // setEventsList(eventsList);
        },
        (tx, error) => {
          alert(error.message);
        }
      );
    });
    // console.log(`EventList:${JSON.stringify(eventsList)}`);
  };

  useEffect(
    React.useCallback(() => {
      const onScreenFocus = () => {
        getEventList();
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
      <EventList
        style={{ flex: 1 }}
        eventsList={eventsList}
        callback={getEventList}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "#0095F4",
          borderRadius: 30,
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleButtonPress}
      >
        <Text style={{ color: "white", fontSize: 24 }}>+</Text>
      </TouchableOpacity>
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
