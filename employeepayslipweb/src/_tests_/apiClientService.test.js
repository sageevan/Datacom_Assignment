import { postItem } from '../services/apiClientService.js';
import axios from 'axios';

jest.mock('axios', () => ({
    post: jest.fn(),
    get: jest.fn()
}))

const url = `https://localhost:7212/api/EmployeePayslip`
//Post Item axios call with api Tests
describe('postItem', () => {
    const employee=
    {
        FirstName : "John",
            LastName : "Doe",
            AnnualSalary : 60000,
            SuperRate : 10,
            PayPeriod : "March"
    }

    // Mock behavior for IPaySlipGenerator
    const expectedPaySlip =
    {
        Name : "John Doe",
            PayPeriod : "Mar 1 – Mar 31",
            GrossIncome : 5000.00,
            IncomeTax : 1000.00,
            NetIncome : 4000.00,
            Super : 500.00
    };

    it('erroneously post data to API', async () => {

        const errorMessage = 'Network Error';

        axios.post.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );

        await expect(postItem(employee)).rejects.toThrow(errorMessage);
    });


    it('post successfully data to API and return the expected object', async () => {

        axios.post.mockImplementationOnce(() => Promise.resolve(expectedPaySlip));

        await expect(postItem(employee)).resolves.toEqual(expectedPaySlip);

    });

    it('post successfully data to API with correct Url', async () => {

        axios.post.mockImplementationOnce(() => Promise.resolve(expectedPaySlip));

        await expect(postItem(employee)).resolves.toEqual(expectedPaySlip);

        expect(axios.post).toHaveBeenCalledWith(
            url,
            employee,
        );
    });

})