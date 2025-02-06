// App.tsx
import React from 'react'
import { Layout, Typography } from 'antd'
import { AddTodo } from './components/AddTodo'
import { TodoList } from './components/TodoList'

const { Content } = Layout
const { Title } = Typography

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '50px', maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          Vite - Zustand Todo App
        </Title>
        <AddTodo />
        <TodoList />
      </Content>
    </Layout>
  )
}

export default App