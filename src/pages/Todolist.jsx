import {useState, useEffect} from 'react'

const Todolist = () => {

    const [todos, setTodos] = useState([])

    useEffect(() => {

        const fetchTodos = async () => {    
            const response = await fetch('https://dummyjson.com/todos')
            const data = await response.json()
            setTodos(data.todos)
        };

        fetchTodos();}, [])


  return (
    <div>
        {todos.map(todo => (
            <li key={todo.id} className='border'>
                {todo.todo}
            </li>))}

    </div>
  )
}

export default Todolist