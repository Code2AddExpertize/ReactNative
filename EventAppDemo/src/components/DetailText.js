import { View, Text } from "react-native";
import React from "react";

const DetailText = ({ label, text, width }) => {
  return (
    <View
      style={{
        backgroundColor: "#D7D7D7",
        width: width,
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 8,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "gray",
          borderRadius: 8,
          position: "absolute",
          backgroundColor: "black",
          left: 22,
          top: -10,
          zIndex: 999,
          fontSize: 14,
        }}
      >
        <Text style={{color: "white",padding: 3}}>{label}</Text>
      </View>
      <Text style={{ padding: 5, marginTop: 10, color: "black" }}>{text}</Text>
    </View>
  );
};

export default DetailText;
