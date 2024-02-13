import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const EmployeeDetailsForm = ({ employeeData, months, handleInputChange, handleGetPaySlip, handleClear }) => {
    return (
        <Container className="d-flex justify-content-center">
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            onChange={handleInputChange}
                            value={employeeData.firstName}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            onChange={handleInputChange}
                            value={employeeData.lastName}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="annualSalary">
                        <Form.Label>Annual Salary <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Annual Salary"
                            onChange={handleInputChange}
                            value={employeeData.annualSalary}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-5">
                    <Form.Group as={Col} controlId="payPeriod">
                        <Form.Label>Select Pay Period <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            as="select"
                            onChange={handleInputChange}
                            value={employeeData.payPeriod || ""}
                            required
                        >
                            <option value="" disabled>Select Month</option>
                            {months.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="superRate">
                        <Form.Label>Super Rate (0-50) <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Super Rate"
                            onChange={handleInputChange}
                            value={employeeData.superRate}
                            required
                        />
                    </Form.Group>
                </Row>
               
                <Form.Group controlId="buttons">
                    <Row className="mb-3">
                        <Col>
                            <Button variant="primary" onClick={() => handleGetPaySlip()} className="me-4">
                                PaySlip
                            </Button>
                            <Button variant="secondary" onClick={() => handleClear()}>
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Container>
    );
};
export default EmployeeDetailsForm;