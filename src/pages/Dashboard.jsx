import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaSwimmer, FaMoneyBillWave, FaCalendarCheck } from 'react-icons/fa';

const Dashboard = ({ players, presentCount }) => {
  
  const totalPlayersCount = players.length;
  
  const activePlayers = players.filter(p => p.status === "Active").length;
  
  const revenue = activePlayers * 500; 

  const stats = [
    { 
      id: 1, 
      title: "Total Players", 
      value: totalPlayersCount, 
      icon: <FaUsers size={30} />, 
      color: "primary", 
      subtitle: "Registered members" 
    },
    { 
      id: 2, 
      title: "Active Subscriptions", 
      value: activePlayers, 
      icon: <FaSwimmer size={30} />, 
      color: "success", 
      subtitle: "Ready for class" 
    },
    { 
      id: 3, 
      title: "Total Revenue", 
      value: `${revenue.toLocaleString()} EGP`, 
      icon: <FaMoneyBillWave size={30} />, 
      color: "info", 
      subtitle: "Current month" 
    },
    { 
      id: 4, 
      title: "Today's Attendance", 
      value: presentCount || 0,
      icon: <FaCalendarCheck size={30} />, 
      color: "warning", 
      subtitle: "Checked-in today" 
    },
  ];

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark">Academy Overview</h2>
          <p className="text-muted">Live updates from your database.</p>
        </div>
      </div>

      <Row>
        {stats.map((stat) => (
          <Col key={stat.id} lg={3} md={6} className="mb-4">
            <Card className="shadow-sm border-0 h-100 text-white" 
                  style={{ background: `linear-gradient(45deg, var(--bs-${stat.color}), #6c757d)` }}>
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 opacity-75">{stat.icon}</div>
                <div>
                  <Card.Title className="mb-0 fs-6 fw-light">{stat.title}</Card.Title>
                  <Card.Text className="fs-3 fw-bold mb-0">{stat.value}</Card.Text>
                  <small className="opacity-75">{stat.subtitle}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="p-4 bg-white shadow-sm border-0 rounded text-center">
             <h4 className="fw-bold">Management Insight 🏊‍♂️</h4>
             <p className="text-muted mb-0">
               You currently have <b>{activePlayers}</b> active players out of <b>{totalPlayersCount}</b>. 
               The attendance for today is <b>{((presentCount / totalPlayersCount) * 100 || 0).toFixed(1)}%</b>.
             </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;