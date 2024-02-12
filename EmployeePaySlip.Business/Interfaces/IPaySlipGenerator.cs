using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePaySlip.Business.Models;

namespace EmployeePaySlip.Business.Interfaces
{
    public interface IPaySlipGenerator
    {
        PaySlip GeneratePaySlip(Employee employee);
    }
}
