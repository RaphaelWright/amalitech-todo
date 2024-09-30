import Todolist from "./Todolist"

const TodoPage = () => {
  return (
    <div className="bg-background ">
        <div className="shadow">
            <h1 className="text-4xl text-fonts py-4 ml-8">Todo List</h1>
        </div>
        <Todolist />
    </div>
  )
}

export default TodoPage