import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Players from './pages/Players'; 
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Attendance from './pages/Attendance';
import Login from './pages/Login';
import './App.css';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Ahmed Mohamed Ali", age: 10, level: "Beginner", status: "Active", phone: "01012345678" },
    { id: 2, name: "Sara Mahmoud Hassan", age: 12, level: "Intermediate", status: "Expired", phone: "01122334455" },
    { id: 3, name: "Yassin Kareem Samir", age: 8, level: "Advanced", status: "Active", phone: "01255667788" },
  ]);

  const [user, setUser] = useState(null); 
  const [presentCount, setPresentCount] = useState(0);

  return (
    <Router>
      
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="d-flex">
          <Sidebar user={user} setUser={setUser} />
          <div className="flex-grow-1" style={{ marginLeft: '280px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Routes>
              <Route path="/" element={<Dashboard players={players} presentCount={presentCount} />} />
              <Route 
                path="/players" 
                element={user.role !== 'Parent' ? <Players players={players} setPlayers={setPlayers} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/attendance" 
                element={user.role !== 'Parent' ? <Attendance players={players} setPresentCount={setPresentCount} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/subscriptions" 
                element={user.role === 'Admin' ? <Subscriptions players={players} setPlayers={setPlayers} /> : <Navigate to="/" />} 
              />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;