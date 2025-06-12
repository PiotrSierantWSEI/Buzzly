using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/reviews")]
    [Produces("application/json")]
    public class ReviewsController(ApplicationDbContext db) : ControllerBase
    {
        private readonly ApplicationDbContext _db = db;

        [HttpGet("")]
        [ProducesResponseType(typeof(ReviewsResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll([FromQuery] int? limit = null)
        {
            try
            {
                var query = _db.Reviews.AsNoTracking();

                if (limit.HasValue)
                {
                    query = query.Take(limit.Value);
                }
                var reviews = await query.ToListAsync();

                var result = reviews.Select(review => new ReviewsResponseDto
                {
                    Id = review.id,
                    ProductId = review.product_id,
                    UserId = review.user_id,
                    AuthorName = review.author_name,
                    AuthorSurname = review.author_surname,
                    Rating = review.rating,
                    Content = review.content,
                    Images = review.images,
                    Status = (ReviewStatus)review.status,
                    CreatedAt = review.created_at!.Value,
                    UpdatedAt = review.updated_at,
                    ModeratedBy = review.moderated_by,
                    ModeratedAt = review.moderated_at
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

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(PagedReviewsResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetReviewsByProductIdWithPagination(int id, [FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            try
            {
                var totalCount = await _db.Reviews
                    .Where(r => r.product_id == id)
                    .CountAsync();

                if (totalCount == 0)
                {
                    return NotFound(new ErrorDetails
                    {
                        Status = StatusCodes.Status404NotFound,
                        Message = "No reviews found for this product."
                    });
                }

                var reviews = await _db.Reviews
                    .Where(r => r.product_id == id)
                    .OrderByDescending(r => r.created_at)
                    .Skip(skip)
                    .Take(take)
                    .AsNoTracking()
                    .ToListAsync();

                var reviewDtos = reviews.Select(review => new ReviewsResponseDto
                {
                    Id = review.id,
                    ProductId = review.product_id,
                    UserId = review.user_id,
                    AuthorName = review.author_name,
                    AuthorSurname = review.author_surname,
                    Rating = review.rating,
                    Content = review.content,
                    Images = review.images,
                    Status = (ReviewStatus)review.status,
                    CreatedAt = review.created_at!.Value,
                    UpdatedAt = review.updated_at,
                    ModeratedBy = review.moderated_by,
                    ModeratedAt = review.moderated_at
                }).ToList();

                return Ok(new PagedReviewsResponseDto
                {
                    Reviews = reviewDtos,
                    TotalCount = totalCount
                });
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