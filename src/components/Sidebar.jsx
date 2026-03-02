import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaMoneyCheckAlt, FaChartLine, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Sidebar = ({ user, setUser }) => {
  const location = useLocation();

  const handleLogout = () => {
    setUser(null); 
  };

  if (!user) return null;

  return (
    <div className="d-flex flex-column vh-100 p-3 text-white bg-dark shadow" style={{ width: '280px', position: 'fixed' }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold text-info">Swim Academy 🌊</span>
      </Link>
      <hr />
      
      <div className="d-flex align-items-center mb-4 px-2">
        <FaUserCircle size={30} className="me-2 text-secondary" />
        <div>
          <div className="small fw-bold">{user.email.split('@')[0]}</div>
          <div className="text-info" style={{ fontSize: '12px' }}>Role: {user.role}</div>
        </div>
      </div>

      <Nav variant="pills" className="flex-column mb-auto">
        
        <Nav.Item className="mb-2">
          <Nav.Link as={Link} to="/" active={location.pathname === "/"} className="text-white">
            <FaChartLine className="me-2" /> Dashboard
          </Nav.Link>
        </Nav.Item>

        {(user.role === 'Admin' || user.role === 'Coach') && (
          <Nav.Item className="mb-2">
            <Nav.Link as={Link} to="/players" active={location.pathname === "/players"} className="text-white">
              <FaUsers className="me-2" /> Players
            </Nav.Link>
          </Nav.Item>
        )}

        {(user.role === 'Admin' || user.role === 'Coach') && (
          <Nav.Item className="mb-2">
            <Nav.Link as={Link} to="/attendance" active={location.pathname === "/attendance"} className="text-white">
              <FaCalendarAlt className="me-2" /> Attendance
            </Nav.Link>
          </Nav.Item>
        )}

        {user.role === 'Admin' && (
          <Nav.Item className="mb-2">
            <Nav.Link as={Link} to="/subscriptions" active={location.pathname === "/subscriptions"} className="text-white">
              <FaMoneyCheckAlt className="me-2" /> Subscriptions
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>

      <hr />
      <Button 
        variant="link" 
        className="text-danger text-start p-0 text-decoration-none d-flex align-items-center shadow-none" 
        onClick={handleLogout}
      >
        <FaSignOutAlt className="me-2" /> Logout
      </Button>
      <div className="text-secondary mt-2" style={{ fontSize: '10px' }}>© 2026 Admin Panel</div>
    </div>
  );
};

export default Sidebar;