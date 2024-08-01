import React from "react";
import { StyleSheet, View } from "react-native";
import BlockPalette from "../components/BlockPalette";
import ScriptArea from "../components/ScriptArea";

const SpriteEditorScreen = ({ route, navigation }) => {
  const { sprite, scripts, setScripts } = route.params;

  const handleDeleteScript = (key) => {
    const newScripts = scripts;
    delete newScripts[key];
    setScripts(newScripts);
    navigation.setParams({ scripts: newScripts });
  };

  const handleBlockDrop = (type, label, x, y) => {
    const newScripts = {
      ...scripts,
      [`${x}-${y}`]: { type, label },
    };
    setScripts(newScripts);
    navigation.setParams({ scripts: newScripts });
  };

  return (
    <View style={styles.container}>
      <BlockPalette onBlockDrop={handleBlockDrop} />
      <ScriptArea
        scripts={scripts}
        setScripts={setScripts}
        onDelete={handleDeleteScript}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

export default React.memo(SpriteEditorScreen);
