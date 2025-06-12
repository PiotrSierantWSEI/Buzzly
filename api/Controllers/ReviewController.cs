using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/review")]
    [Produces("application/json")]
    public class ReviewController(ApplicationDbContext db) : ControllerBase
    {
        private readonly ApplicationDbContext _db = db;

        [Authorize(Roles = "ADMIN,MODERATOR,USER")]
        [HttpPost]
        [ProducesResponseType(typeof(ReviewResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] CreateReviewDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new ErrorDetails
                    {
                        Status = StatusCodes.Status400BadRequest,
                        Message = "Nieprawidłowe dane wejściowe.",
                    });

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

                var review = new Review
                {
                    product_id = dto.ProductId,
                    user_id = dto.UserId,
                    author_name = dto.AuthorName,
                    author_surname = dto.AuthorSurname,
                    rating = dto.Rating,
                    content = dto.Content,
                    images = dto.Images,
                    status = (Models.ReviewStatus)ReviewStatus.PENDING
                };

                _db.Reviews.Add(review);
                await _db.SaveChangesAsync();

                var response = new ReviewResponseDto
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
                };

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = review.id },
                    response
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
        [ProducesResponseType(typeof(ReviewResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var review = await _db.Reviews.FindAsync(id);
                if (review == null)
                    return NotFound(new ErrorDetails
                    {
                        Status = StatusCodes.Status404NotFound,
                        Message = "Recenzja nie istnieje."
                    });

                var dto = new ReviewResponseDto
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

        [Authorize(Roles = "USER")]
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateReviewDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new ErrorDetails
                    {
                        Status = StatusCodes.Status400BadRequest,
                        Message = "Nieprawidłowe dane wejściowe."
                    });

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

                var review = await _db.Reviews.FindAsync(id);
                if (review == null)
                    return NotFound(new ErrorDetails
                    {
                        Status = StatusCodes.Status404NotFound,
                        Message = "Recenzja nie istnieje."
                    });

                if (review.user_id != userId)
                    return StatusCode(StatusCodes.Status403Forbidden, new ErrorDetails
                    {
                        Status = StatusCodes.Status403Forbidden,
                        Message = "Nie masz uprawnień do edycji tej recenzji."
                    });

                if (dto.Content != null)
                    review.content = dto.Content;
                if (dto.Rating.HasValue)
                    review.rating = dto.Rating.Value;
                if (dto.Images != null)
                    review.images = dto.Images;

                review.status = (Models.ReviewStatus)ReviewStatus.PENDING;
                review.updated_at = DateTime.UtcNow;
                review.moderated_by = null;
                review.moderated_at = null;

                await _db.SaveChangesAsync();
                return NoContent();
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

        [Authorize(Roles = "ADMIN,MODERATOR,USER")]
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
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

                var review = await _db.Reviews.FindAsync(id);
                if (review == null)
                    return NotFound(new ErrorDetails
                    {
                        Status = StatusCodes.Status404NotFound,
                        Message = "Recenzja nie istnieje."
                    });

                var isOwner = review.user_id == userId;
                var isModerator = User.IsInRole("MODERATOR");
                var isAdmin = User.IsInRole("ADMIN");

                if (!(isOwner || isModerator || isAdmin))
                    return StatusCode(StatusCodes.Status403Forbidden, new ErrorDetails
                    {
                        Status = StatusCodes.Status403Forbidden,
                        Message = "Brak uprawnień do usunięcia tej recenzji."
                    });

                _db.Reviews.Remove(review);
                await _db.SaveChangesAsync();
                return NoContent();
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