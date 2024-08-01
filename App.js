import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import MainScreen from "./screens/MainScreen";
import SpriteEditorScreen from "./screens/SpriteEditorScreen";
import store from "./store";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Scratch App" component={MainScreen} />
          <Stack.Screen name="SpriteEditor" component={SpriteEditorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
