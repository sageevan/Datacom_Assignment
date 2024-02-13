import { render, screen, within, cleanup, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import EmployeeDetailsForm from '../employee/employeeDetailsForm';

jest.mock('axios', () => ({
    post: jest.fn(),
    get: jest.fn()
}))

test('renders the textbox text,', () => {
    render(<App />)
    const labelDescription = screen.getByRole('textbox', { name: /First Name/i })
    expect(labelDescription).toBeInTheDocument()
})

test('renders the button texts', () => {
    render(<App />)
const clearButton = screen.getByRole('button', { name: /Clear/i })
    expect(clearButton).toBeInTheDocument()
})

//Add_item, clear, refresh nad mark as completed button functions tests 
describe('buttons functions', () => {
    it("should post axios called when payslip button clicked", () => {
        render(<App />);
        const paySlipButton = screen.getByRole('button', { name: /PaySlip/i })
        const inputFirstName = screen.getByPlaceholderText(/Enter First Name/i)
        const inputLastName = screen.getByPlaceholderText(/Enter Last Name/i)
        const inputAnnualSalary = screen.getByPlaceholderText(/Enter Annual Salary/i)
        const inputPayPeriod = screen.getByText(/Select Month/i)
        const inputSuperRate = screen.getByPlaceholderText(/Enter Super Rate/i)
        fireEvent.change(inputFirstName, { target: { value: 'John' } });
        fireEvent.change(inputLastName, { target: { value: 'Carter' } });
        fireEvent.change(inputAnnualSalary, { target: { value: '10000' } });
        fireEvent.change(inputPayPeriod, { target: { value: 'May' } });
        fireEvent.change(inputSuperRate, { target: { value: '8' } });
        fireEvent.click(paySlipButton);
        expect(axios.post).toHaveBeenCalled();
    });

    //it("should put axios called when mark as completed button clicked", () => {
    //    render(<App />);
    //    fireEvent.click(within(screen.getByRole('column', { name: /Action/i })));
    //    expect(axios.put).toHaveBeenCalled();
    //});

    it("should show notification when firstname input is has numbers when payslip button clicked", async () => {
        render(<App />);
        const firstNameInput = screen.getByLabelText(/First Name/i);
        fireEvent.change(firstNameInput, { target: { value: '123' } });
        fireEvent.blur(firstNameInput);
        const notification = screen.getByRole('alert', { text: /First name should contain only letters./i, });
        expect(notification).toBeTruthy();
    });
    it("should empty description when clear button clicked", async () => {
        render(<App />);
        const clearButton = screen.getByRole('button', { name: /Clear/i })
        fireEvent.click(clearButton);
        const inputFirstName = screen.getByPlaceholderText(/Enter First Name/i)
        await waitFor(() => {
            expect(inputFirstName).toHaveValue("");
        });
    });
});