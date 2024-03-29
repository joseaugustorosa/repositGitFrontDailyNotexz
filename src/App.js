
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login'
import Home from './pages/home'
import Dev from './pages/dev'

import './App.css'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/Dev" element={<Dev/>}/>

    </Routes>
    <ToastContainer />
  </Router>
  
  );
}

export default App;
