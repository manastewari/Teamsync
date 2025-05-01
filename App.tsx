import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import MembersPage from './pages/MembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-member" element={<AddMemberPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/:id" element={<MemberDetailsPage />} />
        </Routes>
      </Layout>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;