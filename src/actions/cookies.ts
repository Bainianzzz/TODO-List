'use server'
import { cookies } from 'next/headers'
import { Task } from '@/lib/types'
import { randomUUID } from 'crypto';

// 增加任务
export async function addTask(task: string): Promise<Task[]> {
    try {
        const cookieStore = await cookies()
        const tasks = await getAllTask()
        const newTask = {
            id: randomUUID().toString(),
            task: task,
            finished: false,
            date: new Date()
        }
        tasks.push(newTask)
        const taskCookie: string = JSON.stringify(tasks)
        cookieStore.set('tasks', taskCookie)
        return tasks
    } catch (err) {
        console.error(err)
        return [] as Task[]
    }
}

// 删除任务
export async function deleteTask(id: string): Promise<Task[]> {
    try {
        const cookieStore = await cookies()
        const tasks = await getAllTask()
        const newTasks = tasks.filter(task => task.id !== id, 1)
        const taskCookie: string = JSON.stringify(newTasks)
        cookieStore.set('tasks', taskCookie)
        return newTasks
    } catch (err) {
        console.error(err)
        return [] as Task[]
    }
}

// 修改任务完成状态
export async function updateTask(id: string): Promise<Task[]> {
    try {
        const cookieStore = await cookies()
        const tasks = await getAllTask()
        tasks.map(task => {
            if (task.id === id) {
                task.finished = !task.finished
                return 
            }
        })
        const taskCookie: string = JSON.stringify(tasks)
        cookieStore.set('tasks', taskCookie)
        return tasks
    } catch (err) {
        console.error(err)
        return [] as Task[]
    }
}

// 获取所有任务
export async function getAllTask(): Promise<Task[]> {
    const cookieStore = await cookies()
    const taskCookie: string | undefined = cookieStore.get('tasks')?.value
    if (taskCookie === undefined) {
        return [] as Task[]
    } else {
        return JSON.parse(taskCookie) as Task[]
    }
}

// export async function getTask(): Promise<Task> {
//     return {} as Task
// }