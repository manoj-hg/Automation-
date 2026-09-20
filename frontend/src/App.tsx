import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewsFeed from './pages/NewsFeed';
import ApprovalQueue from './pages/ApprovalQueue';
import Agents from './pages/Agents';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/approvals" element={<ApprovalQueue />} />
          <Route path="/agents" element={<Agents />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
