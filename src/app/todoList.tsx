'use client'
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { addTask, getAllTask, updateTask } from '@/actions/cookies'
import { Task } from '@/lib/types';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { deleteTask } from "@/actions/cookies"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

export function DelAlertDialog({
  btnText, func
}: {
  btnText: string,
  func: () => Promise<void>
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{btnText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除该任务</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={func}>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function MsgBoard() {
  const [task, setTask] = useState<string>("");
  const [allTasks, setallTasks] = useState<Task[]>([])

  // 在组件初次挂载时获取任务列表
  useEffect(() => {
    async function fetchAllTasks() {
      const newAllTasks: Task[] = await getAllTask();
      setallTasks(newAllTasks);
    }
    fetchAllTasks();
  }, []);

  // 添加新任务
  async function handleTaskSubmit() {
    if (!task) {
      alert("Please enter a task")
      return
    }
    const newAllTasks: Task[] = await addTask(task)
    setallTasks(newAllTasks)
    setTask("")
  };

  // 删除任务
  async function handleTaskDelete(id: string) {
    const newAllTasks: Task[] = await deleteTask(id)
    setallTasks(newAllTasks)
  };

  // 更新任务完成状态
  async function handleTaskFinished(id: string) {
    const newAllTasks: Task[] = await updateTask(id)
    setallTasks(newAllTasks)
  };

  return (
    <>
      {/* 标题和输入框 */}
      <div className="flex w-full max-w-sm mx-auto items-center gap-2">
        <Input
          type="text"
          placeholder="请输入文本"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button onClick={handleTaskSubmit}>
          提交
        </Button>
      </div>
      <Separator className='my-4' />
      {/* 任务列表 */}
      <div className='h-[60vh] overflow-y-auto'>
        <ul>{allTasks.map(task =>
          <li key={task.id}>
            <Card className="mb-2">
              <CardContent className="flex items-center space-x-2">
                <div className="flex items-center gap-3">
                  <Checkbox id={task.id} checked={task.finished} />
                  <Label 
                    className={`text-lg ${task.finished ? "line-through" : ""}`} 
                    htmlFor={task.id}
                  >
                    {task.task}
                  </Label>
                </div>
                <div className="ml-auto space-x-2">
                  <Button onClick={() => handleTaskFinished(task.id)}>
                    完成任务
                  </Button>
                  <DelAlertDialog
                    btnText='删除'
                    func={() => handleTaskDelete(task.id)}
                  />
                </div>
              </CardContent>
            </Card>
          </li>)}
        </ul>
      </div>
    </>
  );
}
