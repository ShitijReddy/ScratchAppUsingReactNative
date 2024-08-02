import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SpritePane = ({
  onSelectSprite,
  sprites,
  setSprites,
  setSelectedSpriteIndex,
  selectedSpriteIndex,
}) => {
  useEffect(() => {
    console.log("Selected Sprite Index:", selectedSpriteIndex);
  }, [selectedSpriteIndex]);

  const addSprite = () => {
    const newId = (sprites.length + 1).toString();
    console.log("sprites in pane before:", sprites);

    const newSprite = {
      id: newId,
      position: { x: 0, y: 0 },
      rotation: 0,
      isVisible: true,
      actions: [],
      scripts: {},
      showHello: false,
      showThink: false,
    };
    // setSprites([...sprites, newSprite]);
    setSprites((prevSprites) => {
      const updatedSprites = [...prevSprites, newSprite];
      console.log("updatedSprites ", updatedSprites);
      return updatedSprites;
      // return
      // updatedSprites[index].position = {
      //   x: panRefs[index].x._value,
      //   y: panRefs[index].y._value,
      // };
    });
    // setParams()
    console.log("sprites in pane:", sprites);
    // setSprites((prevSprites) => {
    //   const newSprites = [...prevSprites];
    //   newSprites[index].rotation += action.payload.degrees;
    //   setTimeout(() => resolve(), 500);
    //   return newSprites;
    // });
    // setSprites((prevSprites) => {
    //   const newSprites = [
    //     ...prevSprites,
    //     {
    //       id: newId,
    //       position: { x: 0, y: 0 },
    //       rotation: 0,
    //       isVisible: true,
    //       actions: [],
    //       scripts: {},
    //       showHello: false,
    //       showThink: false,
    //     },
    //   ];
    //   return newSprites;
    // });
  };

  const renderSpriteItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        onSelectSprite(index);
      }}
      style={styles.spriteItem}
    >
      <Text>Sprite {item.id}</Text>
    </TouchableOpacity>
  );

  const renderAddItem = () => (
    <TouchableOpacity style={styles.addItem} onPress={addSprite}>
      <Icon name="add" size={40} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        horizontal
        data={[...sprites, { id: "add-button" }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if (item.id === "add-button") {
            return sprites.length < 3 ? renderAddItem() : null;
          }
          return renderSpriteItem({ item, index });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 120,
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
  },
  spriteItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  addItem: {
    padding: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#2196F3",
    // backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    top: -10,

    // marginRight: 10,
    // borderRadius: 5,
    // alignItems: "center",
    // justifyContent: "center",
    // width: 100,
    // height: 100,
  },
  blueColor: {},
});

export default React.memo(SpritePane);
