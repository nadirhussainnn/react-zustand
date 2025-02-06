import React, { useState } from 'react'
import { Table, Button, Modal, Checkbox, Form, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTodoStore } from '../store/todoStore'
import type { Todo } from '../types/todo'

export const TodoList: React.FC = () => {
  const { todos, toggleTodo, deleteTodo, updateTodo } = useTodoStore()
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [form] = Form.useForm()

  const columns = [
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (_: boolean, record: Todo) => (
        <Checkbox
          checked={record.completed}
          onChange={() => toggleTodo(record.id)}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Todo) => (
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingTodo(record)
              form.setFieldsValue(record)
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteTodo(record.id)}
          />
        </>
      ),
    },
  ]

  const handleUpdate = (values: { title: string; description: string }) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, values.title, values.description)
      setEditingTodo(null)
    }
  }

  return (
    <>
      <Table
        dataSource={todos}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      
      <Modal
        title="Edit Todo"
        open={!!editingTodo}
        onOk={() => form.submit()}
        onCancel={() => setEditingTodo(null)}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}