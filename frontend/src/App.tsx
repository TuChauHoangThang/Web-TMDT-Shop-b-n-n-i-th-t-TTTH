import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import './App.css'; // Vite default app css, we can keep or delete.

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Placeholder for other pages to avoid 404 while developing */}
        <Route path="*" element={<div className="container section" style={{ minHeight: '50vh' }}><h3>Đang phát triển...</h3></div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
