using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePaySlip.Business;

namespace EmployeePaySlip.Business.Interfaces
{
    public interface ITaxCalculator
    {
        double CalculateIncomeTax(int annualSalary);
    }
}
