using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using EmployeePaySlip.Business;
using EmployeePaySlip.Business.Interfaces;
using EmployeePaySlip.DataAccess;
using EmployeePaySlip.DataAccess.Entities;
using Newtonsoft.Json;
namespace EmployeePaySlip.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                      builder =>
                      {
                          builder.AllowAnyOrigin()
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EmployeePayslip.Api", Version = "v1" });
            });

            
            services.AddSingleton<List<TaxRange>>(provider =>
            {
                // Retrieve the tax ranges from your data source or configuration
                return FetchTaxRangesFromConfiguration();
            });

            services.AddTransient<ITaxCalculator, TaxCalculator>();
            services.AddTransient<IPaySlipGenerator, PaySlipGenerator>();
            services.AddTransient<IPayPeriodGenerator, PayPeriodGenerator>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EmployeePayslip.Api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowAllHeaders");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


        // Adjust the FetchTaxRangesFromConfiguration method
        private List<TaxRange> FetchTaxRangesFromConfiguration()
        {
            var taxConfigJsonPath = "TaxConfig.json";
            var taxConfigJsonContent = File.ReadAllText(taxConfigJsonPath);

            // Deserialize JSON to TaxRangesWrapper
            var wrapper = JsonConvert.DeserializeObject<TaxRangesWrapper>(taxConfigJsonContent);

            // Extract the TaxRanges property
            return wrapper?.TaxRanges ?? new List<TaxRange>();
        }
    }
}
