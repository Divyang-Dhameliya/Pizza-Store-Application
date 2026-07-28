using Microsoft.AspNetCore.Mvc;
using PizzaStore.Api.Repositories;
using PizzaStore.Api.DTOs;

namespace PizzaStore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzasController : ControllerBase
    {
        private readonly IPizzaRepository _repository;

        public PizzasController(IPizzaRepository repository)
        {
            _repository = repository;
        }

        // GET: api/pizzas  (user menu view - active + in stock only)
        [HttpGet]
        public async Task<IActionResult> GetActivePizzas()
        {
            var pizzas = await _repository.GetActivePizzasAsync();
            return Ok(pizzas);
        }

        // GET: api/pizzas/all  (admin view - all pizzas)
        [HttpGet("all")]
        public async Task<IActionResult> GetAllPizzas()
        {
            var pizzas = await _repository.GetAllPizzasAsync();
            return Ok(pizzas);
        }

        // GET: api/pizzas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPizzaById(int id)
        {
            var pizza = await _repository.GetPizzaByIdAsync(id);
            if (pizza == null) return NotFound();
            return Ok(pizza);
        }

        // POST: api/pizzas
        [HttpPost]
        public async Task<IActionResult> AddPizza([FromBody] PizzaDto dto)
        {
            var newId = await _repository.AddPizzaAsync(dto);
            return CreatedAtAction(nameof(GetPizzaById), new { id = newId }, dto);
        }

        // PUT: api/pizzas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePizza(int id, [FromBody] PizzaDto dto)
        {
            await _repository.UpdatePizzaAsync(id, dto);
            return NoContent();
        }

        // PATCH: api/pizzas/5/hide
        [HttpPatch("{id}/hide")]
        public async Task<IActionResult> HidePizza(int id)
        {
            await _repository.HidePizzaAsync(id);
            return NoContent();
        }

        // PATCH: api/pizzas/5/unhide
        [HttpPatch("{id}/unhide")]
        public async Task<IActionResult> UnhidePizza(int id)
        {
            await _repository.UnhidePizzaAsync(id);
            return NoContent();
        }

        // DELETE: api/pizzas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza(int id)
        {
            await _repository.DeletePizzaAsync(id);
            return NoContent();
        }
    }
}