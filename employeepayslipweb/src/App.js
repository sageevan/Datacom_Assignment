import './App.css'
import axios from 'axios';
import {Alert,Container, Row, Col} from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { postItem } from './services/restCallService.js';
import EmployeeDetailsForm from './employee/employeeDetailsForm'; 
import EmployeePaySlip from './employee/employeePaySlip'; 
import EmployeeValidator from './employee/employeeValidator';
 
//window.alert = jest.fn();
//jest.spyOn(window, 'print');

const App = () => {
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        annualSalary: '',
        superRate: '',
        payPeriod: '',
    });
    const [paySlip, setPaySlip] = useState([])
    const [notification, setNotification] = useState('')
    const [months, setMonths] = useState([]);

    useEffect(() => {
        const fetchMonths = async () => {
            try {
                const response = await axios.get('months.json'); // Adjust the path as needed
                setMonths(response.data);
            } catch (error) {
                console.error('Error fetching months:', error.message);
            }
        };
        fetchMonths();
        setPaySlip('');
        setNotification('');
    }, [])


    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };


    //get payslip using Axios
    async function handleGetPaySlip(e) {
        const validationResult = EmployeeValidator.validateEmployeeDetails(employeeData);

        if (validationResult) {
            setNotification(validationResult);
        } else {
            console.log(employeeData)
            postItem(employeeData)
                .then(res => {
                    setPaySlip(res.data);
                })
                .catch((error) => {
                    setNotification('Error : Request to get pay slip has been failed!' + error.message)
                });

            setNotification('')
        }

    }

    // Implement logic for handling the "Clear" button click
    function handleClear() {
        
        setEmployeeData({
            firstName: '',
            lastName: '',
            annualSalary: '',
            payPeriod: '',
            superRate: '',
        });
        setNotification('');
        setPaySlip('');
    }


    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <Alert variant="success">
                            <br />
                            <br />
                            <Alert.Heading>Datacom Employee Pay Slip App</Alert.Heading>
                            Welcome to the Datacom frontend technical test.
                            <br />
                            <br />
                        </Alert>
                    </Col>
                </Row>
                <h4>Employee Details</h4>
                <br />
                {notification &&
                    <Alert variant="danger">{notification}</Alert>
                }
                <Row className="4">
                    <Col><EmployeeDetailsForm
                        employeeData={employeeData}
                        months={months}
                        handleInputChange={handleInputChange}
                        handleGetPaySlip={handleGetPaySlip}
                        handleClear={handleClear}
                        notification={notification}
                    />
                    </Col>
                </Row>
                <Row className="4">
                    <Col><EmployeePaySlip paySlip={paySlip} />
                    </Col>
                </Row>
                <footer className="page-footer font-small teal pt-4">
                    <div className="footer-copyright text-center py-3">
                        © 2021 Copyright:
                    </div>
                </footer>
            </Container>

        </div>
    )
}

export default App

