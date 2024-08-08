import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const TodoDetails = () => {
  const navigation = useNavigation();
  const { todo } = useRoute().params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Task Title: {todo.title}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Description: {todo.description}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Status: {todo.status}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ color: 'blue', marginTop: 20 }}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoDetails;
