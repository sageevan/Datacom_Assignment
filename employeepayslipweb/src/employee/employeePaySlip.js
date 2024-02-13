import React from 'react';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeePaySlip = ({ paySlip }) => {
    return (
        <Container className="d-flex justify-content-center">
            {paySlip &&
                <div className="mt-5 ml-4">
                    <h4 style={{ fontWeight: 'bold' }}>Employee Pay Slip</h4>
                    <div className="d-flex">
                        <div className="mr-4">
                            <Table striped bordered hover className="mt-4">
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Full Name</td>
                                        <td>{paySlip.name}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Pay Period</td>
                                        <td>{paySlip.payPeriod}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Gross Income</td>
                                        <td>{paySlip.grossIncome}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Income Tax</td>
                                        <td>{paySlip.incomeTax}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Net Income</td>
                                        <td>{paySlip.netIncome}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Super Rate</td>
                                        <td>{paySlip.super}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            }
        </Container>

    );
};

export default EmployeePaySlip;