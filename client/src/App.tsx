import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/auth'
import CreateExercise from './pages/createExercise'
import SavedExercise from './pages/savedExercise'
import Navbar from './components/navbar'
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-exercise" element={<CreateExercise />} />
          <Route path="/saved-exercise" element={<SavedExercise />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
