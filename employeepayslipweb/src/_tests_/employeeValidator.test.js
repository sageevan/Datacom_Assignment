import EmployeeValidator from '../employee/EmployeeValidator';

describe('EmployeeValidator', () => {

    it('should return null for valid employee details', () => {
        const validEmployee = {
            firstName: 'John',
            lastName: 'Doe',
            payPeriod: 'May',
            superRate: '10',
            annualSalary: '50000',
        };

        const result = EmployeeValidator.validateEmployeeDetails(validEmployee);

        expect(result).toBeNull();
    });

    //test for first name validation
    it('should return error for invalid first name', () => {
        const invalidEmployee = {
            firstName: '123',
            lastName: 'Doe',
            payPeriod: 'May',
            superRate: '10',
            annualSalary: '50000',
        };

        const result = EmployeeValidator.validateEmployeeDetails(invalidEmployee);

        expect(result).toEqual('First name should contain only letters.');
    });


    it('should return error for empty first name', () => {
        const invalidEmployee = {
            firstName: '',
            lastName: 'Doe',
            payPeriod: 'May',
            superRate: '10',
            annualSalary: '50000',
        };

        const result = EmployeeValidator.validateEmployeeDetails(invalidEmployee);

        expect(result).toEqual('Required fields cannot be empty!.');
    });

    // can implement similar tests for last name
    //Test for empty month validation
    it('should return error for empty month name', () => {
        const invalidEmployee = {
            firstName: 'John',
            lastName: 'Doe',
            payPeriod: '',
            superRate: '10',
            annualSalary: '50000',
        };

        const result = EmployeeValidator.validateEmployeeDetails(invalidEmployee);

        expect(result).toEqual('Required fields cannot be empty!.');
    });


    // Test for invalid super rate
    it('should return error for invalid super rate', () => {
        const invalidEmployee = {
            firstName: 'John',
            lastName: 'Doe',
            payPeriod: 'May',
            superRate: 'invalidSuperRate',
            annualSalary: '50000',
        };

        const result = EmployeeValidator.validateEmployeeDetails(invalidEmployee);

        expect(result).toEqual('Super rate should be a number between 0 and 50.');
    });

    //can test for empty annual salary and empty super rate as well.

    // Test for invalid annual salary
    it('should return error for invalid annual salary', () => {
        const invalidEmployee = {
            firstName: 'John',
            lastName: 'Doe',
            payPeriod: 'May',
            superRate: '10',
            annualSalary: 'invalidAnnualSalary',
        };

        const result = EmployeeValidator.validateEmployeeDetails(invalidEmployee);

        expect(result).toEqual('Annual salary should be in number format(No decimal).');
    });
});