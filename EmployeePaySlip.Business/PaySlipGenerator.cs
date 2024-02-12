using EmployeePaySlip.Business.Models;
using EmployeePaySlip.Business.Interfaces;
using EmployeePaySlip.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePaySlip.Business
{
    public class PaySlipGenerator : IPaySlipGenerator
    {
        private readonly ITaxCalculator _taxCalculator;
        private readonly IPayPeriodGenerator _payPeriodGenerator;

        public PaySlipGenerator(ITaxCalculator taxCalculator,IPayPeriodGenerator payPeriodGenerator )
        {
            _taxCalculator = taxCalculator;
            _payPeriodGenerator = payPeriodGenerator;

        }
        public PaySlip GeneratePaySlip(Employee employee)
        {
            // Calculate gross income, income tax, net income, and super
            double grossIncome = employee.AnnualSalary / 12.0;
            double incomeTax = _taxCalculator.CalculateIncomeTax(employee.AnnualSalary);
            double netIncome = grossIncome - incomeTax;
            double super = grossIncome * (employee.SuperRate / 100.0);

            // Create and return pay slip model
            var paySlip = new PaySlip
            {
                Name = $"{employee.FirstName} {employee.LastName}",
                PayPeriod = _payPeriodGenerator.GeneratePayPeriod(employee.PayPeriod),
                GrossIncome = Math.Round(grossIncome, 2),
                IncomeTax = Math.Round(incomeTax, 2),
                NetIncome = Math.Round(netIncome, 2),
                Super = Math.Round(super, 2)
            };

            return paySlip;
        }

    }
}