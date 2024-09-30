import {useState, useEffect} from 'react'
import { Check } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Todolist = () => {

    const [todos, setTodos] = useState([])
    const [completed, setCompleted] = useState(false)

    const handleComplete = () => {
        setCompleted(!completed)
    }

    useEffect(() => {

        const fetchTodos = async () => {    
            const response = await fetch('https://dummyjson.com/todos')
            const data = await response.json()
            const todo = data.todos
            setTodos(todo)
        };

        fetchTodos()
        
        ;}, [])

        


  return (
    <div className='flex items-center justify-center'>
      <div>
        <h1 className='text-3xl text-fonts font-medium text-center mb-4'>Your Todos</h1>
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`bg-[#3c3c3c] border border-r-black-200 text-fonts shadow-black border-l-8 shadow-2xl my-3 py-2 pl-3 border-l-pink list-none rounded transition-transform duration-300 hover:scale-105 ${
                todo.completed ? ' contrast-50' : ''
              }`}
            >
              <Link to={`/details/${todo.id}`}>
                <span className='flex items-center'>
                  {todo.todo} {/* Access the todo text */}
                  <Check className='ml-auto mr-2' strokeWidth={1.5} size={24} onClick={handleComplete} />
                  <Trash2 className='mr-5' strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
     
  )
}
export default Todolist