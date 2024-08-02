import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { CatIcon } from "./svgIcons";
const Stage = ({
  spritePosition,
  setSpritePosition,
  playOn = false,
  setPlayOn,
  spriteRotation,
  setSpriteRotation,
  showHello = false,
  showThink = false,
  hide,
  sprites,
  setSprites,
}) => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [messageDimensions, setMessageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const pan = useRef(new Animated.ValueXY()).current;
  const rotation = useRef(new Animated.Value(spriteRotation)).current;

  const panRefs = useRef(sprites.map(() => new Animated.ValueXY())).current;
  const rotationRefs = useRef(sprites.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    console.log("PanRefs:", panRefs);
    console.log("SPPPP:", sprites);
  }, [sprites]);

  // useEffect(() => {
  //   // Update panRefs to match the current number of sprites
  //   if (panRefs.length !== sprites.length) {
  //     if (sprites.length > panRefs.length) {
  //       // Add new refs for newly added sprites
  //       for (let i = panRefs.length; i < sprites.length; i++) {
  //         panRefs.push(new Animated.ValueXY());
  //       }
  //     } else if (sprites.length < panRefs.length) {
  //       // Remove refs for removed sprites
  //       panRefs.splice(sprites.length);
  //     }
  //   }

  //   // Update rotationRefs to match the current number of sprites
  //   if (rotationRefs.length !== sprites.length) {
  //     if (sprites.length > rotationRefs.length) {
  //       // Add new refs for newly added sprites
  //       for (let i = rotationRefs.length; i < sprites.length; i++) {
  //         rotationRefs.push(new Animated.Value(0));
  //       }
  //     }
  //     // else if (sprites.length < rotationRefs.length) {
  //     //   // Remove refs for removed sprites
  //     //   rotationRefs.splice(sprites.length);
  //     // }
  //     console.log("PAN REFS:", panRefs);
  //     console.log("ROT REFS:", rotationRefs);
  //     console.log("SPRITEs:", sprites);
  //   }
  // }, [sprites]);

  useEffect(() => {
    // Ensure refs array length matches sprites length
    while (panRefs.length < sprites.length) {
      panRefs.push(new Animated.ValueXY());
    }
    while (rotationRefs.length < sprites.length) {
      rotationRefs.push(new Animated.Value(0));
    }
    // while (panResponders.length < sprites.length) {
    //   panResponders.push(createPanResponder(panRefs.length - 1));
    // }

    // Clean up any extra refs if sprites length decreases
    if (panRefs.length > sprites.length) {
      panRefs.splice(sprites.length);
      rotationRefs.splice(sprites.length);
      panResponders.splice(sprites.length);
    }
  }, [sprites]);

  useEffect(() => {
    console.log("%%%% CHANGED %", sprites);
    sprites.forEach((sprite, index) => {
      Animated.timing(panRefs[index], {
        toValue: { x: sprite.position.x, y: sprite.position.y },
        duration: 100,
        useNativeDriver: false,
      }).start();

      Animated.timing(rotationRefs[index], {
        toValue: sprite.rotation,
        duration: 100,
        useNativeDriver: false,
      }).start();
    });
  }, [playOn, sprites]);

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setStageDimensions({ width, height });
  };

  useEffect(() => {
    if (stageDimensions.width && stageDimensions.height) {
      const centerX = stageDimensions.width / 2;
      const centerY = stageDimensions.height / 2;
      pan.setValue({ x: centerX, y: centerY });
    }
  }, [stageDimensions]);

  // useEffect(() => {
  //   Animated.timing(pan, {
  //     toValue: { x: spritePosition.x, y: spritePosition.y },
  //     duration: 100,
  //     useNativeDriver: false,
  //   }).start();
  //   console.log("rotation:", rotation);
  //   console.log("Sprite Rot:", spriteRotation);
  //   Animated.timing(rotation, {
  //     toValue: spriteRotation,
  //     duration: 100,
  //     useNativeDriver: false,
  //   }).start();
  //   console.log("rotation:", rotation);
  // }, [playOn, spritePosition]);

  // const animateScripts = () => {
  //   console.log("-----spritePos-----", spritePosition);
  //   Animated.timing(pan, {
  //     toValue: { x: spritePosition.x, y: spritePosition.y },
  //     duration: 100,
  //     useNativeDriver: false,
  //   }).start();

  //   Animated.timing(rotation, {
  //     toValue: spriteRotation,
  //     duration: 100,
  //     useNativeDriver: false,
  //   }).start();
  // };

  const createPanResponder = (index) =>
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panRefs[index].setOffset({
          x: panRefs[index].x._value,
          y: panRefs[index].y._value,
        });
        panRefs[index].setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: panRefs[index].x, dy: panRefs[index].y }],
        {
          useNativeDriver: false,
        }
      ),
      onPanResponderRelease: () => {
        panRefs[index].flattenOffset();
        setSprites((prevSprites) => {
          const updatedSprites = [...prevSprites];
          updatedSprites[index].position = {
            x: panRefs[index].x._value,
            y: panRefs[index].y._value,
          };
          return updatedSprites;
        });
      },
    });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        setSpritePosition({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
    })
  ).current;

  useEffect(() => {
    console.log("showHello:", showHello);
  }, [showHello]);

  // return (
  //   <View style={styles.stage}>
  //     <Animated.View
  //       {...panResponder.panHandlers}
  //       style={[
  //         styles.sprite,
  //         {
  //           transform: [
  //             { translateX: pan.x },
  //             { translateY: pan.y },
  //             {
  //               rotate: rotation.interpolate({
  //                 inputRange: [0, 360],
  //                 outputRange: ["0deg", "360deg"],
  //               }),
  //             },
  //           ],
  //         },
  //       ]}
  //     >
  //       <View style={styles.sprite} onLayout={handleLayout}>
  //         {showHello && (
  //           <View
  //             style={[
  //               styles.messageContainer,
  //               {
  //                 borderWidth: 1,
  //                 marginTop: -30,
  //               },
  //             ]}
  //           >
  //             <Text style={styles.messageText}>Hello!</Text>
  //           </View>
  //         )}
  //         {showThink && (
  //           <View
  //             style={[styles.cloudContainer]}
  //             onLayout={(event) => {
  //               const { width, height } = event.nativeEvent.layout;
  //               setMessageDimensions({ width, height });
  //             }}
  //           >
  //             <Image
  //               style={styles.cloud}
  //               source={require("../assets/cloud-messaging.png")}
  //             />
  //             <Text
  //               style={{
  //                 position: "absolute",
  //                 marginTop: 20,
  //                 marginBottom: -20,
  //                 marginRight: -25,
  //                 marginLeft: 5,
  //                 fontSize: 10,
  //               }}
  //             >
  //               Hmm...
  //             </Text>
  //           </View>
  //         )}

  //         <SvgXml
  //           xml={CatIcon}
  //           preserveAspectRatio="xMinYMin slice"
  //           opacity={hide ? 0 : "100%"}
  //           width={58}
  //           height={62}
  //         />
  //       </View>
  //     </Animated.View>
  //   </View>
  // );

  return (
    <View style={styles.stage}>
      {true
        ? sprites.map((sprite, index) => (
            <Animated.View
              key={sprite.id}
              {...createPanResponder(index).panHandlers}
              style={[
                styles.sprite,
                {
                  transform: [
                    { translateX: panRefs[index].x },
                    { translateY: panRefs[index].y },
                    {
                      rotate: rotationRefs[index].interpolate({
                        inputRange: [0, 360],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                  opacity: sprite.isVisible ? 1 : 0,
                },
              ]}
            >
              {/* <View style={styles.sprite} onLayout={handleLayout}> */}
              {sprites[index].showHello && (
                <View
                  style={[
                    styles.messageContainer,
                    {
                      borderWidth: 1,
                      marginTop: -30,
                    },
                  ]}
                >
                  <Text style={styles.messageText}>Hello!</Text>
                </View>
              )}
              {sprites[index].showThink && (
                <View
                  style={[styles.cloudContainer]}
                  onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setMessageDimensions({ width, height });
                  }}
                >
                  <Image
                    style={styles.cloud}
                    source={require("../assets/cloud-messaging.png")}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      marginTop: 20,
                      marginBottom: -20,
                      marginRight: -25,
                      marginLeft: 5,
                      fontSize: 10,
                    }}
                  >
                    Hmm...
                  </Text>
                </View>
              )}
              <SvgXml
                xml={CatIcon}
                preserveAspectRatio="xMinYMin slice"
                width={58}
                height={62}
              />
            </Animated.View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  stage: {
    flex: 3,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  sprite: {
    position: "absolute",
  },
  messageContainer: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: 45,
    padding: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    zIndex: 99,
    width: 70,
  },
  messageText: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    fontSize: 16,
    color: "black",
  },
  cloud: {
    width: 55,
    height: 55,
    marginLeft: -10,
  },
  cloudContainer: {
    position: "absolute",
    marginTop: -50,
    marginLeft: -10,
  },
  stage: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  sprite: {
    position: "absolute",
  },
});

export default React.memo(Stage);
