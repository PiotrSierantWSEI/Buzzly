using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/product")]
    [Produces("application/json")]
    public class ProductController(ApplicationDbContext db) : ControllerBase
    {
        private readonly ApplicationDbContext _db = db;

        [Authorize]
        [HttpPost("add")]
        [ProducesResponseType(typeof(ProductResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ErrorDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Message = "Nieprawidłowe dane wejściowe.",
                });
            }

            var idClaim = User.FindFirst("id")?.Value;
            if (idClaim == null)
                return Unauthorized(new ErrorDetails
                {
                    Status = StatusCodes.Status401Unauthorized,
                    Message = "Brak prawidłowego tokena."
                });

            if (!int.TryParse(idClaim, out var userId))
                return Unauthorized(new ErrorDetails
                {
                    Status = StatusCodes.Status401Unauthorized,
                    Message = "Nieprawidłowe ID użytkownika w tokenie."
                });

            var product = new Product
            {
                name = dto.Name,
                title = dto.Title,
                author = dto.Author,
                description = dto.Description,
                price = dto.Price,
                cover_image_url = dto.CoverImageUrl,
                created_at = DateTime.UtcNow
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            var result = new ProductResponseDto
            {
                Id = product.id,
                Name = product.name,
                Title = product.title,
                Author = product.author,
                Description = product.description,
                Price = product.price,
                CoverImageUrl = product.cover_image_url,
                CreatedAt = product.created_at ?? DateTime.MinValue
            };

            return CreatedAtAction(
                nameof(GetById),
                new { id = product.id },
                result
            );
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ProductResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _db.Products
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.id == id);

            if (product == null)
                return NotFound(new ErrorDetails
                {
                    Status = StatusCodes.Status404NotFound,
                    Message = "Produkt nie istnieje."
                });

            var dto = new ProductResponseDto
            {
                Id = product.id,
                Name = product.name,
                Title = product.title,
                Author = product.author,
                Description = product.description,
                Price = product.price,
                CoverImageUrl = product.cover_image_url,
                CreatedAt = product.created_at ?? DateTime.MinValue
            };

            return Ok(dto);
        }
    }
}