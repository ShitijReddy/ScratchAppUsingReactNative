import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import SpritePane from "../components/SpritePane";
import SpritePositionPanel from "../components/SpritePositionPanel";
import Stage from "../components/Stage";

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedSprite, setSelectedSprite] = useState(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [spriteRotation, setSpriteRotation] = useState(0);
  const [scripts, setScripts] = useState({});
  const [playOn, setPlayOn] = useState(false);
  const actionQueue = useRef([]);
  const [showHello, setShowHello] = useState(false);
  const [showThink, setShowThink] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (selectedSprite) {
      navigation.setParams({ scripts, setScripts });
    }
  }, [scripts]);

  useEffect(() => {
    if (playOn && actionQueue.current.length > 0) {
      processQueue();
    }
  }, [playOn]);

  const processQueue = async () => {
    let repeatStartIndex = -1;
    let repeatCount = 0;
    let maxRepeatCount = 3; // Set the maximum number of repeats

    for (let i = 0; i < actionQueue.current.length; i++) {
      const action = actionQueue.current[i];
      await new Promise((resolve) => {
        if (action.type === "MOVE") {
          setSpritePosition((prevPosition) => {
            const newPosition = {
              x: prevPosition.x + action.payload.dx,
              y: prevPosition.y + action.payload.dy,
            };
            setTimeout(() => {
              resolve(newPosition);
            }, 500); // Slight delay to ensure smooth transitions
            return newPosition;
          });
        } else if (action.type === "ROTATE") {
          setSpriteRotation((prevRotation) => {
            const newRotation = prevRotation + action.payload.degrees;
            setTimeout(() => {
              resolve(newRotation);
            }, 500); // Slight delay to ensure smooth transitions
            return newRotation;
          });
        } else if (action.type === "SAY_HELLO") {
          setShowHello(true);
          resolve();
        } else if (action.type === "SAY_HELLO_TIMER") {
          setShowHello(true);
          setTimeout(() => {
            setShowHello(false);
            resolve();
          }, 2000); // Display the message for 2 seconds
        } else if (action.type === "THINK_HMM_TIMER") {
          setShowThink(true);
          setTimeout(() => {
            setShowThink(false);
            resolve();
          }, 2000); // Display the message for 2 seconds
        } else if (action.type === "THINK_HMM") {
          setShowThink(true);
          resolve();
        } else if (action.type === "HIDE") {
          setHide(true);
          resolve();
        } else if (action.type === "SHOW") {
          setHide(false);
          resolve();
        } else if (action.type === "WAIT") {
          setTimeout(() => {
            resolve();
          }, 2000);
        } else if (action.type === "REPEAT") {
          // if (repeatStartIndex === -1) {
          //   repeatStartIndex = 0; // Mark the beginning of the queue for repeating
          // }

          repeatCount++;

          if (repeatCount < maxRepeatCount) {
            // Push actions back into the queue from the start index
            console.log("repeatCount:", repeatCount);
            console.log("repeatStartInd:", repeatStartIndex);
            console.log("ACTION QUE--", actionQueue);
            i = -1;
            console.log("i:", i);
            // actionQueue.current.push(
            //   ...actionQueue.current.slice(repeatStartIndex, i)
            // );
            // actionQueue.current.push(action); // Add the REPEAT action itself
            resolve();
          } else {
            resolve();
          }
        }
      });
    }
    actionQueue.current = []; // Clear queue after processing
    setPlayOn(false);
  };

  const handleSpriteSelect = (sprite) => {
    setSelectedSprite(sprite);
    navigation.navigate("SpriteEditor", { sprite, scripts, setScripts });
  };

  const handlePlay = () => {
    actionQueue.current = []; // Reset queue
    console.log("scripts:", scripts);
    Object.values(scripts).forEach((script) => {
      if (script.type === "Motion" && script.label === "Move 30 steps") {
        actionQueue.current.push({
          type: "MOVE",
          payload: { dx: 30, dy: 0 },
        });
      }
      if (script.type === "Motion" && script.label === "Change X by 30") {
        actionQueue.current.push({
          type: "MOVE",
          payload: { dx: 30, dy: 0 },
        });
      }
      if (script.type === "Motion" && script.label === "Change Y by 30") {
        actionQueue.current.push({
          type: "MOVE",
          payload: { dx: 0, dy: -30 },
        });
      }
      if (script.type === "Motion" && script.label === "Rotate by +15 deg") {
        actionQueue.current.push({
          type: "ROTATE",
          payload: { degrees: 15 },
        });
      }
      if (script.type === "Motion" && script.label === "Rotate by -15 deg") {
        actionQueue.current.push({
          type: "ROTATE",
          payload: { degrees: -15 },
        });
      }
      if (script.type === "Motion" && script.label === "Rotate by +45 deg") {
        actionQueue.current.push({
          type: "ROTATE",
          payload: { degrees: 45 },
        });
      }
      if (script.type === "Motion" && script.label === "Rotate by -45 deg") {
        actionQueue.current.push({
          type: "ROTATE",
          payload: { degrees: -45 },
        });
      }
      if (script.type === "Looks" && script.label === "Say Hello") {
        actionQueue.current.push({
          type: "SAY_HELLO",
        });
      }
      if (script.type === "Looks" && script.label === "Say Hello for 2 Sec") {
        actionQueue.current.push({
          type: "SAY_HELLO_TIMER",
        });
      }
      if (script.type === "Looks" && script.label === "Think Hmm") {
        actionQueue.current.push({
          type: "THINK_HMM",
        });
      }
      if (script.type === "Looks" && script.label === "Think Hmm for 2 Sec") {
        actionQueue.current.push({
          type: "THINK_HMM_TIMER",
        });
      }
      if (script.type === "Looks" && script.label === "Hide") {
        actionQueue.current.push({
          type: "HIDE",
        });
      }
      if (script.type === "Looks" && script.label === "Show") {
        actionQueue.current.push({
          type: "SHOW",
        });
      }
      if (script.type === "Control" && script.label === "Wait 2 seconds") {
        actionQueue.current.push({
          type: "WAIT",
        });
      }
      if (script.type === "Control" && script.label === "Repeat 3 times") {
        actionQueue.current.push({
          type: "REPEAT",
        });
      }
    });
    setPlayOn(true); // Trigger processing of the queue
  };

  useEffect(() => {
    console.log("Screen Rendering...");
    console.log("Sprite Pos in Main:", spritePosition);
    console.log("Sprite Rotation in Main:", spriteRotation);
  });

  const handleReset = () => {
    setPlayOn(false); // Stop any ongoing play
    actionQueue.current = []; // Clear the action queue
    setSpritePosition({ x: 0, y: 0 }); // Reset sprite position
    setSpriteRotation(0); // Reset sprite rotation
    setShowHello(false); // Hide any "Hello" message
    setShowThink(false); // Hide any "Think" message
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
          spritePosition={spritePosition}
          setSpritePosition={setSpritePosition}
          playOn={playOn}
          setPlayOn={setPlayOn}
          spriteRotation={spriteRotation}
          setSpriteRotation={setSpriteRotation}
          showHello={showHello}
          showThink={showThink}
          hide={hide}
        />
        <View>
          <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
            <Icon name="play-arrow" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
        <SpritePositionPanel position={spritePosition} />
        <SpritePane onSelectSprite={handleSpriteSelect} />
      </View>
      {/* <Button title="Play" onPress={handlePlay} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  stageContainer: {
    flex: 1,
  },
  playButton: {
    marginTop: -30,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    zIndex: 10,
    marginBottom: -70,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F44336", // A red color to indicate reset
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
