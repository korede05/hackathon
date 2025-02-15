import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //used to link pages
import Home from './pages/home'; //importing the home page
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes> 
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
