using EmployeePaySlip.Business;
using EmployeePaySlip.DataAccess.Entities;
using EmployeePaySlip.DataAccess.Interfaces;
using Moq;
using Xunit;

namespace EmployeePaysSlip.Business.UnitTests
{
    public class TaxCalculatorShould
    {
        [Fact]
        public void CalculateIncomeTax_ShouldReturnCorrectTax_ForGivenSalary()
        {
            // Arrange
            var taxRanges = new List<TaxRange>
            {
                new TaxRange { RangeStart = 0, RangeEnd = 14000, Rate = 0.105 },
                new TaxRange { RangeStart = 14001, RangeEnd = 48000, Rate = 0.175 },
            };
            var mockTaxRangeDatastore = new Mock<ITaxRateDataStore>();
            mockTaxRangeDatastore.Setup(m => m.GetTaxRanges()).Returns(taxRanges);
            var taxCalculator = new TaxCalculator(mockTaxRangeDatastore.Object);

            // Act
            var incomeTax = taxCalculator.CalculateIncomeTax(60000);

            // Assert
            Assert.Equal(expected: 618.34, actual: incomeTax, precision: 2);
        }
    }
}
