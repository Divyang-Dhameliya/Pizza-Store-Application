using System.Data;
using System.Text.Json;
using Dapper;
using PizzaStore.Api.Data;
using PizzaStore.Api.Models;
using PizzaStore.Api.DTOs;

namespace PizzaStore.Api.Repositories
{
    public class OrderRepository : IOrderRepository, IDisposable
    {
        private readonly IDbConnection _connection;

        public OrderRepository(DapperContext context)
        {
            _connection = context.CreateConnection();
        }

        public async Task<(int OrderId, decimal TotalAmount)> PlaceOrderAsync(PlaceOrderDto dto)
        {
            var itemsJson = JsonSerializer.Serialize(dto.Items);

            var parameters = new DynamicParameters();
            parameters.Add("ItemsJson", itemsJson);

            var result = await _connection.QuerySingleAsync<(int NewOrderId, decimal TotalAmount)>(
                "sp_PlaceOrder", parameters, commandType: CommandType.StoredProcedure);

            return (result.NewOrderId, result.TotalAmount);
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _connection.QueryAsync<Order>(
                "sp_GetAllOrders", commandType: CommandType.StoredProcedure);
        }

        public async Task<(Order? Order, IEnumerable<OrderItem> Items)> GetOrderDetailsAsync(int orderId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("OrderId", orderId);

            using var multi = await _connection.QueryMultipleAsync(
                "sp_GetOrderDetails", parameters, commandType: CommandType.StoredProcedure);

            var order = await multi.ReadFirstOrDefaultAsync<Order>();
            var items = await multi.ReadAsync<OrderItem>();

            return (order, items);
        }

        public async Task UpdateOrderStatusAsync(int orderId, string status)
        {
            var parameters = new DynamicParameters();
            parameters.Add("OrderId", orderId);
            parameters.Add("Status", status);

            await _connection.ExecuteAsync(
                "sp_UpdateOrderStatus", parameters, commandType: CommandType.StoredProcedure);
        }

        public void Dispose()
        {
            _connection?.Dispose();
        }
    }
}