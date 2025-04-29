using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Swashbuckle.AspNetCore.Filters;
using api.SwaggerExamples;

namespace api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    [Produces("application/json")]
    public class AuthController(
        ApplicationDbContext db,
        IPasswordHasher<User> hasher,
        IConfiguration cfg) : ControllerBase
    {
        private readonly ApplicationDbContext _db = db;
        private readonly IPasswordHasher<User> _hasher = hasher;
        private readonly IConfiguration _cfg = cfg;

        [HttpPost("login")]
        [SwaggerRequestExample(typeof(LoginDto), typeof(LoginDtoExample))]
        [ProducesResponseType(typeof(LoginResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ErrorDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Message = "Nieprawidłowe dane wejściowe."
                });

            var user = await _db.Users
                .SingleOrDefaultAsync(u => u.email == dto.Email);

            if (user == null ||
                _hasher.VerifyHashedPassword(user, user.password_hash, dto.Password)
                != PasswordVerificationResult.Success)
            {
                return Unauthorized(new ErrorDetails
                {
                    Status = StatusCodes.Status401Unauthorized,
                    Message = "Niepoprawny login lub hasło."
                });
            }

            // (opcjonalnie) generowanie JWT
            var jwtSection = _cfg.GetSection("JWT");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSection["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.email),
                new Claim("id", user.id.ToString()),
                new Claim(ClaimTypes.Role, user.role)
            };
            var token = new JwtSecurityToken(
                issuer: jwtSection["Issuer"],
                audience: jwtSection["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );
            var JWT = new JwtSecurityTokenHandler().WriteToken(token);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // Ustaw na true w produkcji
                Secure = true, // Ustaw na true w produkcji            
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(2)
            };
            Response.Cookies.Append("jwt", JWT, cookieOptions);

            return Ok(new
            {
                user = new LoginResponseDto
                {
                    Id = user.id,
                    Username = user.username,
                    Email = user.email,
                    Role = user.role,
                },
            });
        }

        [HttpPost("register")]
        [SwaggerRequestExample(typeof(RegisterDto), typeof(RegisterDtoExample))]
        [ProducesResponseType(typeof(RegisterResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ErrorDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Message = "Nieprawidłowe dane wejściowe."
                });

            if (await _db.Users.AnyAsync(u => u.username == dto.Username))
                return Conflict(new ErrorDetails
                {
                    Status = StatusCodes.Status409Conflict,
                    Message = "Nazwa użytkownika jest już zajęta."
                });

            if (await _db.Users.AnyAsync(u => u.email == dto.Email))
                return Conflict(new ErrorDetails
                {
                    Status = StatusCodes.Status409Conflict,
                    Message = "E-mail jest już w użyciu."
                });

            var user = new User
            {
                username = dto.Username,
                email = dto.Email,
                role = "USER",
                created_at = DateTime.UtcNow
            };
            user.password_hash = _hasher.HashPassword(user, dto.Password);

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var resp = new RegisterResponseDto
            {
                Status = StatusCodes.Status201Created,
                Success = true,
                Message = "Rejestracja zakończona pomyślnie."
            };
            return Ok(resp);
        }

        [Authorize]
        [HttpPost("logout")]
        [ProducesResponseType(typeof(LogoutDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status401Unauthorized)]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });
            var resp = new LogoutDto
            {
                Success = true,
                Message = "Wylogowano pomyślnie"
            };
            return Ok(resp);
        }
    }
}
