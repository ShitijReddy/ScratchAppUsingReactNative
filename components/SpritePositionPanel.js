import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SpritePositionPanel = ({ position }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        X: {(Math.round(position.x * 100) / 100).toFixed(5)}
      </Text>
      <Text style={styles.text}>
        Y: {(Math.round(position.y * 100) / 100).toFixed(5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 0,
    maxHeight: 60,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 3,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default React.memo(SpritePositionPanel);
