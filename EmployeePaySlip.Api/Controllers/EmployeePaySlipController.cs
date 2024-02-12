using EmployeePaySlip.Business.Models;
using EmployeePaySlip.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using EmployeePaySlip.DataAccess;
using EmployeePaySlip.Business;

namespace EmployeePaySlip.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeePaySlipController : Controller
    {
        private readonly IPaySlipGenerator _paySlipGenerator;

        public EmployeePaySlipController(IPaySlipGenerator paySlipGenerator)
        {
            _paySlipGenerator = paySlipGenerator;
        }
        // POST: api/EmployeePayslip 
        [HttpPost]
        public IActionResult GeneratePaySlip([FromBody] Employee employee)
        {
            try
            {
                var payslip = _paySlipGenerator.GeneratePaySlip(employee);
                return Ok(payslip);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error generating pay slip: {ex.Message}");
            }
        }

    }
}
