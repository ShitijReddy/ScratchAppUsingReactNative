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
    console.log("Sprites:", sprites);
    console.log("PanRefs:", panRefs);
    console.log("RotationRefs:", rotationRefs);
  }, [sprites, panRefs, rotationRefs]);

  useEffect(() => {
    console.log("****** CHANGED ******", sprites);
    sprites.forEach((sprite, index) => {
      if (panRefs[index] && rotationRefs[index]) {
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
      }
    });
  }, [playOn, sprites]);

  useEffect(() => {
    console.log("RENDER ");
    sprites.forEach((sprite, index) => {
      if (panRefs[index] && rotationRefs[index]) {
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
      }
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

  const createPanResponder = (index) => {
    if (!panRefs[index]) {
      panRefs[index] = new Animated.ValueXY();
      rotationRefs[index] = new Animated.Value(0);
    }

    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panRefs[index] &&
          panRefs[index].setOffset({
            x: panRefs[index].x._value,
            y: panRefs[index].y._value,
          });
        panRefs[index] ? panRefs[index].setValue({ x: 0, y: 0 }) : null;
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: panRefs[index] ? panRefs[index].x : new Animated.Value(0),
            dy: panRefs[index] ? panRefs[index].y : new Animated.Value(0),
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
      onPanResponderRelease: () => {
        panRefs[index] && panRefs[index].flattenOffset();
        setSprites((prevSprites) => {
          const updatedSprites = [...prevSprites];
          updatedSprites[index].position = {
            x: panRefs[index] ? panRefs[index].x._value : new Animated.Value(0),
            y: panRefs[index] ? panRefs[index].y._value : new Animated.Value(0),
          };
          return updatedSprites;
        });
      },
    });
  };

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

  useEffect(() => {
    console.log("HIII");
  }, [panRefs.length]);

  return (
    <View style={styles.stage}>
      {sprites.map((sprite, index) => (
        <Animated.View
          key={sprite.id}
          {...createPanResponder(index).panHandlers}
          style={[
            styles.sprite,
            {
              transform: [
                { translateX: panRefs[index] ? panRefs[index].x : 0 },
                { translateY: panRefs[index] ? panRefs[index].y : 0 },
                {
                  rotate: rotationRefs[index]
                    ? rotationRefs[index].interpolate({
                        inputRange: [0, 360],
                        outputRange: ["0deg", "360deg"],
                      })
                    : "0deg",
                },
              ],
              opacity: sprite.isVisible ? 100 : 0,
            },
          ]}
        >
          {sprites[index].showHello && (
            <View
              style={[
                styles.messageContainer,
                {
                  borderWidth: 1,
                  marginLeft: 28 + sprites[index].sizeChange,
                },
              ]}
            >
              <Text style={styles.messageText}>{sprites[index].message}</Text>
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
            width={58 + sprites[index].sizeChange}
            height={64 + sprites[index].sizeChange}
          />
          <Text
            style={{
              right: -5,
            }}
          >
            Sprite {index + 1}
          </Text>
        </Animated.View>
      ))}
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
    // marginLeft: 45,
    padding: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    zIndex: 99,
    minWidth: 70,
    top: -38,
  },
  messageText: {
    backgroundColor: "white",
    padding: 5,
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
