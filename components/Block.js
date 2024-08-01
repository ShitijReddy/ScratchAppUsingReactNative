// components/Block.js
import React from "react";
import { PanResponder, StyleSheet, Text, View } from "react-native";

const Block = ({ type, label, onDragEnd }) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Implement drag logic here if needed
    },
    onPanResponderRelease: (_, gestureState) => {
      onDragEnd(type, label, gestureState.moveX, gestureState.moveY);
    },
  });

  return (
    <View {...panResponder.panHandlers} style={[styles.block, styles[type]]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  Motion: { backgroundColor: "#4CAF50" },
  Looks: { backgroundColor: "#2196F3" },
  Control: { backgroundColor: "#FF9800" },
  Events: { backgroundColor: "#FFC107" },
  label: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default React.memo(Block);
