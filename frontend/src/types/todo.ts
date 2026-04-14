export interface Todo {
    id: string
    title: string
    description: string
    done: boolean
    createdAt: string
    updatedAt: string
}

export interface TodoFormData {
    title: string;
    description: string;
}
