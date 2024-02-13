class EmployeeValidator {
    static validateEmployeeDetails(employee) {
        const nameRegex = /^[A-Za-z]+$/;
        const integerRegex = /^\d+$/;

        // Validate first name
        if (!nameRegex.test(employee.firstName)) {
            return "First name should contain only letters.";
        }

        // Validate last name
        if (!nameRegex.test(employee.lastName)) {
            return "Last name should contain only letters.";
        }

        // Validate month
        if (employee.payPeriod === null || employee.payPeriod === "") {
            return "Month is required.";
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