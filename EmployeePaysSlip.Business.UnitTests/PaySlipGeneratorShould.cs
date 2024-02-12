using EmployeePaySlip.Business;
using Xunit;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePaySlip.Business.Interfaces;
using EmployeePaySlip.Business.Models;

namespace EmployeePaysSlip.Business.UnitTests
{
    public class PaySlipGeneratorShould
    {
        private readonly Mock<ITaxCalculator> _mockTaxCalculator;
        private readonly Mock<IPayPeriodGenerator> _mockIPayPeriodGenerator;
        private readonly PaySlipGenerator paySlipGenerator;
        public PaySlipGeneratorShould()
        {
            _mockTaxCalculator = new Mock<ITaxCalculator>();
            _mockIPayPeriodGenerator = new Mock<IPayPeriodGenerator>();
            paySlipGenerator = new PaySlipGenerator(_mockTaxCalculator.Object, _mockIPayPeriodGenerator.Object);
        }
        [Fact]
        public void GeneratePaySlip_ShouldGenerateCorrectPaySlip_ForGivenEmployeeDetails()
        {

            var employeeDetails = new Employee
            {
                FirstName = "John",
                LastName = "Sammy",
                AnnualSalary = 120000,
                SuperRate = 9,
                PayPeriod = "March"
            };
            // Mock behavior for ITaxCalculator
            _mockTaxCalculator.Setup(tc => tc.CalculateIncomeTax(employeeDetails.AnnualSalary)).Returns(1000); // Provide the expected income tax value

            // Mock behavior for IPayPeriodGenerator
            _mockIPayPeriodGenerator.Setup(ppg => ppg.GeneratePayPeriod(employeeDetails.PayPeriod)).Returns("1 March – 31 March"); // Provide the expected pay period value

            // Act
            var paySlip = paySlipGenerator.GeneratePaySlip(employeeDetails);

            // Assert
            Assert.NotNull(paySlip);
            Assert.Equal(expected: "John Sammy", actual: paySlip.Name);
            Assert.Equal(expected: "1 March – 31 March", actual: paySlip.PayPeriod);
            Assert.Equal(expected: 10000.00, actual: paySlip.GrossIncome);
            Assert.Equal(expected: 1000.00, actual: paySlip.IncomeTax); 
            Assert.Equal(expected: 9000.00, actual: paySlip.NetIncome);
            Assert.Equal(expected: 900.00, actual: paySlip.Super);
        }
    }
}
