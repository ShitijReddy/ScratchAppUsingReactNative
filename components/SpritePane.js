import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SpritePane = ({ onSelectSprite }) => {
  const [sprites, setSprites] = useState([{ id: "1", name: "Sprite 1" }]);

  const addSprite = () => {
    const newId = (sprites.length + 1).toString();
    setSprites([...sprites, { id: newId, name: `Sprite ${newId}` }]);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Sprite" onPress={addSprite} />
      <FlatList
        data={sprites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectSprite(item)}>
            <View style={styles.spriteItem}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  spriteItem: {
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default React.memo(SpritePane);
