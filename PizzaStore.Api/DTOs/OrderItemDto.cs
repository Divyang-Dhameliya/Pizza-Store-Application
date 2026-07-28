namespace PizzaStore.Api.DTOs
{
    public class OrderItemDto
    {
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}