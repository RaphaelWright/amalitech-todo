import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from './pages/Details'
import TodoPage from './pages/TodoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/details/:id" element={<Details/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
