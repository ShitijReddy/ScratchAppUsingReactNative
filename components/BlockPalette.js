import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Block from "./Block";
const BlockPalette = ({ onBlockDrop }) => {
  const handleDragEnd = (type, label, x, y) => {
    onBlockDrop(type, label, x, y);
  };

  return (
    <ScrollView style={styles.palette}>
      <Block type="Motion" label="Move 30 steps" onDragEnd={handleDragEnd} />
      <Block type="Motion" label="Change X by 30" onDragEnd={handleDragEnd} />
      <Block type="Motion" label="Change Y by 30" onDragEnd={handleDragEnd} />
      <Block
        type="Motion"
        label="Rotate by +15 deg"
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Rotate by -15 deg"
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Rotate by +45 deg"
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Rotate by -45 deg"
        onDragEnd={handleDragEnd}
      />

      <Block type="Looks" label="Say Hello" onDragEnd={handleDragEnd} />
      <Block type="Looks" label="Think Hmm" onDragEnd={handleDragEnd} />
      <Block
        type="Looks"
        label="Say Hello for 2 Sec"
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Looks"
        label="Think Hmm for 2 Sec"
        onDragEnd={handleDragEnd}
      />
      <Block type="Looks" label="Hide" onDragEnd={handleDragEnd} />
      <Block type="Looks" label="Show" onDragEnd={handleDragEnd} />
      <Block type="Control" label="Wait 2 seconds" onDragEnd={handleDragEnd} />
      <Block type="Control" label="Repeat 3 times" onDragEnd={handleDragEnd} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  palette: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 20,
  },
  heading: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    marginBottom: 8,
  },
});

export default React.memo(BlockPalette);
