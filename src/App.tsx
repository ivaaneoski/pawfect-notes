import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import GreetingView from './pages/GreetingView/GreetingView';
import MyGreetings from './pages/MyGreetings/MyGreetings';
import { GlobalDecorCat } from './components/ui/PixelCats';

function App() {
  return (
    <Router>
      <GlobalDecorCat />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/g/:id" element={<GreetingView />} />
        <Route path="/my-greetings" element={<MyGreetings />} />
      </Routes>
    </Router>
  );
}

export default App;
