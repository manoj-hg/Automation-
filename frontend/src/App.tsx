import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewsFeed from './pages/NewsFeed';
import ApprovalQueue from './pages/ApprovalQueue';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/approval" element={<ApprovalQueue />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
