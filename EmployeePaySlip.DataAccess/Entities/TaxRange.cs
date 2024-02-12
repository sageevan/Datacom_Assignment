using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePaySlip.DataAccess.Entities
{
    public class TaxRange
    {
        public int RangeStart { get; set; }
        public int RangeEnd { get; set; }
        public double Rate { get; set; }
    }
}
