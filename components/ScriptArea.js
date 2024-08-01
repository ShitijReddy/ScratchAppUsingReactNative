import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ScriptArea = ({ scripts, onDelete }) => {
  return (
    <View style={styles.scriptArea}>
      {Object.keys(scripts).map((key) => (
        <View key={key} style={[styles.block, styles[scripts[key].type]]}>
          <Text style={styles.scriptText}>{scripts[key].label}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(key)}
          >
            <Icon name="delete" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  scriptArea: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  block: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scriptText: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 2,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#F44336",
  },
});

export default React.memo(ScriptArea);
