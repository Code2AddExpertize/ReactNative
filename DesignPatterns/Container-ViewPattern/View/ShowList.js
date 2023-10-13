import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
//View
export default function ShowList({ items }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemStyle}>
        <Text>Items No:{item.text}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    height:40,
    backgroundColor: "white",
  },
});
