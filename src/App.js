import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Components
import Navbar from './components/Navbar';
import Home from './pages/home/Home.js';
import Create from './pages/create/Create.js';
import Search from './pages/search/Search.js';
import Recipe from './pages/recipe/Recipe.js';
import ThemeSelector from './components/ThemeSelector';

// Styles
import './App.css';
import { useTheme } from './hooks/useTheme';

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
