using EmployeePaySlip.Business.Interfaces;
using EmployeePaySlip.DataAccess.Entities;
using EmployeePaySlip.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePaySlip.Business
{
    public class TaxCalculator : ITaxCalculator
    {
        private readonly List<TaxRange> taxRanges;
        public TaxCalculator(ITaxRateDataStore taxRateDatastore)
        {
            this.taxRanges = taxRateDatastore.GetTaxRanges();
        }
        //Returns the value for a month
        public double CalculateIncomeTax(int annualSalary)
        {
            double calculatedTax = 0;

            foreach (var range in taxRanges)
            {
                if (annualSalary <= range.RangeEnd || range.RangeEnd == -1)
                {
                    if (range.RangeEnd == -1)
                    {
                        calculatedTax += (annualSalary - range.RangeStart + 1) * range.Rate;
                        break;
                    }
                    calculatedTax += (Math.Min(annualSalary, range.RangeEnd) - range.RangeStart + 1) * range.Rate;
                    break;
                }
                else
                {
                    calculatedTax += (range.RangeEnd - range.RangeStart + 1) * range.Rate;
                }
            }

            return calculatedTax / 12.0;
        }
    }
}
