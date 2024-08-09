import "@expo/metro-runtime";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackRoute from "./src/shared/StackRoute";
import CompletedTasks from "./src/pages/CompletedTasks";
import { Provider } from "react-redux";
import store from "./src/redux/Store";


const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>

      <Navigator
        screenOptions={{
          headerBackVisible: false,
          tabBarStyle: {
            position: "absolute",
            width: "90%",
            bottom: 20,
            borderWidth: 1,
            borderColor: "grey",
            borderTopColor: "grey",
            borderRadius: 20,
            left: "5%",
          },
        }}
      >
        <Screen name="Main" options={{headerShown: false}} component={StackRoute} />
        <Screen name="Completed Task" component={CompletedTasks} />
      </Navigator>
      </Provider>
    </NavigationContainer>
  );
}
