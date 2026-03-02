import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaUserShield, FaUserPlus, FaUserTie, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'Admin' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ email: formData.email, role: formData.role });
    navigate('/'); 
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Row className="w-100 justify-content-center">
        <Col md={5}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <div className="bg-primary d-inline-block p-3 rounded-circle text-white mb-3">
                  <FaUserShield size={40} />
                </div>
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted">Please enter your details to login</p>
              </div>

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white border-end-0"><FaEnvelope className="text-muted"/></InputGroup.Text>
                    <Form.Control 
                      type="email" 
                      placeholder="name@example.com" 
                      className="border-start-0 shadow-none"
                      required
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white border-end-0"><FaLock className="text-muted"/></InputGroup.Text>
                    <Form.Control 
                      type="password" 
                      placeholder="••••••••" 
                      className="border-start-0 shadow-none"
                      required
                    />
                  </InputGroup>
                </Form.Group>

                {/* Role Selection - الخطوة الأهم */}
                <Form.Group className="mb-4">
                  <Form.Label>Login As</Form.Label>
                  <div className="d-flex gap-2">
                    {['Admin', 'Coach', 'Parent'].map((role) => (
                      <Button
                        key={role}
                        variant={formData.role === role ? 'primary' : 'outline-primary'}
                        className="flex-grow-1 py-2"
                        onClick={() => setFormData({...formData, role})}
                      >
                        {role === 'Admin' && <FaUserShield className="me-1" />}
                        {role === 'Coach' && <FaUserTie className="me-1" />}
                        {role === 'Parent' && <FaUserPlus className="me-1" />}
                        {role}
                      </Button>
                    ))}
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-3 fw-bold shadow-sm rounded-3">
                  Sign In
                </Button>

                <div className="text-center mt-3">
                  <a href="https://support.google.com/mail/answer/41078?hl=en&co=GENIE.Platform%3DDesktop" className="text-decoration-none small text-muted">Forgot Password?</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;