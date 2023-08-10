import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/authentication/home'
import Auth from './pages/authentication/auth'
import CreateExercise from './pages/Exercises/createExerciseScreen'
// import SavedExercise from './pages/savedExercise'
import Navbar from './components/navbar'
import TableExercise from './pages/Exercises/tableExerciseScreen'
import EditExercise from './pages/Exercises/editExerciseScreen'
import CreateCategoryScreen from './pages/Categories/createCategoryScreen'
import TableCategoryScreen from './pages/Categories/tableCategoryScreen'
import CreateSubcategoryScreen from './pages/Categories/createSubcategoryScreen'
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-exercise" element={<CreateExercise />} />
          <Route path="/create-category" element={<CreateCategoryScreen />} />
          <Route path="/table-category" element={<TableCategoryScreen />} />
          <Route
            path="/add-subcategory/:category_id/subcategories"
            element={<CreateSubcategoryScreen />}
          />

          <Route path="/table-exercise" element={<TableExercise />} />
          <Route path="/edit-exercise/:exerciseId" element={<EditExercise />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
