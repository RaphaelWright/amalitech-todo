import Todolist from "./Todolist"

const TodoPage = () => {
  return (
    <div className="bg-background ">
        <div className="shadow">
        <h1 className=" flex text-4xl font-medium text-fonts py-4 ml-8">Todo List</h1>
        </div>
        <br></br>
        <Todolist  />
    </div>
  )
}

export default TodoPage