import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Block from "./Block";

const BlockPalette = ({ onBlockDrop }) => {
  const handleDragEnd = (type, label, x, y) => {
    onBlockDrop(type, label, x, y);
  };

  return (
    <ScrollView style={styles.palette}>
      <Block
        type="Motion"
        label="Move"
        initialValue={30}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Move X by"
        initialValue={30}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Move Y by"
        initialValue={30}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Rotate by"
        initialValue={15}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Rotate by"
        initialValue={-15}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Rotate by"
        initialValue={45}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Motion"
        label="Rotate by"
        initialValue={-45}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Looks"
        label="Inc Size By"
        initialValue={10}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Looks"
        label="Say"
        initialValue={"Hello"}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Looks"
        label="Think"
        initialValue={"Hmm"}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Looks"
        label="For 2s, Say"
        initialValue={"Hello"}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Looks"
        label="For 2s, Think"
        initialValue={"Hmm"}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Looks"
        label="Hide for "
        initialValue={5}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Looks"
        label="Show"
        initialValue={""}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Control"
        label="Wait"
        initialValue={2}
        onDragEnd={handleDragEnd}
      />
      <Block
        type="Control"
        label="Repeat"
        initialValue={3}
        onDragEnd={handleDragEnd}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  palette: {
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 5,
    maxWidth: "55%",
  },
});

export default React.memo(BlockPalette);
