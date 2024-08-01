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

  useEffect(() => {
    Animated.timing(pan, {
      toValue: { x: spritePosition.x, y: spritePosition.y },
      duration: 100,
      useNativeDriver: false,
    }).start();
    console.log("rotation:", rotation);
    console.log("Sprite Rot:", spriteRotation);
    Animated.timing(rotation, {
      toValue: spriteRotation,
      duration: 100,
      useNativeDriver: false,
    }).start();
    console.log("rotation:", rotation);
  }, [playOn, spritePosition]);

  const animateScripts = () => {
    console.log("-----spritePos-----", spritePosition);
    Animated.timing(pan, {
      toValue: { x: spritePosition.x, y: spritePosition.y },
      duration: 100,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotation, {
      toValue: spriteRotation,
      duration: 100,
      useNativeDriver: false,
    }).start();
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

  return (
    <View style={styles.stage}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sprite,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.sprite} onLayout={handleLayout}>
          {showHello && (
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
          {showThink && (
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
            opacity={hide ? 0 : "100%"}
            width={58}
            height={62}
          />
        </View>
      </Animated.View>
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
});

export default React.memo(Stage);