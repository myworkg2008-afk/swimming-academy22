import React, { useState } from 'react';
import { Table, Button, Container, Badge, Row, Col, Form, InputGroup, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUserPlus, FaSearch, FaSave } from 'react-icons/fa';

const Players = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "Ahmed Mohamed Ali", age: 10, level: "Beginner", status: "Active", phone: "01012345678" },
    { id: 2, name: "Sara Mahmoud Hassan", age: 12, level: "Intermediate", status: "Expired", phone: "01122334455" },
    { id: 3, name: "Yassin Kareem Samir", age: 8, level: "Advanced", status: "Active", phone: "01255667788" },
    { id: 4, name: "Layla Youssef", age: 14, level: "Beginner", status: "Active", phone: "01599887766" },
    { id: 5, name: "Omar Khaled", age: 9, level: "Intermediate", status: "Expired", phone: "01000112233" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    age: "",
    level: "Beginner",
    phone: "",
    status: "Active"
  });

  const handleShowAdd = () => {
    setIsEditing(false);
    setFormData({ id: null, name: "", age: "", level: "Beginner", phone: "", status: "Active" });
    setShowModal(true);
  };

  const handleShowEdit = (player) => {
    setIsEditing(true);
    setFormData(player);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPlayers(players.map(p => (p.id === formData.id ? formData : p)));
    } else {
      const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
      setPlayers([...players, { ...formData, id: newId }]);
    }
    handleClose();
  };

  const deletePlayer = (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      setPlayers(players.filter((player) => player.id !== id));
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    player.phone.includes(searchTerm)
  );

  return (
    <Container className="mt-5 shadow-sm p-4 bg-white rounded text-start">
      <Row className="mb-4 align-items-center">
        <Col md={4}><h2 className="text-primary fw-bold">Players Management 🏊‍♂️</h2></Col>
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
            <Form.Control 
              placeholder="Search..." 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </InputGroup>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="success" onClick={handleShowAdd}>
            <FaUserPlus className="me-2" /> Add New Player
          </Button>
        </Col>
      </Row>

      <Table hover responsive className="align-middle text-center">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Level</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td className="fw-bold text-start">{player.name}</td>
              <td>{player.age}</td>
              <td>{player.level}</td>
              <td><Badge bg={player.status === "Active" ? "success" : "danger"} pill>{player.status}</Badge></td>
              <td>
                <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleShowEdit(player)}>
                  <FaEdit />
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => deletePlayer(player.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className={isEditing ? "bg-info text-white" : "bg-primary text-white"}>
          <Modal.Title>{isEditing ? "Edit Player Details" : "Add New Player"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Level</Form.Label>
                  <Form.Select name="level" value={formData.level} onChange={handleChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Parent Phone</Form.Label>
              <Form.Control 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant={isEditing ? "info" : "primary"} type="submit">
              <FaSave className="me-2" /> {isEditing ? "Update Changes" : "Save Player"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Players;