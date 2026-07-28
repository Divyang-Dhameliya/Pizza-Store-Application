using PizzaStore.Api.Models;
using PizzaStore.Api.DTOs;

namespace PizzaStore.Api.Repositories
{
    public interface IPizzaRepository
    {
        Task<IEnumerable<Pizza>> GetActivePizzasAsync();
        Task<IEnumerable<Pizza>> GetAllPizzasAsync();
        Task<Pizza?> GetPizzaByIdAsync(int pizzaId);
        Task<int> AddPizzaAsync(PizzaDto dto);
        Task UpdatePizzaAsync(int pizzaId, PizzaDto dto);
        Task HidePizzaAsync(int pizzaId);
        Task UnhidePizzaAsync(int pizzaId);
        Task DeletePizzaAsync(int pizzaId);
    }
}