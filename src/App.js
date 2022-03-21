import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Page Components
import Navbar from './components/Navbar'
import Home from './pages/home/Home.js'
import Create from './pages/create/Create.js'
import Search from './pages/search/Search.js'
import Recipe from './pages/recipe/Recipe.js'
import ThemeSelector from './components/ThemeSelector'

// Styles
import './App.css'
import { useTheme } from './hooks/useTheme'

function App() {
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/recipes/:id">
            <Recipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
