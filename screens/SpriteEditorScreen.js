import React from "react";
import { StyleSheet, View } from "react-native";
import BlockPalette from "../components/BlockPalette";
import ScriptArea from "../components/ScriptArea";

const SpriteEditorScreen = ({ route, navigation }) => {
  const {
    sprite,
    sprites,
    setSprites,
    scripts,
    setScripts,
    selectedSpriteIndex,
    setSelectedSpriteIndex,
    spriteIndex,
  } = route.params;

  // const [currentActions, setCurrentActions] = useState([]);

  // useEffect(() => {
  //   console.log("SpriteEditor:", sprites);
  //   console.log("Params BEFORE:", route.params);
  //   console.log("----- Selected Sprite Index:", selectedSpriteIndex);
  //   console.log("Params AFTER:", route.params);
  //   // setSelectedSpriteIndex(route.params.)
  // }, [selectedSpriteIndex, sprites]);

  // useEffect(() => {
  //   setSelectedSpriteIndex(route.params.spriteIndex);
  // }, [route.params]);

  const handleDeleteScript = (key) => {
    const newSprites = sprites;

    const newScripts = sprites[spriteIndex].scripts;
    delete newScripts[key];
    newSprites[spriteIndex].scripts = newScripts;
    setSprites(newSprites);
    setScripts(newScripts);
    navigation.setParams({ sprites: newSprites });
  };

  const handleBlockDrop = (type, label, x, y) => {
    const newScripts = {
      ...sprites[spriteIndex].scripts,
      [`${x}-${y}`]: { type, label },
    };

    // Single
    // const newScripts = {
    //   ...selectedSpriteIndex.scripts,
    //   [`${x}-${y}`]: { type, label },
    // };
    console.log("New Scripts:", newScripts);
    console.log("********* ind:", selectedSpriteIndex);
    setScripts(newScripts);

    // setSprites((prevSprites) => {
    //   prevSprites[selectedSpriteIndex].scripts = newScripts;
    //   console.log("Prev Sprites:", prevSprites);
    //   return prevSprites;
    // });
    const prevSprites = sprites;
    prevSprites[spriteIndex].scripts = { ...newScripts };
    console.log("OBJECT IS:", prevSprites[spriteIndex]);
    setSprites(prevSprites);
    console.log("++++Sprites++++++ ", sprites);
    navigation.setParams({ scripts: newScripts, sprites: sprites });
  };

  return (
    <View style={styles.container}>
      <BlockPalette onBlockDrop={handleBlockDrop} />
      <ScriptArea
        sprites={sprites}
        selectedSpriteIndex={spriteIndex}
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
