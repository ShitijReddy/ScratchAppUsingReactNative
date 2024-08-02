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

  // Single
  // const actionQueue = useRef([]);

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
    {
      id: "2",
      position: { x: 100, y: 100 },
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

  // useEffect(() => {
  //   if (playOn && actionQueue.current.length > 0) {
  //     processQueue();
  //   }
  // }, [playOn]);

  // const processQueue = async () => {
  //   let repeatStartIndex = -1;
  //   let repeatCount = 0;
  //   let maxRepeatCount = 3;

  //   for (let i = 0; i < actionQueue.current.length; i++) {
  //     const action = actionQueue.current[i];
  //     await new Promise((resolve) => {
  //       if (action.type === "MOVE") {
  //         setSpritePosition((prevPosition) => {
  //           const newPosition = {
  //             x: prevPosition.x + action.payload.dx,
  //             y: prevPosition.y + action.payload.dy,
  //           };
  //           setTimeout(() => {
  //             resolve(newPosition);
  //           }, 500);
  //           return newPosition;
  //         });
  //       } else if (action.type === "ROTATE") {
  //         setSpriteRotation((prevRotation) => {
  //           const newRotation = prevRotation + action.payload.degrees;
  //           setTimeout(() => {
  //             resolve(newRotation);
  //           }, 500);
  //           return newRotation;
  //         });
  //       } else if (action.type === "SAY_HELLO") {
  //         setShowHello(true);
  //         resolve();
  //       } else if (action.type === "SAY_HELLO_TIMER") {
  //         setShowHello(true);
  //         setTimeout(() => {
  //           setShowHello(false);
  //           resolve();
  //         }, 2000);
  //       } else if (action.type === "THINK_HMM_TIMER") {
  //         setShowThink(true);
  //         setTimeout(() => {
  //           setShowThink(false);
  //           resolve();
  //         }, 2000);
  //       } else if (action.type === "THINK_HMM") {
  //         setShowThink(true);
  //         resolve();
  //       } else if (action.type === "HIDE") {
  //         setHide(true);
  //         resolve();
  //       } else if (action.type === "SHOW") {
  //         setHide(false);
  //         resolve();
  //       } else if (action.type === "WAIT") {
  //         setTimeout(() => {
  //           resolve();
  //         }, 2000);
  //       } else if (action.type === "REPEAT") {
  //         repeatCount++;

  //         if (repeatCount < maxRepeatCount) {
  //           console.log("repeatCount:", repeatCount);
  //           console.log("repeatStartInd:", repeatStartIndex);
  //           console.log("ACTION QUE--", actionQueue);
  //           i = -1;
  //           console.log("i:", i);
  //           resolve();
  //         } else {
  //           resolve();
  //         }
  //       }
  //     });
  //   }
  //   actionQueue.current = [];
  //   setPlayOn(false);
  // };

  useEffect(() => {
    if (playOn) {
      processQueue();
    }
  }, [playOn]);

  const processQueue = async () => {
    // Array of promises for each sprite's actions
    const promises = actionQueues.map(async (queue, index) => {
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
            repeatCount++;

            if (repeatCount < maxRepeatCount) {
              console.log("repeatCount:", repeatCount);
              console.log("repeatStartInd:", repeatStartIndex);
              console.log("ACTION QUE--", actionQueue);
              i = -1;
              console.log("i:", i);
              resolve();
            } else {
              resolve();
            }
          }
        });
      }
    });

    // Wait for all action queues to complete
    await Promise.all(promises);

    // Reset the action queues and stop playing
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
    // Single
    // actionQueue.current = [];

    actionQueues.forEach((queue, index) => {
      queue.length = 0; // Clear the previous actions
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

    // Single
    // console.log("scripts:", scripts);
    // Object.values(scripts).forEach((script) => {
    //   if (script.type === "Motion" && script.label === "Move 30 steps") {
    //     actionQueue.current.push({
    //       type: "MOVE",
    //       payload: { dx: 30, dy: 0 },
    //     });
    //   }
    //   if (script.type === "Motion" && script.label === "Change X by 30") {
    //     actionQueue.current.push({
    //       type: "MOVE",
    //       payload: { dx: 30, dy: 0 },
    //     });
    //   }
    //   if (script.type === "Motion" && script.label === "Change Y by 30") {
    //     actionQueue.current.push({
    //       type: "MOVE",
    //       payload: { dx: 0, dy: -30 },
    //     });
    //   }
    //   if (script.type === "Motion" && script.label === "Rotate by +15 deg") {
    //     actionQueue.current.push({
    //       type: "ROTATE",
    //       payload: { degrees: 15 },
    //     });
    //   }
    //   if (script.type === "Motion" && script.label === "Rotate by -15 deg") {
    //     actionQueue.current.push({
    //       type: "ROTATE",
    //       payload: { degrees: -15 },
    //     });
    //   }
    //   if (script.type === "Motion" && script.label === "Rotate by +45 deg") {
    //     actionQueue.current.push({
    //       type: "ROTATE",
    //       payload: { degrees: 45 },
    //     });
    //   }
    //   if (script.type === "Motion" && script.label === "Rotate by -45 deg") {
    //     actionQueue.current.push({
    //       type: "ROTATE",
    //       payload: { degrees: -45 },
    //     });
    //   }
    //   if (script.type === "Looks" && script.label === "Say Hello") {
    //     actionQueue.current.push({
    //       type: "SAY_HELLO",
    //     });
    //   }
    //   if (script.type === "Looks" && script.label === "Say Hello for 2 Sec") {
    //     actionQueue.current.push({
    //       type: "SAY_HELLO_TIMER",
    //     });
    //   }
    //   if (script.type === "Looks" && script.label === "Think Hmm") {
    //     actionQueue.current.push({
    //       type: "THINK_HMM",
    //     });
    //   }
    //   if (script.type === "Looks" && script.label === "Think Hmm for 2 Sec") {
    //     actionQueue.current.push({
    //       type: "THINK_HMM_TIMER",
    //     });
    //   }
    //   if (script.type === "Looks" && script.label === "Hide") {
    //     actionQueue.current.push({
    //       type: "HIDE",
    //     });
    //   }
    //   if (script.type === "Looks" && script.label === "Show") {
    //     actionQueue.current.push({
    //       type: "SHOW",
    //     });
    //   }
    //   if (script.type === "Control" && script.label === "Wait 2 seconds") {
    //     actionQueue.current.push({
    //       type: "WAIT",
    //     });
    //   }
    //   if (script.type === "Control" && script.label === "Repeat 3 times") {
    //     actionQueue.current.push({
    //       type: "REPEAT",
    //     });
    //   }
    // });
    setPlayOn(true);
  };

  // const handlePlay = () => {
  //   sprites.forEach((sprite, index) => {
  //     sprite.actions.forEach((action) => {
  //       if (action.type === "MOVE") {
  //         Animated.timing(panRefs[index], {
  //           toValue: {
  //             x: sprite.position.x + action.payload.dx,
  //             y: sprite.position.y + action.payload.dy,
  //           },
  //           duration: 500,
  //           useNativeDriver: false,
  //         }).start();
  //       }
  //       if (action.type === "ROTATE") {
  //         Animated.timing(rotationRefs[index], {
  //           toValue: sprite.rotation + action.payload.degrees,
  //           duration: 500,
  //           useNativeDriver: false,
  //         }).start();
  //       }
  //       // Handle other actions like visibility, text display, etc.
  //     });
  //   });
  // };

  useEffect(() => {
    console.log("Screen Rendering...");
    console.log("Sprite Pos in Main:", spritePosition);
    console.log("Sprite Rotation in Main:", spriteRotation);
  });

  const handleReset = () => {
    setPlayOn(false);
    // actionQueue.current = [];
    console.log("Sprites:", sprites);
    // setSprites((prevSprites) => {
    //   prevSprites.map((item) => {
    //     item.position = { x: 0, y: 0 };
    //     item.actions = [];
    //   });
    //   return prevSprites;
    // });

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
            <Icon name="play-arrow" size={25} color="#fff" />
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
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    zIndex: 10,
    marginBottom: -70,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F44336",
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
