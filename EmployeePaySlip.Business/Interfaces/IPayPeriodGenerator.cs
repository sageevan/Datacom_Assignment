using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePaySlip.Business.Interfaces
{
    public interface IPayPeriodGenerator
    {
        string GeneratePayPeriod(string month);
    }
}
