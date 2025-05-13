using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Produces("application/json")]
    public class UsersController(ApplicationDbContext db) : ControllerBase
    {
        private readonly ApplicationDbContext _db = db;

        [Authorize]
        [HttpGet("")]
        [ProducesResponseType(typeof(UserResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUser()
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

                var user = await _db.Users
                    .AsNoTracking()
                    .SingleOrDefaultAsync(u => u.id == userId);

                if (user == null)
                    return Unauthorized(new ErrorDetails
                    {
                        Status = StatusCodes.Status404NotFound,
                        Message = "Użytkownik nie istnieje."
                    });

                var dto = new UserResponseDto
                {
                    Id = user.id,
                    Username = user.username,
                    Email = user.email,
                    Role = user.role,
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
    }
}