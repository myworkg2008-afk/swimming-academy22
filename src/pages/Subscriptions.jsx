import React, { useState } from 'react';
import { Container, Table, Badge, ProgressBar, Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaSyncAlt, FaMoneyBillWave } from 'react-icons/fa';

const Subscriptions = ({ players, setPlayers }) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    playerId: '',
    plan: 'Monthly',
    amount: 500
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    const updatedPlayers = players.map(player => {
      if (player.id === parseInt(paymentData.playerId)) {
        return { ...player, status: "Active" }; 
      }
      return player;
    });

    setPlayers(updatedPlayers);
    alert(`Payment of ${paymentData.amount} EGP Received! Status updated to Active.`);
    handleClose();
  };

  const handleRenew = (id) => {
    if (window.confirm("Confirm renewal for this player?")) {
      setPlayers(players.map(p => p.id === id ? { ...p, status: "Active" } : p));
    }
  };

  return (
    <Container className="mt-5 text-start">
      <Card className="shadow-sm border-0 p-4">
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="text-primary fw-bold">Subscriptions Management 💰</h2>
            <p className="text-muted">Track payments and activate accounts</p>
          </Col>
          <Col className="text-end">
            <Button variant="info" className="text-white fw-bold shadow-sm" onClick={handleShow}>
              <FaPlus className="me-2" /> New Subscription
            </Button>
          </Col>
        </Row>

        <Table hover responsive className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th className="text-start">Player Name</th>
              <th>Plan Status</th>
              <th>Usage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td className="fw-bold text-start">{player.name}</td>
                <td>
                  <Badge bg={player.status === "Active" ? "success" : "danger"} pill>
                    {player.status}
                  </Badge>
                </td>
                <td style={{ width: '200px' }}>
                  <ProgressBar 
                    now={player.status === "Active" ? 45 : 100} 
                    variant={player.status === "Active" ? "success" : "danger"} 
                    style={{ height: '8px' }} 
                  />
                </td>
                <td>
                  {player.status === "Expired" ? (
                    <Button variant="warning" size="sm" onClick={() => handleRenew(player.id)}>
                      <FaSyncAlt /> Renew
                    </Button>
                  ) : (
                    <Badge bg="light" className="text-dark border text-uppercase">Paid</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>Receive Payment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlePaymentSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Select Player</Form.Label>
              <Form.Select 
                required 
                onChange={(e) => setPaymentData({...paymentData, playerId: e.target.value})}
              >
                <option value="">Choose a player...</option>
                {players.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.status})</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subscription Plan</Form.Label>
                  <Form.Select onChange={(e) => setPaymentData({...paymentData, plan: e.target.value})}>
                    <option value="Monthly">Monthly (500 EGP)</option>
                    <option value="3 Months">3 Months (1300 EGP)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount Paid</Form.Label>
                  <Form.Control type="number" defaultValue="500" />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="success" type="submit">
              <FaMoneyBillWave className="me-2" /> Confirm Payment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Subscriptions;