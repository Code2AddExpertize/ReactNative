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
import ReusableEventList from "../Other/ReusableEventList";
import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import Query from "../../constants/Queries";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
export default function MyEvents() {
  const user_name = FIREBASE_AUTH.currentUser.displayName;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [eventsList, setEventsList] = useState([]);

  const handleButtonPress = () => {
    navigation.navigate(Constants.CreateEventStr);
  };

  const getEventList = () => {
    let email = FIREBASE_AUTH.currentUser.email;
    const db = SQLite.openDatabase("events.db");
    db.transaction((tx) => {
      tx.executeSql(
        Query.READ_BY_EMAIL_AND_NOMI,
        [email],
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
    getNominationsLIst();
  };

  const getNominationsLIst = () => {
    const db = SQLite.openDatabase("events.db");
    db.transaction((tx) => {
      tx.executeSql(
        Query.READ_ALL_NOMI,
        [],
        (tx, results) => {
          //  console.log(`Nominations Length:${results.rows._array.length}`);
        },
        (tx, error) => {
          alert(error.message);
        }
      );
    });
  };
  const onScreenFocus = () => {
    getEventList();
  };
  useEffect(
    React.useCallback(() => {
      if (isFocused) {
        navigation.removeListener("focus", onScreenFocus);
        const unsubscribe = navigation.addListener("focus", onScreenFocus);
        return () => {
          unsubscribe;
        };
      }
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", marginLeft: 15, marginBottom: 2,marginTop:5,alignSelf:'flex-start' }}>
        <Text style={{ fontWeight: "bold" }}>User: </Text>
        <Text
          style={{ fontStyle: "italic", fontWeight: "500" }}
          numberOfLines={1}
        >
          {user_name}
        </Text>
      </View>
      <ReusableEventList
        valid={true}
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
