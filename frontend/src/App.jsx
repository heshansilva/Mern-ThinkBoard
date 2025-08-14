import { Route, Routes } from 'react-router-dom';


import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <button onClick={() => toast.success('Button clicked!')}>click me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} /> 
      </Routes>
    </div>
  )
}

export default App
