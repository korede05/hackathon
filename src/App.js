import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //used to link pages
import Home from './pages/home'; //importing the home page
import LoginPage from './pages/login'; //importing the login page
import Navbar from './components/navbar'; //importing the navbar
import Meals from './pages/meals';
import SearchResults from "./pages/recipe_map"; 
import CarbonFootprint from './pages/carbonfootprint';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes> 
        <Route exact path="/" element={<Home />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/meals' element={<Meals />} />
        <Route exact path="/search" element={<SearchResults />} />
        <Route exact path='/carbon-footprint-calculator' element={<CarbonFootprint />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
