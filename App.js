import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Divider } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  const addTodo = () => {
    if (title.trim() && description.trim()) {
      setTodos([...todos, { id: uuidv4(), title, description, status: 'Active' }]);
      setTitle('');
      setDescription('');
    }
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
        placeholder="Title........."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Desc........"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add" onPress={addTodo} color={'black'}/>
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
          <View style={styles.todo}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
            <Button
              title={item.status === 'Active' ? 'Task as Done' : 'Task as Active'}
              onPress={() => {
                setTodos(todos.map(todo =>
                  todo.id === item.id
                    ? { ...todo, status: todo.status === 'Active' ? 'Done' : 'Active' }
                    : todo
                ));
              }}
            />
          </View>
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
    justifyContent:'center',
    marginVertical: 16,
    backgroundColor:'black',
    color:'white',
   
    height:100,
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
    padding: 32,
   
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',

  },
});

export default App;
