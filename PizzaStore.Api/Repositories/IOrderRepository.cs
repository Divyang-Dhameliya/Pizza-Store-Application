using PizzaStore.Api.Models;
using PizzaStore.Api.DTOs;

namespace PizzaStore.Api.Repositories
{
    public interface IOrderRepository
    {
        Task<(int OrderId, decimal TotalAmount)> PlaceOrderAsync(PlaceOrderDto dto);
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<(Order? Order, IEnumerable<OrderItem> Items)> GetOrderDetailsAsync(int orderId);
        Task UpdateOrderStatusAsync(int orderId, string status);
    }
}
