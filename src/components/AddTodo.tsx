import React from 'react'
import { Form, Input, Button, Card } from 'antd'
import { useTodoStore } from '../store/todoStore'

export const AddTodo: React.FC = () => {
  const [form] = Form.useForm()
  const addTodo = useTodoStore(state => state.addTodo)
  
  const handleSubmit = (values: { title: string; description: string }) => {
    addTodo(values.title, values.description)
    form.resetFields()
  }
  
  return (
    <Card style={{ marginBottom: 20 }}>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="What needs to be done?" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Add some details..." />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}