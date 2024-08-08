import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  const navigation = useNavigation();

  useEffect(() => {
    // Load todos from AsyncStorage when the app starts
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error("Failed to load todos", error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    // Save todos to AsyncStorage whenever they change
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error("Failed to save todos", error);
      }
    };

    saveTodos();
  }, [todos]);

  const addTodo = () => {
    if (title.trim() && description.trim()) {
      setTodos([...todos, { id: uuidv4(), title, description, status: 'Active' }]);
      setTitle('');
      setDescription('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    return todo.status === filter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TODO APP</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add" onPress={addTodo} color={'black'} />
      <Divider style={styles.divider} />
      <View style={styles.filterButtons}>
        <TouchableOpacity onPress={() => setFilter('All')}>
          <Text style={filter === 'All' ? styles.activeFilter : styles.filter}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Active')}>
          <Text style={filter === 'Active' ? styles.activeFilter : styles.filter}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Done')}>
          <Text style={filter === 'Done' ? styles.activeFilter : styles.filter}>Done</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todo}
            onPress={() => navigation.navigate('TodoDetails', { todo: item })}
          >
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
            <View style={styles.buttonGroup}>
              <Button
                style={styles.btn}
                title={item.status === 'Active' ? 'Task is Done' : 'Task is Active'}
                onPress={() => {
                  setTodos(todos.map(todo =>
                    todo.id === item.id
                      ? { ...todo, status: todo.status === 'Active' ? 'Done' : 'Active' }
                      : todo
                  ));
                }}
                color="green"
              />
              <Icon
                name="delete"
                type="material"
                color="red"
                onPress={() => deleteTodo(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    backgroundColor: 'black',
    color: 'white',
    height: 100,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  filter: {
    fontSize: 16,
    color: 'black',
  },
  activeFilter: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  todo: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn: {
    width: "50%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Home;
