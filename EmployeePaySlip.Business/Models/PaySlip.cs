using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePaySlip.Business.Models
{
    public class PaySlip
    {
        public string Name { get; set; }
        public string PayPeriod { get; set; }
        public double GrossIncome { get; set; }
        public double IncomeTax { get; set; }
        public double NetIncome { get; set; }
        public double Super { get; set; }
    }
}
