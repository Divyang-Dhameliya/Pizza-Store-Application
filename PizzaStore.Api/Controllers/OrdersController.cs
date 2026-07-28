using Microsoft.AspNetCore.Mvc;
using PizzaStore.Api.Repositories;
using PizzaStore.Api.DTOs;

namespace PizzaStore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _repository;

        public OrdersController(IOrderRepository repository)
        {
            _repository = repository;
        }

        // POST: api/orders
        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] PlaceOrderDto dto)
        {
            if (dto.Items == null || dto.Items.Count == 0)
                return BadRequest("Cart is empty.");

            try
            {
                var result = await _repository.PlaceOrderAsync(dto);
                return Ok(new { OrderId = result.OrderId, TotalAmount = result.TotalAmount });
            }
            catch (Exception ex)
            {
                // catches the THROW from sp_PlaceOrder (e.g. out of stock)
                return BadRequest(ex.Message);
            }
        }

        // GET: api/orders
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _repository.GetAllOrdersAsync();
            return Ok(orders);
        }

        // GET: api/orders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetails(int id)
        {
            var (order, items) = await _repository.GetOrderDetailsAsync(id);
            if (order == null) return NotFound();

            return Ok(new { Order = order, Items = items });
        }

        // PATCH: api/orders/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            await _repository.UpdateOrderStatusAsync(id, status);
            return NoContent();
        }
    }
}