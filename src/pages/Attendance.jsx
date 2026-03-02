import React, { useState } from 'react';
import { Container, Table, Form, Button, Row, Col, Card, Badge, InputGroup } from 'react-bootstrap';
import { FaSave, FaSearch } from 'react-icons/fa';

const Attendance = ({ players }) => {
  
  const [presentIDs, setPresentIDs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheck = (id) => {
    if (presentIDs.includes(id)) {
      setPresentIDs(presentIDs.filter(playerID => playerID !== id));
    } else {
      setPresentIDs([...presentIDs, id]);
    }
  };

  const handleSave = () => {
    alert(`Attendance Saved! \nPresent: ${presentIDs.length} \nAbsent: ${players.length - presentIDs.length}`);
  };

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 p-4">
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <h2 className="text-primary fw-bold">Daily Attendance 📅</h2>
            <p className="text-muted">Date: {new Date().toLocaleDateString()}</p>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="success" size="lg" onClick={handleSave} className="d-flex align-items-center ms-auto shadow-sm">
              <FaSave className="me-2" /> Save Attendance
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search by player name..."
                className="border-start-0 shadow-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col className="text-end d-flex align-items-center justify-content-end">
             <span className="me-3 text-muted">Total: <b>{players.length}</b></span>
             <Badge bg="success" className="p-2">Present: {presentIDs.length}</Badge>
          </Col>
        </Row>

        <Table hover responsive className="align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>#</th>
              <th className="text-start">Player Name</th>
              <th>Level</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <tr key={player.id} className={presentIDs.includes(player.id) ? "table-success" : ""}>
                  <td>{player.id}</td>
                  <td className="text-start fw-bold">{player.name}</td>
                  <td>{player.level}</td>
                  <td>
                    {presentIDs.includes(player.id) ? 
                      <Badge bg="success">Present</Badge> : 
                      <Badge bg="secondary" className="opacity-50">Absent</Badge>
                    }
                  </td>
                  <td>
                    <Form.Check 
                      type="switch"
                      id={`attendance-switch-${player.id}`}
                      checked={presentIDs.includes(player.id)}
                      onChange={() => handleCheck(player.id)}
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-muted">No players found match your search.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default Attendance;