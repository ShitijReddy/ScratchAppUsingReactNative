import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const SpritePositionPanel = ({ position, sprites }) => {
  return (
    <View style={styles.container}>
      <FlatList
        justifyContent="space-between"
        style={styles.list}
        horizontal
        data={sprites}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.spriteItem}>
            <Text style={styles.text}>
              X: {(Math.round(item.position["x"] * 100) / 100).toFixed(2)}
            </Text>
            <Text>
              Y: {(Math.round(item.position["y"] * 100) / 100).toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    maxHeight: 60,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  list: {},
  text: {},
  spriteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
  },
});

export default React.memo(SpritePositionPanel);
