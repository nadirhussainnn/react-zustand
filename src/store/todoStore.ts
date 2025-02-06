import { create } from 'zustand'
import { Todo } from '../types/todo'

interface TodoState {
  todos: Todo[]
  addTodo: (title: string, description: string) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, title: string, description: string) => void
  getTodoById: (id: string) => Todo | undefined
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  
  addTodo: (title, description) => set((state) => ({
    todos: [...state.todos, {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    }]
  })),
  
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  updateTodo: (id, title, description) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, title, description } : todo
    )
  })),
  
  getTodoById: (id) => get().todos.find(todo => todo.id === id)
}))