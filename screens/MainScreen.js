import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import SpritePane from "../components/SpritePane";
import SpritePositionPanel from "../components/SpritePositionPanel";
import Stage from "../components/Stage";

const MainScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [selectedSpriteIndex, setSelectedSpriteIndex] = useState(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [spriteRotation, setSpriteRotation] = useState(0);
  const [scripts, setScripts] = useState({});
  const [playOn, setPlayOn] = useState(false);

  const [sprites, setSprites] = useState([
    {
      id: "1",
      position: { x: 0, y: 0 },
      rotation: 0,
      isVisible: true,
      actions: [],
      scripts: {},
      showHello: false,
      showThink: false,
    },
  ]);
  const actionQueues = useRef(sprites.map(() => [])).current;

  const [showHello, setShowHello] = useState(false);
  const [showThink, setShowThink] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (selectedSpriteIndex) {
      navigation.setParams({
        scripts: scripts,
        setScripts: setScripts,
        sprites: sprites,
        selectedSpriteIndex: selectedSpriteIndex,
      });
    }
  }, [selectedSpriteIndex, sprites]);

  useEffect(() => {
    const newActionQueues = sprites.map(() => []);
    actionQueues.forEach((queue, index) => {
      if (index < newActionQueues.length) {
        newActionQueues[index] = queue;
      }
    });
    actionQueues.splice(0, actionQueues.length, ...newActionQueues);
  }, [sprites]);

  useEffect(() => {
    if (playOn) {
      processQueue();
    }
  }, [playOn]);

  const processQueue = async () => {
    const promises = actionQueues.map(async (queue, index) => {
      let repeatCount = 0;
      let repeatStartIndex = -1;

      for (let i = 0; i < queue.length; i++) {
        const action = queue[i];
        await new Promise((resolve) => {
          if (action.type === "MOVE") {
            setSprites((prevSprites) => {
              const newSprites = [...prevSprites];
              newSprites[index].position = {
                x: newSprites[index].position.x + action.payload.dx,
                y: newSprites[index].position.y + action.payload.dy,
              };
              setTimeout(() => resolve(), 500);
              return newSprites;
            });
          } else if (action.type === "ROTATE") {
            setSprites((prevSprites) => {
              const newSprites = [...prevSprites];
              newSprites[index].rotation += action.payload.degrees;
              setTimeout(() => resolve(), 500);
              return newSprites;
            });
          } else if (action.type === "SAY_HELLO") {
            setSprites((prevSprites) => {
              const newSprites = [...prevSprites];
              newSprites[index].showHello = true;
              return newSprites;
            });
            resolve();
          } else if (action.type === "SAY_HELLO_TIMER") {
            setSprites((prevSprites) => {
              const newSprites = [...prevSprites];
              newSprites[index].showHello = true;
              setTimeout(() => {
                newSprites[index].showHello = false;
                resolve();
              }, 2000);
              return newSprites;
            });
          } else if (action.type === "THINK_HMM_TIMER") {
            setSprites((prevSprites) => {
              const newSprites = [...prevSprites];
              newSprites[index].showThink = true;
              setTimeout(() => {
                newSprites[index].showThink = false;
                resolve();
              }, 2000);
              return newSprites;
            });
          } else if (action.type === "THINK_HMM") {
            setSprites((prevSprites) => {
              const newSprites = [...prevSprites];
              newSprites[index].showThink = true;
              return newSprites;
            });
            resolve();
          } else if (action.type === "HIDE") {
            setSprites((prevSprites) => {
              const newSprites = [...prevSprites];
              newSprites[index].isVisible = false;
              return newSprites;
            });
            resolve();
          } else if (action.type === "SHOW") {
            setSprites((prevSprites) => {
              const newSprites = [...prevSprites];
              newSprites[index].isVisible = true;
              return newSprites;
            });
            resolve();
          } else if (action.type === "WAIT") {
            setTimeout(() => {
              resolve();
            }, 2000);
          } else if (action.type === "REPEAT") {
            if (repeatCount < 2) {
              // 2 because one time is already executed
              if (repeatStartIndex === -1) {
                repeatStartIndex = 0;
              }
              repeatCount++;
              i = repeatStartIndex - 1;

              resolve();
            } else {
              repeatCount = 0;
              repeatStartIndex = -1;
              resolve();
            }
          }

          if (repeatStartIndex === -1 && action.type !== "REPEAT") {
            repeatStartIndex = i;
          }
        });
      }
    });

    await Promise.all(promises);

    actionQueues.forEach((queue) => (queue.length = 0));
    setPlayOn(false);
  };

  useEffect(() => {
    if (selectedSpriteIndex !== null) {
      navigation.navigate("SpriteEditor", {
        selectedSpriteIndex,
        spriteIndex: selectedSpriteIndex,
        scripts,
        setScripts,
        sprites,
        setSprites,
        setSelectedSpriteIndex,
      });
    }
  }, [selectedSpriteIndex]);

  useEffect(() => {
    if (selectedSpriteIndex !== null) {
      console.log("Selected Sprite Index:", selectedSpriteIndex);
    }
  }, [selectedSpriteIndex]);

  const handleSpriteSelect = (spriteIndex) => {
    navigation.setParams({
      selectedSpriteIndex: spriteIndex,
      scripts: scripts,
      setScripts: setScripts,
      sprites: sprites,
      setSprites: setSprites,
    });
    console.log("PAAAA:", route.params);
    setSelectedSpriteIndex(spriteIndex);
    console.log("Setting Selected Sprite Index to:", spriteIndex);
    navigation.navigate("SpriteEditor", {
      spriteIndex,
      scripts,
      setScripts,
      sprites,
      setSprites,
      setSelectedSpriteIndex,
    });
  };

  const handlePlay = () => {
    actionQueues.forEach((queue, index) => {
      queue.length = 0;
    });

    Object.values(sprites).forEach((sprite, index) => {
      Object.values(sprite.scripts).forEach((script) => {
        if (script.type === "Motion" && script.label == "Move 30 steps") {
          actionQueues[index].push({
            type: "MOVE",
            payload: { dx: +30, dy: 0 },
          });
        }
        if (script.type === "Motion" && script.label == "Change X by 30") {
          actionQueues[index].push({
            type: "MOVE",
            payload: { dx: 30, dy: 0 },
          });
        }
        if (script.type === "Motion" && script.label === "Change Y by 30") {
          actionQueues[index].push({
            type: "MOVE",
            payload: { dx: 0, dy: -30 },
          });
        }
        if (script.type === "Motion" && script.label === "Rotate by +15 deg") {
          actionQueues[index].push({
            type: "ROTATE",
            payload: { degrees: 15 },
          });
        }
        if (script.type === "Motion" && script.label === "Rotate by -15 deg") {
          actionQueues[index].push({
            type: "ROTATE",
            payload: { degrees: -15 },
          });
        }
        if (script.type === "Motion" && script.label === "Rotate by +45 deg") {
          actionQueues[index].push({
            type: "ROTATE",
            payload: { degrees: 45 },
          });
        }
        if (script.type === "Motion" && script.label === "Rotate by -45 deg") {
          actionQueues[index].push({
            type: "ROTATE",
            payload: { degrees: -45 },
          });
        }
        if (script.type === "Looks" && script.label === "Say Hello") {
          actionQueues[index].push({
            type: "SAY_HELLO",
          });
        }
        if (script.type === "Looks" && script.label === "Say Hello for 2 Sec") {
          actionQueues[index].push({
            type: "SAY_HELLO_TIMER",
          });
        }
        if (script.type === "Looks" && script.label === "Think Hmm") {
          actionQueues[index].push({
            type: "THINK_HMM",
          });
        }
        if (script.type === "Looks" && script.label === "Think Hmm for 2 Sec") {
          actionQueues[index].push({
            type: "THINK_HMM_TIMER",
          });
        }
        if (script.type === "Looks" && script.label === "Hide") {
          actionQueues[index].push({
            type: "HIDE",
          });
        }
        if (script.type === "Looks" && script.label === "Show") {
          actionQueues[index].push({
            type: "SHOW",
          });
        }
        if (script.type === "Control" && script.label === "Wait 2 seconds") {
          actionQueues[index].push({
            type: "WAIT",
          });
        }
        if (script.type === "Control" && script.label === "Repeat 3 times") {
          actionQueues[index].push({
            type: "REPEAT",
          });
        }
      });
    });

    setPlayOn(true);
  };

  useEffect(() => {
    console.log("Screen Rendering...");
    console.log("Sprite Pos in Main:", spritePosition);
    console.log("Sprite Rotation in Main:", spriteRotation);
  });

  const handleReset = () => {
    setPlayOn(false);
    console.log("Sprites:", sprites);

    setSprites((prevSprites) =>
      prevSprites.map((item) => ({
        ...item,
        position: { x: 0, y: 0 },
        showHello: false,
        showThink: false,
        rotation: 0,
        actions: [],
      }))
    );
    console.log("Sprites:", sprites);
    setSpritePosition({ x: 0, y: 0 });
    setSpriteRotation(0);
    setShowHello(false);
    setShowThink(false);
    setHide(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stageContainer}>
        <View>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Icon name="refresh" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <Stage
          sprites={sprites}
          setSprites={setSprites}
          spritePosition={spritePosition}
          setSpritePosition={setSpritePosition}
          playOn={playOn}
          setPlayOn={setPlayOn}
          spriteRotation={spriteRotation}
          setSpriteRotation={setSpriteRotation}
          showHello={showHello}
          hide={hide}
          showThink={showThink}
        />
        <View>
          <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
            <Icon name="play-arrow" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <SpritePositionPanel position={spritePosition} sprites={sprites} />
      <SpritePane
        onSelectSprite={handleSpriteSelect}
        sprites={sprites}
        setSprites={setSprites}
        setSelectedSpriteIndex={setSelectedSpriteIndex}
        selectedSpriteIndex={selectedSpriteIndex}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  stageContainer: {
    flex: 3,
  },
  playButton: {
    marginTop: -30,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    // marginTop: 25,
    zIndex: 10,
    // marginBottom: -70,
    position: "absolute",
    bottom: 20,
    right: 15,
    backgroundColor: "#F44336",
    borderRadius: 50,
    width: 40,
    height: 40,
    marginBottom: -75,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
