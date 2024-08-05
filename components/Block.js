import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Block = ({ type, label, initialValue, onDragEnd }) => {
  const [customValue, setCustomValue] = useState(initialValue);

  const handleValueChange = (value) => {
    setCustomValue(value);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {},
    onPanResponderRelease: (_, gestureState) => {
      onDragEnd(
        type,
        `${label} ${customValue}`,
        gestureState.moveX,
        gestureState.moveY
      );
    },
  });

  const isNumberInput = typeof initialValue === "number";

  return (
    <View {...panResponder.panHandlers} style={[styles.block, styles[type]]}>
      <Text style={styles.label}>{label} </Text>
      {initialValue ? (
        isNumberInput ? (
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.addReduceButton, { marginRight: 3 }]}
              onPress={() => handleValueChange(customValue - 1)}
            >
              <MaterialIcons name="remove" size={18} color="white" />
            </TouchableOpacity>
            <TextInput
              style={styles.numberInput}
              keyboardType="numeric"
              value={String(customValue)}
              onChangeText={(text) => {
                if (text.length > 0) {
                  handleValueChange(parseInt(text));
                } else {
                  handleValueChange(0);
                }
              }}
            />
            <TouchableOpacity
              style={[styles.addReduceButton, { marginLeft: 3 }]}
              onPress={() => handleValueChange(customValue + 1)}
            >
              <MaterialIcons name="add" size={18} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TextInput
            style={styles.textInput}
            value={customValue}
            onChangeText={handleValueChange}
          />
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    // flex: 1,
    maxWidth: "88%",
    padding: 5,
    margin: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  Motion: { backgroundColor: "#4CAF50" },
  Looks: { backgroundColor: "#2196F3" },
  Control: { backgroundColor: "#FF9800" },
  Events: { backgroundColor: "#FFC107" },
  label: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
  inputContainer: {
    // borderWidth: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  numberInput: {
    width: 25,
    // padding: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  textInput: {
    // flex: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#333",
  },
  addReduceButton: {
    // borderWidth: 2,
    // marginHorizontal: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 1,
    backgroundColor: "gray",
    borderRadius: 5,
  },
});

export default React.memo(Block);
