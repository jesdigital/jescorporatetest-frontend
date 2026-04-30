import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import StandardPageDetail from './pages/StandardPageDetail.jsx'
import { HelmetProvider } from 'react-helmet-async';

function App() {

  return (    
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/projects/:id' element={<ProjectDetail />} />
          <Route path='/:id' element={<StandardPageDetail />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
