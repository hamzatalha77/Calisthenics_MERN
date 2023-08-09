import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/auth'
import CreateExercise from './pages/createExerciseScreen'
// import SavedExercise from './pages/savedExercise'
import Navbar from './components/navbar'
import TableExercise from './pages/tableExerciseScreen'
import EditExercise from './pages/editExerciseScreen'
import CreateCategoryScreen from './pages/createCategoryScreen'
import TableCategoryScreen from './pages/tableCategoryScreen'
import CreateSubcategoryScreen from './pages/createSubcategoryScreen'
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
