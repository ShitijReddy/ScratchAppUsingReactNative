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
      message: "Hello",
      thought: "Hmm...",
      sizeChange: 0,
    };
    setSprites((prevSprites) => {
      const updatedSprites = [...prevSprites, newSprite];
      console.log("updatedSprites ", updatedSprites);
      return updatedSprites;
    });
    console.log("sprites in pane:", sprites);
  };

  const removeSprite = (id) => {
    setSprites((prevSprites) =>
      prevSprites.filter((sprite) => sprite.id !== id)
    );
  };

  const renderSpriteItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        onSelectSprite(index);
      }}
      style={styles.spriteItem}
    >
      <View style={styles.spriteContent}>
        <Text style={{ fontSize: 15 }}>Sprite {item.id}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeSprite(item.id)}
        style={styles.removeButton}
      >
        <Icon name="remove" size={15} color="#fff" />
      </TouchableOpacity>
      <View style={styles.actionIndicator}>
        <Text style={styles.actionText}>Add Actions</Text>
      </View>
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
    position: "relative",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 10,
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spriteContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 2,
    backgroundColor: "#f00",
    padding: 5,
    borderRadius: 50,
  },
  addItem: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    top: -10,
  },
  actionIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2196F3",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default React.memo(SpritePane);
