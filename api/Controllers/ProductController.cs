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

        [Authorize(Roles = "ADMIN")]
        [HttpPost("add")]
        [ProducesResponseType(typeof(ProductResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
        {
            try
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
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(ProductResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(int id)
        {
            try
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
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("{slug:regex(^[[a-zA-Z0-9_-]]+$)}")]
        [ProducesResponseType(typeof(ProductResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetBySlug(string slug, [FromQuery] bool includeReviewCount = false)
        {
            try
            {

                var product = await _db.Products
                    .AsNoTracking()
                    .SingleOrDefaultAsync(p => p.name == slug);

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

                if (includeReviewCount)
                {
                    dto.ReviewsCount = await _db.Reviews.CountAsync(r => r.product_id == product.id);
                }

                return Ok(dto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("/api/products")]
        [ProducesResponseType(typeof(ProductsResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll([FromQuery] int? limit = null)
        {
            try
            {
                var query = _db.Products.AsNoTracking();

                if (limit.HasValue)
                {
                    query = query.Take(limit.Value);
                }

                var products = await query.ToListAsync();

                var result = products.Select(product => new ProductsResponseDto
                {
                    Id = product.id,
                    Name = product.name,
                    Title = product.title,
                    Author = product.author,
                    Price = product.price,
                    CoverImageUrl = product.cover_image_url,
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Message = ex.Message
                });
            }
        }
    }
}