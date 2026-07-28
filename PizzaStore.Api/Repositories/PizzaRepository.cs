using System.Data;
using Dapper;
using PizzaStore.Api.Data;
using PizzaStore.Api.Models;
using PizzaStore.Api.DTOs;

namespace PizzaStore.Api.Repositories
{
    public class PizzaRepository : IPizzaRepository, IDisposable
    {
        private readonly IDbConnection _connection;

        public PizzaRepository(DapperContext context)
        {
            _connection = context.CreateConnection();
        }

        public async Task<IEnumerable<Pizza>> GetActivePizzasAsync()
        {
            return await _connection.QueryAsync<Pizza>(
                "sp_GetActivePizzas", commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Pizza>> GetAllPizzasAsync()
        {
            return await _connection.QueryAsync<Pizza>(
                "sp_GetAllPizzas", commandType: CommandType.StoredProcedure);
        }

        public async Task<Pizza?> GetPizzaByIdAsync(int pizzaId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("PizzaId", pizzaId);

            return await _connection.QueryFirstOrDefaultAsync<Pizza>(
                "sp_GetPizzaById", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> AddPizzaAsync(PizzaDto dto)
        {
            var parameters = new DynamicParameters();
            parameters.Add("Name", dto.Name);
            parameters.Add("Description", dto.Description);
            parameters.Add("Price", dto.Price);
            parameters.Add("StockQuantity", dto.StockQuantity);

            return await _connection.QuerySingleAsync<int>(
                "sp_AddPizza", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdatePizzaAsync(int pizzaId, PizzaDto dto)
        {
            var parameters = new DynamicParameters();
            parameters.Add("PizzaId", pizzaId);
            parameters.Add("Name", dto.Name);
            parameters.Add("Description", dto.Description);
            parameters.Add("Price", dto.Price);
            parameters.Add("StockQuantity", dto.StockQuantity);

            await _connection.ExecuteAsync(
                "sp_UpdatePizza", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task HidePizzaAsync(int pizzaId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("PizzaId", pizzaId);

            await _connection.ExecuteAsync(
                "sp_HidePizza", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task UnhidePizzaAsync(int pizzaId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("PizzaId", pizzaId);

            await _connection.ExecuteAsync(
                "sp_UnhidePizza", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task DeletePizzaAsync(int pizzaId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("PizzaId", pizzaId);

            await _connection.ExecuteAsync(
                "sp_DeletePizza", parameters, commandType: CommandType.StoredProcedure);
        }

        public void Dispose()
        {
            _connection?.Dispose();
        }
    }
}