import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';


//can rereat this tests for all the texts
test('renders the textbox text,', () => {
    render(<App />)
    const labelFirstName = screen.getByRole('textbox', { name: /First Name/i })
    expect(labelFirstName).toBeInTheDocument()
})

//can rereat this tests for all the buttons
test('renders the button texts', () => {
    render(<App />)
const clearButton = screen.getByRole('button', { name: /Clear/i })
    expect(clearButton).toBeInTheDocument()
})

//tests for handling input change when user make changes
describe('input handling function', () => {

    it('updates employeeData state on first name change', () => {
        render(<App />);
        const inputFirstName = screen.getByPlaceholderText(/Enter First Name/i);
        fireEvent.change(inputFirstName, { target: { value: 'John' } });
        expect(inputFirstName.value).toBe('John');
    });

    it('updates employeeData state on last name change', () => {
        render(<App />);
        const inputLastName = screen.getByPlaceholderText(/Enter Last Name/i);
        fireEvent.change(inputLastName, { target: { value: 'David' } });
        expect(inputLastName.value).toBe('David');
    });

    it('updates employeeData state on annual salary change', () => {
        render(<App />);
        const inputAnnualSalary = screen.getByPlaceholderText(/Enter Annual Salary/i);
        fireEvent.change(inputAnnualSalary, { target: { value: '10000' } });
        expect(inputAnnualSalary.value).toBe('10000');
    });

    it('updates employeeData state on input change', () => {
        render(<App />);
        const inputSuperRate = screen.getByPlaceholderText(/Enter Super Rate/i);
        fireEvent.change(inputSuperRate, { target: { value: '9' } });
        expect(inputSuperRate.value).toBe('9');
    });


});


//Tests for clear button and payslip buttons
describe('buttons functions', () => {

    it("should show notification when firstname input has numbers and payslip button clicked", async () => {
        render(<App />);
        const firstNameInput = screen.getByLabelText(/First Name/i);
        fireEvent.change(firstNameInput, { target: { value: '123' } });
        fireEvent.blur(firstNameInput);
        const notification = screen.getByRole('alert', { text: /First name should contain only letters./i, });
        expect(notification).toBeTruthy();
    });

    it("should empty first name input field when clear button clicked", async () => {
        render(<App />);
        const clearButton = screen.getByRole('button', { name: /Clear/i })
        fireEvent.click(clearButton);
        const inputFirstName = screen.getByPlaceholderText(/Enter First Name/i)
        await waitFor(() => {
            expect(inputFirstName).toHaveValue("");
        });
    });
});