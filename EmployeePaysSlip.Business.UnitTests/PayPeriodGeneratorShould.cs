using EmployeePaySlip.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EmployeePaysSlip.Business.UnitTests
{
    public class PayPeriodGeneratorShould
    {
        [Fact]
        public void GeneratePayPeriod_ShouldReturnCorrectPayPeriod()
        {
            string inputMonth = "March";
            string expectedPayPeriod = "1 March - 31 March";
            // Arrange
            var payPeriodGenerator = new PayPeriodGenerator();

            // Act
            var actualPayPeriod = payPeriodGenerator.GeneratePayPeriod(inputMonth);

            // Assert
            Assert.Equal(expectedPayPeriod, actualPayPeriod);
        }
        [Fact]
        public void GeneratePayPeriod_InvalidMonthFormat_ThrowsArgumentException()
        {
            // Arrange
            var payPeriodGenerator = new PayPeriodGenerator();
            var invalidMonth = "InvalidInput";

            // Act & Assert
            Assert.Throws<ArgumentException>(() => payPeriodGenerator.GeneratePayPeriod(invalidMonth));
        }
    }
}
