class EmployeeValidator {
    static validateEmployeeDetails(employee) {
        const nameRegex = /^[A-Za-z]+$/;
        const integerRegex = /^\d+$/;

        // Validate emmpty fields
        if (employee.firstName === null || employee.firstName === "" ||
            employee.lastName === null || employee.lastName === "" ||
            employee.annualSalary === null || employee.annualSalary === "" ||
            employee.payPeriod === null || employee.payPeriod === "" ||
            employee.superRate === null || employee.superRate === "") {
            return "Required fields cannot be empty!.";
            }

        // Validate first name
        if (!nameRegex.test(employee.firstName)) {
            return "First name should contain only letters.";
        }

        // Validate last name
        if (!nameRegex.test(employee.lastName)) {
            return "Last name should contain only letters.";
        }

        // Validate super rate
        const superRateNumber = parseFloat(employee.superRate);
        if (isNaN(superRateNumber) || superRateNumber < 0 || superRateNumber > 50) {
            return "Super rate should be a number between 0 and 50.";
        }

        // Validate annual salary
        if (!integerRegex.test(employee.annualSalary)) {
            return "Annual salary should be in number format(No decimal).";
        }

        // All validations passed
        return null;
    }
}

export default EmployeeValidator;