// import React from 'react'

// const Confirm = () => {

//     const [selectedTodoId, setSelectedTodoId] = useState(null); 
//     const [dialogVisible, setDialogVisible] = useState(false); 

//     const confirmDelete = (id) => {
//         setSelectedTodoId(id);
//         setDialogVisible(true);
//       };
    
//       const deleteTodo = () => {
//         setTodos(todos.filter(todo => todo.id !== selectedTodoId));
//         setDialogVisible(false);
//         setSelectedTodoId(null);
//       };
//   return (
//     <Dialog
//     isVisible={dialogVisible}
//     onBackdropPress={() => setDialogVisible(false)}
//   >
//     <Dialog.Title title="Confirm Deletion" />
//     <Text>Are you sure you want to delete this task?</Text>
//     <Dialog.Actions>
//       <Dialog.Button title="No" onPress={() => setDialogVisible(false)} />
//       <Dialog.Button title="Yes" onPress={deleteTodo} />
//     </Dialog.Actions>
//   </Dialog>
//   )
// }

// export default Confirm