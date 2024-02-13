using EmployeePaySlip.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePaySlip.DataAccess.Interfaces
{
    public interface ITaxRateDataStore
    {
        List<TaxRange> GetTaxRanges();
    }
}
