import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(text) {
        const trimmed = String(text ?? '').trim()
        return {
          payload: {
            id: nanoid(),
            text: trimmed,
            completed: false,
          },
        }
      },
    },
    toggleTodo(state, action) {
      const id = action.payload
      const todo = state.items.find((t) => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo(state, action) {
      const id = action.payload
      state.items = state.items.filter((t) => t.id !== id)
    },
    clearCompleted(state) {
      state.items = state.items.filter((t) => !t.completed)
    },
    editTodo(state, action) {
      const { id, text } = action.payload
      const todo = state.items.find((t) => t.id === id)
      if (todo) {
        todo.text = String(text ?? '').trim()
      }
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, clearCompleted, editTodo } = todosSlice.actions

export const selectTodos = (state) => state.todos.items

export default todosSlice.reducer


