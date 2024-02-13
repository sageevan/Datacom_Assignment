using EmployeePaySlip.DataAccess.Interfaces;
using EmployeePaySlip.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace EmployeePaySlip.DataAccess
{
    public class TaxRateDatastoreFromFile : ITaxRateDataStore
    {
        private List<TaxRange> _lstTaxRange;
        public TaxRateDatastoreFromFile() {
            var taxConfigJsonPath = "TaxConfig.json";
            var taxConfigJsonContent = File.ReadAllText(taxConfigJsonPath);

            // Deserialize JSON to TaxRangesWrapper
            var taxRanges = JsonConvert.DeserializeObject<TaxRangesWrapper>(taxConfigJsonContent);

            // Extract the TaxRanges property
            _lstTaxRange = taxRanges?.TaxRanges ?? new List<TaxRange>();
        }

        public List<TaxRange> GetTaxRanges()
        {
            return _lstTaxRange;
        }

    }
}
