using System.Data;
using Microsoft.Data.SqlClient;

namespace PizzaStore.Api.Data
{
    public class DapperContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("SqlConnection")
                ?? throw new InvalidOperationException("Connection string 'SqlConnection' not found.");
        }

        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);
    }
}