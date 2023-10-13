import React from "react";
import {  FlatList, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "../../constants/Constants";
function ResusableEventList({ eventsList, callback, valid }) {
  let navigation = useNavigation();
  const renderSeparator = () => (
    <View style={{ height: 1, backgroundColor: "#CCCCCC" }} />
  );

  const itemClickItem = (item) => {
    if (valid == false) {
      navigation.navigate(Constants.EventDetail, { data: item });
    } else {
      
      navigation.navigate(Constants.EventDetailEditing, { data: item });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          itemClickItem(item);
        }}
      >
        <View
          style={{ backgroundColor: "white", flex: 1, margin: 5, padding: 5, }}
        >
          <View style={{ flexDirection: "row", borderRadius: 50 }}>
            <View
              style={{
                flexDirection: "column",
                flex: 2,
                backgroundColor: "#FEC240",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  marginLeft: 5,
                  marginTop: 5,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginLeft: 5,
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                {item.event_type}
              </Text>
              <View style={{ flexDirection: "row",marginLeft: 5,marginBottom:5 }}>
                <Text style={{ fontWeight: "bold" }}>Created By:</Text>
                <Text
                  style={{ fontStyle: "italic", fontWeight: "500" }}
                  numberOfLines={1}
                >
                  {item.by}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                backgroundColor: "#FEC240",
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                {item.dateToShow}
              </Text>
              <Text>{item.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return eventsList.length == 0 ? (
    <View
      style={{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>No Events</Text>
    </View>
  ) : (
    <FlatList
      data={eventsList}
      renderItem={renderItem}
      // ItemSeparatorComponent={renderSeparator}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default ResusableEventList;
