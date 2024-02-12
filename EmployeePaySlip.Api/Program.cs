using EmployeePaySlip.Api;
using EmployeePaySlip.Business.Interfaces;
using EmployeePaySlip.Business;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Hosting;

namespace EmployeePayslip.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
