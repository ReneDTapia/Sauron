export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'resident' | 'manager'
  avatar?: string
}

export interface Todo {
  id: number
  content: string
  completed: boolean
}

export interface Meta {
  totalCount: number
}