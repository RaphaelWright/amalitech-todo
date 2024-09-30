import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todolist from './pages/Todolist'
import Details from './pages/Details'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todolist />} />
        <Route path="/details" element={<Details/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
