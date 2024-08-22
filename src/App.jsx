import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import CategoryPage from './pages/Categories';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <main className="p-4">
        <Routes>
          <Route path="/register" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute  />}>
            <Route path="/categories" element={<CategoryPage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
