import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from './pages/Details'
import TodoPage from './pages/TodoPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Notfound from './pages/Notfound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<Details/>} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
