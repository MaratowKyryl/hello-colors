import { useFonts } from "expo-font";
import { useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { generateRandomColorRGB, getOppositeColorRGB } from "./src/utils/colors";

export default function App() {
  const [loaded] = useFonts({
    Pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
  });
  const textInputRef = useRef<TextInput>();
  const [bgColor, setBgColor] = useState(generateRandomColorRGB());
  const [newColor, setNewColor] = useState(generateRandomColorRGB());
  const positionX = useSharedValue(-100);
  const positionY = useSharedValue(-100);
  const scale = useSharedValue(0);
  const textColor = useSharedValue(getOppositeColorRGB(bgColor));

  const handlePressIn = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    const locaNewColor = generateRandomColorRGB();
    setNewColor(locaNewColor);
    positionX.value = locationX;
    positionY.value = locationY;
    scale.value = withTiming(100, { duration: 400 }, () => {
      runOnJS(setBgColor)(locaNewColor);
      scale.value = 0;
      positionX.value = -100;
      positionY.value = -100;
    });
    const localNewTextColor = getOppositeColorRGB(locaNewColor);
    textColor.value = withTiming(localNewTextColor, { duration: 400 });
  };

  const newColorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    left: positionX.value - 50,
    top: positionY.value - 50,
  }));

  if (!loaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput style={{ width: 200, height: 40, borderWidth: 1 }} ref={textInputRef} />
      <Button title="PRESS" onPress={() => console.log(textInputRef.current?.context)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 35,
    fontFamily: "Pacifico",
    position: "absolute",
  },
  animatedView: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
