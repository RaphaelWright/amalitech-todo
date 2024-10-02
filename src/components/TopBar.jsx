import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'



const TopBar = () => {
    const navigate = useNavigate();

    const signout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

  return (
    <div className="flex shadow">
        <h1 className=" flex text-4xl font-medium py-4 ml-8">Todo List</h1>
        <LogOut size={32} className="ml-auto mr-8 my-auto hover:text-pink" onClick={signout} />
        
        </div>

  )
}

export default TopBar