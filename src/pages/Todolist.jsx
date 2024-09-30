import {useState, useEffect} from 'react'

const Todolist = () => {

    const [todos, setTodos] = useState([])

    useEffect(() => {

        const fetchTodos = async () => {    
            const response = await fetch('https://dummyjson.com/todos')
            const data = await response.json()
            setTodos(data.todos.splice(1,9))
        };

        fetchTodos();}, [])


  return (
    <div className='flex items-center justify-center h-screen'>
        <div>
            <h1 className='text-3xl font-bold mb-4'>Your Todos</h1>
            {todos.map(todo => (
                <li key={todo.id} className='border my-2 py-2'>
                    {todo.todo}
                </li>))}

        </div>

    </div>
  )
}

export default Todolist