import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import ShowList from "../View/ShowList";

//Container
const ListContainer = () => {
  const addItem = () => {
    let id = items.length + 1;
    if (id <= 20) setItems([...items, { id: id, text: id }]);
  };

  const deleteItem = () => {
    if (items.length != 0) {
      items.splice(items.length - 1, 1);
      setItems([...items]);
    }
  };

  const [items, setItems] = useState([]);
  return (
    <View style={styles.container}>
      <View style={styles.half}>
        <ShowList items={items} />
      </View>
      <View style={styles.buttonWraperStyle}>
        <Button
          style={styles.btnStyle}
          title="Add Item"
          onPress={() => addItem()}
        />
        <Button
          style={styles.btnStyle}
          title="Delete Item"
          onPress={() => deleteItem()}
        />
      </View>
    </View>
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    width: "100%",
    flex: 1,
    flexDirection: "column", // Horizontal layout
  },
  half: {
    flex: 4, // Each half takes equal space
  },
  buttonWraperStyle: {
    borderRadius:5,
    margin:5,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#FBC02D",
    flex: 1,
  },
  btnStyle: {
    flex: 1,
  },
});
