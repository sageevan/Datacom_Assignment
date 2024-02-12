using EmployeePaySlip.Api.Controllers;
using EmployeePaySlip.Business.Interfaces;
using EmployeePaySlip.Business.Models;
using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using EmployeePaySlip.Business;

namespace EmployeePaySlip.Api.UnitTests
{
    public class PaySlipControllerShould
    {
        private readonly Mock<IPaySlipGenerator> _mockIPaySlipGenerator;
        public PaySlipControllerShould() {
            _mockIPaySlipGenerator = new Mock<IPaySlipGenerator>();
        }
        [Fact]
        public void GeneratePaySlip_ValidEmployee_ReturnsOkResult()
        {
            // Arrange
            var controller = new EmployeePaySlipController(_mockIPaySlipGenerator.Object);

            var employee = new Employee
            {
                FirstName = "John",
                LastName = "Doe",
                AnnualSalary = 60000,
                SuperRate = 10,
                PayPeriod = "March"
            };

            // Mock behavior for IPaySlipGenerator
            var expectedPaySlip = new PaySlip
            {
                Name = "John Doe",
                PayPeriod = "Mar 1 – Mar 31",
                GrossIncome = 5000.00,
                IncomeTax = 1000.00,
                NetIncome = 4000.00,
                Super = 500.00
            };

            _mockIPaySlipGenerator.Setup(x => x.GeneratePaySlip(employee)).Returns(expectedPaySlip);

            // Act
            var result = controller.GeneratePaySlip(employee);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualPaySlip = Assert.IsType<PaySlip>(okResult.Value);

            Assert.Equal(expectedPaySlip.Name, actualPaySlip.Name);
            Assert.Equal(expectedPaySlip.PayPeriod, actualPaySlip.PayPeriod);
            Assert.Equal(expectedPaySlip.GrossIncome, actualPaySlip.GrossIncome);
            Assert.Equal(expectedPaySlip.IncomeTax, actualPaySlip.IncomeTax);
            Assert.Equal(expectedPaySlip.NetIncome, actualPaySlip.NetIncome);
            Assert.Equal(expectedPaySlip.Super, actualPaySlip.Super);
        }

        [Fact]
        public void GeneratePaySlip_ExceptionThrown_ReturnsBadRequestResult()
        {
            // Arrange
            _mockIPaySlipGenerator.Setup(x => x.GeneratePaySlip(It.IsAny<Employee>()))
                                .Throws(new Exception("Test Exception"));

            var controller = new EmployeePaySlipController(_mockIPaySlipGenerator.Object);

            var employee = new Employee
            {
                FirstName = "John",
                LastName = "Sammy",
                AnnualSalary = 90000,
                SuperRate = 6,
                PayPeriod = "March"
            };

            // Act
            var result = controller.GeneratePaySlip(employee);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Error generating pay slip: Test Exception", (result as BadRequestObjectResult)?.Value);
        }
    }
}
