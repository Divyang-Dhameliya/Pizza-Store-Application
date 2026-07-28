namespace PizzaStore.Api.DTOs
{
    public class PlaceOrderDto
    {
        public List<OrderItemDto> Items { get; set; } = new();
    }
}