import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import CarouselSide from "./components/Carousel";
import CryptoList from "./components/CryptoList";
import CoinDetail from "./components/CoinDetail"; // Import your detail page component

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route path="/about/:coinId" element={<CoinDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
