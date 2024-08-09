// import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import TodoDetails from "../pages/TodoDetails";
// import Store from "../redux/Store";
// import { Provider } from 'react-redux';


const { Navigator, Screen } = createNativeStackNavigator();

const StackRoute = () => {
 
  return (
    <Navigator>

          {/* <Provider Store ={Store}> */}
      <Screen name="Home" component={Home} />
      <Screen
        name="Todo-details"
        options={{
          title: "TODO DETAILS",
        }}
        component={TodoDetails}
      />
     
      {/* </Provider> */}
    </Navigator>
  );
};

export default StackRoute;
