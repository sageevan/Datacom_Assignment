import React from 'react';
import { Container, Form, Row, Col, FormControl, Button } from 'react-bootstrap';

const EmployeeDetailsForm = ({ employeeData, months, handleInputChange, handleGetPaySlip, handleClear }) => {
    return (
        <Container className="d-flex justify-content-center">
            <Form>
                <Form.Group controlId="firstName">
                    <Row className="mb-3">
                        <Col xs="6" className="text-left">
                            <Form.Label style={{ fontWeight: 600 }}>First Name : </Form.Label>
                        </Col>
                        <Col>
                            <FormControl type="text" placeholder="Enter First Name" onChange={handleInputChange} value={employeeData.firstName} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group as={Col} controlId="lastName">
                    <Row className="mb-3">
                        <Col xs="6" className="text-left">
                            <Form.Label style={{ fontWeight: 600 }}>Last Name :</Form.Label>
                        </Col>
                        <Col>
                            <FormControl type="text" placeholder="Enter Last Name" onChange={handleInputChange} value={employeeData.lastName} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="annualSalary">
                    <Row className="mb-3">
                        <Col xs="6" className="text-left">
                            <Form.Label style={{ fontWeight: 600 }}>Annual Salary :</Form.Label>
                        </Col>
                        <Col>
                            <FormControl type="text" placeholder="Enter Annual Salary" onChange={handleInputChange} value={employeeData.annualSalary} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="payPeriod">
                    <Row className="mb-3">
                        <Col xs="6" className="text-left">
                            <Form.Label style={{ fontWeight: 600 }}>Pay Period :</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as="select" onChange={handleInputChange} value={employeeData.payPeriod || ""}>
                                <option value="" disabled>Select Month</option>
                                {months.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="superRate">
                    <Row className="mb-3">
                        <Col xs="6" className="text-left">
                            <Form.Label style={{ fontWeight: 600 }}>Super Rate(0-50) :</Form.Label>
                        </Col>
                        <Col>
                            <FormControl type="text" placeholder="Enter Super Rate" onChange={handleInputChange} value={employeeData.superRate} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="buttons">
                    <Row className="mb-3">
                        <Col>
                            <Button variant="primary" onClick={() => handleGetPaySlip()} className="me-2">
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