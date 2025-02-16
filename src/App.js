import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //used to link pages
import Home from './pages/home'; //importing the home page
import Navbar from './components/navbar'; //importing the navbar
import Meals from './pages/meals';
import SearchResults from "./pages/recipe_map"; 
import CarbonFootprint from './pages/carbonfootprint';
import Register from "../src/components/Register";
import Login from "../src/components/login";
import About from "./pages/about";
import Profile from "./pages/profile";
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes> 
        <Route exact path="/" element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/meals' element={<Meals />} />
        <Route exact path="/search" element={<SearchResults />} />
        <Route exact path='/carbon-footprint-calculator' element={<CarbonFootprint />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
