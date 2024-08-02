import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ScriptArea = ({
  scripts,
  onDelete,
  sprites,
  selectedSpriteIndex,
  route,
}) => {
  useEffect(() => {
    console.log("SSS:", sprites);
    if (
      selectedSpriteIndex !== null &&
      sprites[selectedSpriteIndex] &&
      sprites[selectedSpriteIndex].length > 0
    ) {
      console.log("WWW", sprites[selectedSpriteIndex]);
      setTempScripts(sprites[selectedSpriteIndex].scripts);
    }
  }, [sprites, selectedSpriteIndex, sprites[selectedSpriteIndex]]);

  const [tempScripts, setTempScripts] = useState({});
  return (
    <View style={styles.scriptArea}>
      {sprites &&
        sprites[selectedSpriteIndex] &&
        sprites[selectedSpriteIndex].scripts &&
        Object.keys(sprites[selectedSpriteIndex].scripts).map((key) => (
          <View
            key={key}
            style={[
              styles.block,
              styles[sprites[selectedSpriteIndex].scripts[key].type],
            ]}
          >
            <Text style={styles.scriptText}>
              {sprites[selectedSpriteIndex].scripts[key].label}
            </Text>
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
  Motion: { backgroundColor: "#4CAF50" },
  Looks: { backgroundColor: "#2196F3" },
  Control: { backgroundColor: "#FF9800" },
  Events: { backgroundColor: "#FFC107" },
  deleteButton: {
    marginLeft: 2,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#F44336",
  },
});

export default React.memo(ScriptArea);
