using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePaySlip.Business.Interfaces;

namespace EmployeePaySlip.Business
{
    public class PayPeriodGenerator : IPayPeriodGenerator
    {
        public string GeneratePayPeriod(string month)
        {
            // Validate the month format
            DateTime validMonth;
            if (!DateTime.TryParseExact(month, "MMMM", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out validMonth))
            {
                throw new ArgumentException("Invalid month format. Please provide the full month name (e.g., January).");
            }

            // Get the current year
            int currentYear = DateTime.Now.Year;

            // Calculate the first day of the month
            DateTime firstDayOfMonth = new DateTime(currentYear, validMonth.Month, 1);

            // Calculate the last day of the month
            DateTime lastDayOfMonth = new DateTime(currentYear, validMonth.Month, DateTime.DaysInMonth(currentYear, validMonth.Month));

            // Format the pay period string
            string payPeriod = $"{firstDayOfMonth:d MMMM} - {lastDayOfMonth:d MMMM}";

            return payPeriod;
        }
    }
}
