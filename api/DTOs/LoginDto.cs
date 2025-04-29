using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace api.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        [SwaggerSchema(Description = "E-mail użytkownika")]
        public string Email { get; set; } = null!;

        [Required]
        [DataType(DataType.Password)]
        [SwaggerSchema(Description = "Hasło użytkownika")]
        public string Password { get; set; } = null!;
    }

    public class LoginResponseDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;

    }
}
