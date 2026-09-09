import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Content } from './components/Content';
import { Vision } from './components/Vision';
import { Team } from './components/Team';
import { Projects } from './components/Projects';
import { Events } from './components/Events';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/team" element={<Team />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}
